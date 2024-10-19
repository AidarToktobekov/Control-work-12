import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPost } from "../../types";
import axiosApi from "../../axiosApi";

export const fetchPosts = createAsyncThunk<IPost[], string | undefined>('posts/fetchAll', async(id)=>{
    if(id){
        const {data: posts} = await axiosApi.get<IPost[]>(`/posts?user_id=${id}`);
        return posts; 
    }
    const {data: posts} = await axiosApi.get<IPost[]>('/posts');
    return posts; 
});

export const deletePost = createAsyncThunk<IPost, string>('posts/delete',  async (id) => {
    const { data: post } = await axiosApi.delete<IPost>(`/posts/${id}`);
    return post;
});