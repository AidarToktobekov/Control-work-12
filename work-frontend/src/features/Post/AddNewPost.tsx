import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import FileInput from "../../UI/FileInput/FileInput";
import { PostMutation } from "../../types";
import { createPost } from "./postThunk";

const AddNewPost = ()=>{
  
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [state, setState] = useState<PostMutation>({
        title: '',
        image: null,
    });

    const [imageError, setImageError] = useState('none');

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault();     
        if (!state.image) {
            setImageError('block');
        }else{
            dispatch(createPost(state));
            navigate('/');
        }
    };
    
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
    }))};

    const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        const value = files && files[0] ? files[0] : null;
    
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    return(
        <>
            <h1 className="my-3">
                Add New Post
            </h1>
            <form onSubmit={submitFormHandler}>
                <div>
                    <div className="mb-3"> 
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" required onChange={inputChangeHandler} name="title"/>
                    </div>
                    <div className="mb-3">
                        <span className="text-danger" style={{display: imageError}}>Fill in the input fields</span>
                        <FileInput onChange={fileInputChangeHandler} name="image" label="Image"></FileInput>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddNewPost;