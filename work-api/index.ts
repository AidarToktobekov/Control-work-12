import express from "express";
import config from "./config";
import cors from "cors";
import * as mongoose from "mongoose";
import userRouter from "./routers/user";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors(config.corsOptions));
app.use(express.static('public'));
app.use('/user', userRouter);

const run = async()=>{
    await mongoose.connect(config.database);
    app.listen(port,()=>{
        console.log('Listening on port',port);
    });

    process.on('exit', ()=>{
        mongoose.disconnect();
    });
}

run().catch(console.error);