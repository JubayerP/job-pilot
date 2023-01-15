import styled from '@emotion/styled';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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

            <form>
                <Box
                    sx={{

                    }}
                >
                    <WhiteBorderTextField id="outlined-basic" label="Name" variant="outlined" fullWidth sx={{
                        display: 'block',
                        mb: 2,

                    }} />


                    <WhiteBorderTextField id="outlined-basic" label="Email" variant="outlined" fullWidth sx={{ display: 'block', mb: 2 }} />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                    />
                    <label htmlFor="raised-button-file" >
                        <Button variant="outlined" component="span" sx={{ textTransform: 'capitalize', display: 'block', mb: 2 }}>
                            Upload Your Image
                        </Button>
                    </label>

                    <WhiteBorderTextField id="outlined-basic" label="Password" fullWidth variant="outlined" type='password' sx={{ mb: 2 }} />
                </Box>

                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Account Type</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        row
                    >
                        <FormControlLabel value="employer" control={<Radio />} label="Employer" />
                        <FormControlLabel value="job seeker" control={<Radio />} label="Job Seeker" />
                    </RadioGroup>
                </FormControl>

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
                >Create Account</Button>
                <Typography
                    sx={{textAlign: 'center', mt: 2}}
                >
                    Already have an account? <Link to='/login' style={{color: '#03A84E'}}>Login</Link>
                </Typography>
            </form>
        </Box>
    );
};

export default Register;