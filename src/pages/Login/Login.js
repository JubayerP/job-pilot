import styled from '@emotion/styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const { signIn, providerLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = data => {
        signIn(data.email, data.password)
            .then(result => {
                const { user } = result;
                navigate('/')
            })
            .catch(err => {
                console.log(err.message);
            })
    }


    const handleGoogleLogin = () => {
        providerLogin()
            .then(result => {
                const loggedUser = result.user;
                // navigate('/')

                const user = { name: loggedUser?.displayName, email: loggedUser?.email, photo: loggedUser?.photoURL, type: 'employer' }


                fetch(`https://job-pilot-server.vercel.app/users?email=${loggedUser?.email}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        navigate('/')
                    })
            })
            .catch(err => {
                console.log(err.message);
            })
    }




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

            <form onSubmit={handleSubmit(handleLogin)}>
                <Box
                    sx={{

                    }}
                >


                    <WhiteBorderTextField {...register('email')} type='email' id="outlined-basic" label="Email" variant="outlined" autocomplete='new-email' fullWidth sx={{ display: 'block', mb: 2 }} />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                    />

                    <Box sx={{ position: 'relative' }}>
                        <WhiteBorderTextField autocomplete='new-password' {...register('password')} id="outlined-basic" label="Password" fullWidth variant="outlined" type={open ? 'text' : 'password'} sx={{ mb: 2, }} />

                        <Box onClick={() => setOpen(!open)}
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 6,
                                transform: 'translateY(-70%)',
                                cursor: 'pointer'
                            }}
                        >
                            {open ?
                                <VisibilityOff sx={{ color: '#03a84e' }} />
                                :
                                <Visibility sx={{ color: '#03a84e' }} />
                            }
                        </Box>
                    </Box>
                </Box>

                <Button
                    variant='contained'
                    disableRipple
                    fullWidth
                    type='submit'
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
                onClick={handleGoogleLogin}
            >Login with Gmail</Button>
        </Box>
    );
};

export default Login;