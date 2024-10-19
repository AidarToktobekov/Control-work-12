import express from "express";
import Post from "../models/Post";
import auth, { RequestWithUser } from "../middleware/auth";
import { imagesUpload } from "../multer";
import mongoose from "mongoose";

const postRouter = express.Router();

postRouter.get('/', async(req, res, next)=>{
    try{
        const userId = req.query.user_id as string;
        if (userId){
            const posts = await Post.find({userId});
            return res.send(posts);
        }else {
            const posts = await Post.find(); 
            return res.send(posts);
        }
    }catch(e){
        next(e);
    }
});

postRouter.post('/', auth, imagesUpload.single('image'), async(req, res, next)=>{
    try{
        const user = (req as RequestWithUser).user;
        if (!user) {
            res.status(403).send({error: 'Unauthorized'});
        }
        
        const postMutation = {
            username: user?.displayName,
            userId: user?._id,
            image: req.file?.filename,
            title: req.body.title,
        }

        const post = new Post(postMutation);
        post.save();

        return res.send(post);
    }catch(error){
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

postRouter.delete('/:id', auth, async(req, res, next)=>{
    try{
        const user = (req as RequestWithUser).user;
        console.log(user);
        
        if (!user) {
            res.status(403).send({error: 'Unauthorized'});
        }
        const post = await Post.findById(req.params.id);
        if (String(user?._id) !== String(post?.userId)) {
            console.log(user?._id, post?.userId );
            
            if (user?.role !== 'admin') {
                console.log('eee');

                return res.status(403).send({'message': 'Unauthorized'});
            }
        }
        await Post.findByIdAndDelete(req.params.id);
        return res.send(post);
    }catch(e){
        next(e);
    }
});

export default postRouter;