import { Box } from '@mui/system';
import React from 'react';

const Header = () => {

    return (
        <Box 
            sx={{
                backgroundImage: `url('https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '100vh',
                marginTop: '-115px'
            }}
        >
            
        </Box>
    );
};

export default Header;