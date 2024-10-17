import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalError, IUser, LoginMutation, RegisterMutation, ValidationError } from "../../types";
import axiosApi from "../../axiosApi";
import { isAxiosError } from "axios";
import { unsetUser } from './userSlice';
import { RootState } from "../../app/store";

export const register = createAsyncThunk<IUser, RegisterMutation, {rejectValue: ValidationError}>(
    'user/register',
    async(registerMutation, {rejectWithValue})=>{
        try{
            const formData = new FormData();
            const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];
            keys.forEach((key) => {
                const value = registerMutation[key];
                if (value) {
                    console.log(value);
                    
                    formData.append(key, value);
                }
            });
            console.log(formData);
            
            const {data: user} = await axiosApi.post<IUser>('/user', formData);
            return user;
        }catch(e){
            if(isAxiosError(e) && e.response && e.response.status === 400){
                return rejectWithValue(e.response.data);
            }

            throw e;
        }
    },
);

export const login = createAsyncThunk<IUser, LoginMutation, {rejectValue: GlobalError}>(
    'users/login',
    async(loginMutation, {rejectWithValue})=>{
        try{
            const {data: user} = await axiosApi.post<IUser>('/user/sessions', loginMutation);
            return user;
        }catch(e){
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }

            throw e;
        }
    },
);

export const googleLogin = createAsyncThunk<IUser, string, { rejectValue: GlobalError }>(
    'users/googleLogin',
    async (credential, { rejectWithValue }) => {
      try {
        const {data: user} = await axiosApi.post<IUser>('/user/google', { credential });
        console.log(user);
        
        return user;
      } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data as GlobalError);
        }
            throw e;
        }
    },  
);  

export const logout = createAsyncThunk<void, void, { state: RootState }>(
    'users/logout',
    async (_arg, { getState, dispatch }) => {
      const token = getState().users.user?.token;
      await axiosApi.delete('/user/sessions', { headers: { Authorization: `Bearer ${token}` } });
      dispatch(unsetUser());
    },
);