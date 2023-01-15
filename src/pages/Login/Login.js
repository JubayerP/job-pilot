import styled from '@emotion/styled';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: #03A84E;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #03A84E;
    }
  }
`;
    return (
        <Box
            sx={{
                maxWidth: '420px',
                mx: ['20px', 'auto', 'auto', 'auto'],
                p: '20px',
                mt: '80px',
                bgcolor: '#F4F7F7',
                border: '1px solid #03a84e',
                borderRadius: '8px'
            }}
        >
            <Box>
                <Typography variant='h4'
                    sx={{ textAlign: 'center', mb: '30px' }}
                >Login Now</Typography>
            </Box>

            <form>
                <Box
                    sx={{

                    }}
                >


                    <WhiteBorderTextField id="outlined-basic" label="Email" variant="outlined" fullWidth sx={{ display: 'block', mb: 2 }} />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                    />

                    <WhiteBorderTextField id="outlined-basic" label="Password" fullWidth variant="outlined" type='password' sx={{ mb: 2 }} />
                </Box>

                <Button
                    variant='contained'
                    disableRipple
                    fullWidth
                    sx={{
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: 'none',
                            bgcolor: '#03a84e'
                        },
                        py: 1.5,
                        textTransform: 'capitalize',
                        bgcolor: '#03a84e',
                    }}
                >Log me in</Button>
                <Typography
                    sx={{ textAlign: 'center', mt: 2 }}
                >
                    Don't have an account? <Link to='/register' style={{ color: '#03A84E' }}>Register</Link>
                </Typography>
            </form>

            <Button
                variant='outlined'
                disableRipple
                fullWidth
                sx={{
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                    py: 1.5,
                    textTransform: 'capitalize',
                    mt: 2
                    // bgcolor: '#03a84e',
                }}
            >Login with Gmail</Button>
        </Box>
    );
};

export default Login;