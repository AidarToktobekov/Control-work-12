import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPost, PostMutation } from "../../types";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";

export const fetchPosts = createAsyncThunk<IPost[], string | undefined>('posts/fetchAll', async(id)=>{
    if(id){
        const {data: posts} = await axiosApi.get<IPost[]>(`/posts?user_id=${id}`);
        return posts; 
    }
    const {data: posts} = await axiosApi.get<IPost[]>('/posts');
    return posts; 
});

export const createPost = createAsyncThunk<void, PostMutation, {state: RootState}>('posts/create', async(postMutation, {getState})=>{
    const user = getState().users.user;
    const formData = new FormData();
    if (user) {    
      const keys = Object.keys(postMutation) as (keyof PostMutation)[];
      keys.forEach((key) => {
        const value = postMutation[key];
        if (value) {
            formData.append(key, value);
        }
      });
      await axiosApi.post<IPost>(`/posts`, formData);
    }
});

export const deletePost = createAsyncThunk<IPost, string>('posts/delete',  async (id) => {
    const { data: post } = await axiosApi.delete<IPost>(`/posts/${id}`);
    return post;
});