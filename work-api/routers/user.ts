import express from "express";
import User from "../models/User";
import mongoose from 'mongoose';
import { OAuth2Client } from "google-auth-library";
import config from "../config";
import { imagesUpload } from "../multer";


const userRouter = express.Router();
const googleClient = new OAuth2Client(config.google.clientId);

userRouter.post('/', imagesUpload.single('avatar') , async (req, res, next) => {
    try{
        const userMutation = {
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.file ? `http://localhost:8000/images/${req.file.filename}` : null,
        };

        const user = new User(userMutation);
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

userRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        });
  
        const payload = ticket.getPayload();
  
        if (!payload) {
            return res.status(400).send({error: 'Google Login Error!'});
        }
  
        const email = payload.email;
        const id = payload.sub;
        const displayName = payload.name;
  
    if (!email) {
        return res.status(400).send({error: 'Not enough user data to continue!'});
    }
  
    let user = await User.findOne({googleId: id});
  
    if (!user) {
        const newPassword = crypto.randomUUID();
        user = new User({
        username: email,
        password: newPassword,
        googleId: id,
        displayName,
        avatar: payload.picture,
        });
    }
  
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        return next(error);
    }
});

userRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        
        if (!user) {
            return res.status(400).send({error: 'Username not found!'});
        }
        
        const isMatch = await user.checkPassword(req.body.password);
        
        if (!isMatch) {
            return res.status(400).send({error: 'Password is wrong!'});
        }
        
        user.generateToken();
        await user.save();
        
        return res.send(user);
    } catch (error) {
        return next(error);
    }
});

userRouter.delete('/sessions', async (req, res, next) => {
    try {
      const headerValue = req.get('Authorization');
  
      if (!headerValue) return res.status(204).send();
  
      const [_bearer, token] = headerValue.split(' ');
  
      if (!token) return res.status(204).send();
  
      const user = await User.findOne({token});
  
      if (!user) return res.status(204).send();
  
      user.generateToken();
      await user.save();
  
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  });

export default userRouter;