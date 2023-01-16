import styled from '@emotion/styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Register = () => {
    const [jobTypeValue, setJobTypeValue] = useState('')
    const [open, setOpen] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUsersProfile } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleRegister = data => {
        
        const photo = data.photo[0];
        const formData = new FormData();
        formData.append('image', photo)
        // REACT_APP_IMGBB_KEY
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const photo = imgData.data.display_url;

                    createUser(data.email, data.password)
                        .then(result => {
                            const loggedUser = result.user;
                            updateUsersProfile(data.name, photo).then(()=>{
                                const user = { name: data.name, email: data.email, photo: photo, type: jobTypeValue }
                                
                                fetch(`http://localhost:5000/users?email=${loggedUser?.email}`, {
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
                    })
                }
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
                border: '1px solid #03a84e',
                maxWidth: '420px',
                mx: ['20px', 'auto', 'auto', 'auto'],
                p: '20px',
                my: '80px',
                bgcolor: '#F4F7F7',
            }}
        >
            <Box>
                <Typography variant='h4'
                    sx={{ textAlign: 'center', mb: '30px' }}
                >Register Now</Typography>
            </Box>

            <form onSubmit={handleSubmit(handleRegister)}>
                <Box
                    sx={{
                        position: 'relative'
                    }}
                >
                    <WhiteBorderTextField {...register('name', { required: true })} id="outlined-basic" label="Name" variant="outlined" type='text' fullWidth sx={{
                        display: 'block',
                        mb: 2,
                    }} />


                    <WhiteBorderTextField {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} id="outlined-basic" label="Email" type='email' variant="outlined" fullWidth sx={{ display: 'block', mb: 2 }} />
                    <input
                        {...register('photo', { required: true })}
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        // multiple
                        type="file"
                    />
                    <label htmlFor="raised-button-file" >
                        <Button variant="outlined" component="span" sx={{ textTransform: 'capitalize', display: 'block', mb: 2 }}>
                            Upload Your Image
                        </Button>
                    </label>

                    <WhiteBorderTextField {...register('password', { required: 'Min:8 and Max:16', minLength: 8, maxLength: 16 })} id="outlined-basic" label="Password" fullWidth variant="outlined" type={open ? 'text' : 'password'} sx={{ mb: 2 }} />
                    {errors.password && <p role="alert">{errors.password?.message}</p>}

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
                                <VisibilityOff sx={{color: '#03a84e'}}/>
                                :
                                <Visibility sx={{color: '#03a84e'}}/>
                            }
                        </Box>
                </Box>

                <FormControl>
                    <FormLabel id='job-type'>Account Type</FormLabel>
                    <RadioGroup
                        row
                        onChange={e => setJobTypeValue(e.target.value)}
                        aria-labelledby='job-type'

                    >
                        <FormControlLabel value="job seeker" control={<Radio />} label="Job Seeker" />
                        <FormControlLabel value="employer" control={<Radio />} label="Employer" />
                    </RadioGroup>
                </FormControl>

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
                >Create Account</Button>
                <Typography
                    sx={{ textAlign: 'center', mt: 2 }}
                >
                    Already have an account? <Link to='/login' style={{ color: '#03A84E' }}>Login</Link>
                </Typography>
            </form>
        </Box>
    );
};

export default Register;