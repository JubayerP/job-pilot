import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { useEmployer } from "../../hooks/useEmployer";
import { useJobSeeker } from "../../hooks/useJobSeeker";



export const Profile = () => {
    const { user } = useContext(AuthContext)
    const [isJobSeeker] = useJobSeeker(user?.email);
    const [isEmployer] = useEmployer(user?.email)
    const { register, handleSubmit } = useForm()

    const { data: currentUser, isLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://job-pilot-server.vercel.app/user/${user?.email}`)
            const data = await res.json();
            return data;
        }
    })

    const handleUpdateProfile = data => {
        if (isJobSeeker) {
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
                    const resume = imgData.data.display_url;

                    const { _id, ...newUser } = currentUser;

                    const updateUser = { ...newUser, resume, passion: data.passion, address: data.address }
                    console.log(updateUser);

                    fetch(`https://job-pilot-server.vercel.app/user?email=${user?.email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updateUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            refetch();
                            toast.success('Your Profile is Updated.')
                        })
                })
        }
    }

    if (isLoading) {
        return 'Loading...'
    }

    return (
        <>
            <Typography variant="h4" sx={{ margin: '1rem 2rem' }}>
                Your Profile Information
            </Typography>

            <form onSubmit={handleSubmit(handleUpdateProfile)} noValidate autoComplete="off"
                style={{
                    maxWidth: '700px',
                    margin: '3rem auto',
                    border: '1px solid #03a84e',
                    padding: '2rem',
                    borderRadius: '8px',
                    background: '#f4f7f7'
                }}
            >
                <Box
                    sx={{
                        width: 'full',
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                    }}
                >
                    <Box>
                        <label htmlFor="fileInput" style={{ fontSize: '13px' }}>Name</label>
                        <TextField
                            id="fileInput"
                            value={currentUser?.name}
                            disabled
                            sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', display: 'block' }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '1rem' }}>
                        <Box sx={{ width: '100%' }}>
                            <label htmlFor="fileInput" style={{ fontSize: '13px' }}>Email</label>
                            <TextField
                                value={currentUser?.email}
                                disabled
                                id="fileInput"
                                sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', display: 'block', width: '100%' }}
                            />
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <label htmlFor="fileInput" style={{ fontSize: '13px' }}>User Type</label>
                            {isJobSeeker ?
                                <TextField
                                    id="fileInput"
                                    value='Job Seeker'
                                    disabled
                                    sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', display: 'block', width: '100%' }}
                                />
                                :
                                <TextField
                                    id="fileInput"
                                    value='Employer'
                                    disabled
                                    sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', display: 'block', width: '100%' }}
                                />
                            }
                        </Box>
                    </Box>
                    <>
                        {isJobSeeker &&
                            <>
                                <Box>
                                    <label htmlFor="fileInput" style={{ fontSize: '13px' }}>Passion</label>
                                    <TextField
                                        {...register('passion', { required: true })}
                                        id="fileInput"
                                        placeholder={`${currentUser?.passion ? '' : 'Your Passion e.g. Web Developer'}`}
                                        sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', width: '100%' }}
                                        value={currentUser?.passion && currentUser?.passion}
                                        disabled={currentUser?.passion}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '1rem' }}>
                                    <Box sx={{ width: '100%' }}>
                                        <label htmlFor="fileInput" style={{ fontSize: '13px' }}>Address</label>
                                        <TextField
                                            {...register('address', { required: true })}
                                            id="fileInput"
                                            placeholder={`${currentUser?.address ? '' : 'Address'}`}
                                            sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', width: '100%' }}
                                            value={currentUser?.address && currentUser?.address}
                                            disabled={currentUser?.address}
                                        />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <label htmlFor="fileInput" style={{ fontSize: '13px' }}>Upload Your Resume</label>
                                        <TextField
                                            {...register('photo', { required: true })}
                                            id="fileInput"
                                            type={currentUser?.resume ? 'text' : 'file'}
                                            value={currentUser?.resume && 'Resume Added'}
                                            disabled={currentUser?.resume}
                                            sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', width: '100%' }}
                                        />
                                    </Box>
                                </Box>
                            </>
                        }
                    </>
                </Box>
                <Button
                    disabled={
                        currentUser?.passion &&
                        currentUser?.address &&
                        currentUser?.resume
                    }
                    type="submit"
                    variant="contained"
                    disableRipple
                    sx={{
                        '&:hover': {
                            bgcolor: '#03a84e'
                        },
                        bgcolor: '#03a84e',
                        textTransform: 'capitalize',
                        px: '2rem',
                        py: '0.6rem'
                    }}>
                    {currentUser?.passion &&
                        currentUser?.address &&
                        currentUser?.resume
                        ?
                        'Profile Updated'
                        :
                        'Update Profile'
                    }
                </Button>
            </form>
        </>
    );
}
