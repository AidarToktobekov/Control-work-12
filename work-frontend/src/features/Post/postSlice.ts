import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../types";
import { createPost, deletePost, fetchPosts } from "./postThunk";

interface PostState{
    posts: IPost[];
    loading: boolean;
}

const initialState: PostState = {
    posts: [],
    loading: false,
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder=>{
        builder
            .addCase(fetchPosts.pending, state=>{
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, {payload: posts})=>{
                state.loading = false;
                state.posts = posts;
            })
            .addCase(fetchPosts.rejected, state=>{
                state.loading = false;
            })
            .addCase(deletePost.pending, state=>{
                state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state)=>{
                state.loading = false;
            })
            .addCase(deletePost.rejected, state=>{
                state.loading = false;
            })
            .addCase(createPost.pending, state=>{
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state)=>{
                state.loading = false;
            })
            .addCase(createPost.rejected, state=>{
                state.loading = false;
            })
    },
    selectors: {
        selectPosts: state=>state.posts,
        selectLoading: state=>state.loading,
    }
});

export const postReducer = postSlice.reducer;

export const {
    selectPosts,
    selectLoading,
} = postSlice.selectors