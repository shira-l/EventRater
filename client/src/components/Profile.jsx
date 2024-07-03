import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Login from './Login.jsx';

const Profile = () => {
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  }

  return (
    <Box>
      <Button onClick={handleOpenLogin}>Login</Button>
      <Login open={openLogin} setOpen={setOpenLogin} />
    </Box>
  );
}

export default Profile;
