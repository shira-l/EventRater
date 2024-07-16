import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from './Login.jsx';
import { useState, useContext } from 'react';
import { UserContext } from '../UserProvider';
import PersistentDrawerRight from './PersistentDrawerRight.jsx';
import Button from '@mui/material/Button';


export default function ButtonAppBar(props) {
    const navigate = useNavigate()
    const { user, setCurrentUser } = useContext(UserContext);
    const [openLogin, setOpenLogin] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    const handleCloseLogin = () => {
        setOpenLogin(false)
    }
 
   
    return (
        <AppBar position="fixed" >
            <Toolbar>
                <Box sx={{ flexGrow: 10 }}>
                    {user == null ? <><Button variant="outlined" color="inherit" onClick={() => setOpenLogin(true)} sx={{ flexGrow: 10 }}>
                        Login
                    </Button>
                        <Login open={openLogin} onClose={handleCloseLogin} />
                    </>
                        : <Button variant="outlined" color="inherit" onClick={handleLogout} sx={{ flexGrow: 10 }}>Logout</Button>
                    }
                </Box>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate("/Home")}>
                    EVENTS
                </Typography>
                <PersistentDrawerRight />
            </Toolbar>
        </AppBar>
    );
}
