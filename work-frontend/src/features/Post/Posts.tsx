import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deletePost, fetchPosts } from "./postThunk";
import { NavLink, useParams } from "react-router-dom";
import { selectLoading, selectPosts } from "./postSlice";
import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Dialog, Typography } from "@mui/material";
import { API_URL } from "../../constants";
import { selectUser } from "../User/userSlice";

const Posts = ()=>{
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const posts = useAppSelector(selectPosts);
    const loading = useAppSelector(selectLoading);
    const user = useAppSelector(selectUser);

    useEffect(()=>{
        if(id){
            dispatch(fetchPosts(id));
        }else{
            dispatch(fetchPosts())
        }
    }, [dispatch, id]);

    const [open, setOpen] = useState(false);
    const [imageModal, setImageModal] = useState('');
  
    const onDelete = (id: string)=>{
        dispatch(deletePost(id));
        location.reload();
    }

    const handleClickOpen = (image: string) => {
        setOpen(true);
        setImageModal(image);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return(
        <>
            {id? (
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="my-3">
                        {posts[0]?.username}
                    </h1>
                    {user?._id === id? (
                        <NavLink to='/add-new-post' className='btn btn-primary'>
                            Add new post
                        </NavLink>
                    ): (
                        null
                    )}
                </div>
            ):(
                null
            )}
            <div className="d-flex gap-2 justify-content-center py-4">
                {loading? (
                    <CircularProgress></CircularProgress>
                ) : (
                    posts.map((post)=>{
                        return(
                            <Card  key={post._id} sx={{ maxWidth: 345 , minWidth: 320}}>
                                <CardMedia
                                onClick={()=>handleClickOpen(post.image)}
                                sx={{ height: 140 }}
                                image={`${API_URL}/${post.image}`}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {post.title}
                                    </Typography>
                                    {id? (
                                        null
                                    ):(
                                        <>
                                            By: <NavLink to={`/${post.userId}`}>{post.username}</NavLink>
                                        </>
                                    )}
                                </CardContent>
                                <CardActions>
                                    {user?.role === 'admin'? (
                                        <>
                                            <Button variant="contained" onClick={()=>onDelete(post._id)} color="error">Delete</Button>
                                        </>
                                    ):(
                                        user?._id === post.userId? (
                                            <Button variant="contained" onClick={()=>onDelete(post._id)} color="error">Delete</Button>
                                        ): (
                                            null
                                        )
                                    )}
                                </CardActions>
                            </Card>
                        )
                    })
                )}
            </div>
                <Dialog
                    fullWidth={true}
                    maxWidth={'xl'}
                    open={open}
                    onClose={handleClose}
                >
                    <CardMedia sx={{ height: 600 }} image={`${API_URL}/${imageModal}`}/>
                    <Button variant="contained" sx={{width: 100, margin: '10px auto'}} onClick={handleClose}>Close</Button>
                </Dialog>
        </>
    )
}

export default Posts;