import { Typography } from '@mui/material';
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
                marginTop: '-115px',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '94.5vh',
                    display: 'inline-block',
                    background: 'linear-gradient(90deg, #151515 0%, rgba(60,60,60,0.2) 100% )',
                    // zIndex: 1
                }
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', zIndex: 20, position: 'relative'}}>
                <Typography
                    variant='h2'
                    sx={{
                        color: 'white',
                        fontWeight: '500',
                        textAlign: 'center'
                    }}
                >
                    Unlock Your <br /> Potential with the <span style={{color: '#03A84E'}}>Right Job.</span>
                </Typography>
            </Box>
        </Box>
    );
};

export default Header;