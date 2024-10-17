import { useState } from "react";
import { RegisterMutation } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { selectRegisterError } from "./userSlice";
import { register } from "./userThunk";
import FileInput from "../../UI/FileInput/FileInput";

const Register = ()=>{
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectRegisterError);

    const getFieldError = (fieldName: string)=>{
        return error?.errors[fieldName].message;
    }

    const [state, setState] = useState<RegisterMutation>({
        username: '',
        displayName: '',
        password: '',
        avatar: null,
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = event.target;
        setState((prev)=>({
            ...prev,
            [name]: value,  
        }));
    };

    const submitFormHandler = async(event: React.FormEvent) =>{
        event.preventDefault();
        try{
            console.log(state);
            
            await dispatch(register(state)).unwrap();
            navigate('/');
        }catch(e){
            console.log('Error');
        }
    }

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
        <form onSubmit={submitFormHandler}>
            <h3 className="text-center my-4">
                Sign up
            </h3>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input value={state.username} type="name" required name="username" onChange={inputChangeHandler} className="form-control"/>
                <span className="text-6 text-danger">{getFieldError('username')}</span>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input value={state.password} type="password" required name="password" onChange={inputChangeHandler} className="form-control"/>
                <span className="text-6 text-danger">{getFieldError('username')}</span>
            </div>
            <div className="mb-3">
                <label className="form-label">Display Name</label>
                <input value={state.displayName} type="text" required name="displayName" onChange={inputChangeHandler} className="form-control"/>
            </div>
            <div className="mb-3">
                <FileInput label="Image" name="avatar" onChange={fileInputChangeHandler}></FileInput>
            </div>
            <button type="submit" className="btn btn-dark d-block mb-3">Sign up</button>
            <Link to="/login">Already have an account? Sign in</Link>
        </form>
        </>
    )
}

export default Register;