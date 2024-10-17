export interface IArtist{
    _id: string;
    name: string;
    description?: string;
    image: string | null; 
    isPublished: boolean;
}

export interface IAlbum{
    _id: string;
    name: string;
    artist: string;
    date: Date;
    image: string | null; 
    isPublished: boolean;
}

export interface AlbumMutation{
    name: string;
    artist: string;
    image: string | null;
}

export interface ITrack{
    _id: string;
    name: string;
    duration: string;
    trackNumber: number;
    album: string;
    isPublished: boolean;
}

export interface TrackMutation{
    name: string;
    duration: string;
    album: string;
}

export interface ArtistMutation{
    name: string;
    description?: string;
    image: string | null; 
}
export interface IUser{
    _id: string;
    username: string;
    token: string;
    role: string;
    avatar?: string;
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
    avatar: string | null;
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

export interface ITrackHistory {
    _id: string;
    date: string;
    user: string;
    track: string;
}

export interface TrackHistoryMutation {
    track: string;
}