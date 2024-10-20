export interface IUser{
    _id: string;
    username: string;
    token: string;
    role: string;
    displayName: string;
    googleId?: string;
}

export interface ValidationError{
    errors: {
        [key:string]:{
            name: string;
            message:string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface RegisterMutation{
    username: string;
    password: string;
    displayName: string;
    googleId?: string;
}

export interface LoginMutation {
    username: string;  
    password: string;
}

export interface GlobalError{
    error: string;
}

export interface IPost{
    _id: string
    username: string;
    userId: string;
    image: string;
    title: string;
}

export interface PostMutation{
    image: string | null;
    title: string;
}