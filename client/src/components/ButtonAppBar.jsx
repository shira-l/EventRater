import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { UserContext } from '../UserProvider';
import PersistentDrawerRight from './PersistentDrawerRight';
import auth from '../auth';
import Login from './Login';

export default function ButtonAppBar(props) {
    const navigate = useNavigate();
    const { user, setCurrentUser } = useContext(UserContext);
    const [openLogin, setOpenLogin] = useState(false);
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleLogout = () => {
        auth.logout();
        setCurrentUser(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSetting = (setting) => {
        switch (setting) {
            case "Logout":
                handleLogout();
                break;

            default:
                break;
        }
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Box sx={{ flexGrow: 10 }}>
                    {!auth.isAuthenticated() ? (
                        <>
                            {/* <Button variant="outlined" color="inherit" onClick={() => setOpenLogin(true)}>
                                Login
                            </Button> */}
                            <Login open={openLogin} onClose={() => setOpenLogin(false)} />
                        </>
                    ) : (
                        <>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {/* <Avatar alt={user?.displayName} src={user?.avatarUrl} /> */}
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />

                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {['Profile', 'Account', 'Dashboard', 'Logout'].map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleSetting(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    )}
                </Box>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate("/Home")}>
                    EVENTS
                </Typography>
                <PersistentDrawerRight />
            </Toolbar>
        </AppBar>
    );
}
