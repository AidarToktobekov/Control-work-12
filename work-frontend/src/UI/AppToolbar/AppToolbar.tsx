import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/User/userSlice";
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/User/userThunk';

const AppToolbar = ()=>{

    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleLogout = () => {
      dispatch(logout());
    };

    const user = useAppSelector(selectUser);

    let links = (
        <>
            <NavLink className="navbar-brand text-light ms-auto" to='/register'>Sign up</NavLink>
            <NavLink className="navbar-brand text-light" to='/login'>Sign in</NavLink>
        </>
    );

    if (user) {
        links = (
            <>
                <NavLink className="navbar-brand text-light ms-auto" to='/add'>Add</NavLink>
                <button className="navbar-brand text-light btn d-flex align-items-center gap-2" onClick={handleClick}>
                    {user.displayName}
                    <span className="d-block rounded-3 d-flex align-items-center justify-content-center bg-light" style={{width: '40px', height: '40px'}}>
                        {user.avatar? (
                            <img src={user.avatar} alt="#" className="w-100 rounded-3"/>
                        ):(   
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                        )}
                    </span>
                </button>
                <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </>
        )
    }

    return(
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <NavLink className="navbar-brand text-light" to='/'>Home</NavLink>
                {links}
            </div>
        </nav>
    )
}

export default AppToolbar;