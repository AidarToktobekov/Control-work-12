import mongoose, { Types } from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async(value: Types.ObjectId)=>{
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: 'User does not exist!',
        }
    },
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
});

const Post = mongoose.model('Post', PostSchema);

export default Post;