import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

const ListJob = () => {
    const { register, handleSubmit } = useForm();


    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories')
            const data = await res.json()
            return data;
        }
    })


    const handlePostJobs = data => {
        const photo = data.photo[0];
        const formData = new FormData();
        formData.append('image', photo)

        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // const logo = imgData.data.display_url

                const { photo, ...jobData } = data;
                const newJobData = { ...jobData, company_image: imgData.data.display_url, date_posted: new Date().toISOString().slice(0, 10) };

                fetch('http://localhost:5000/joblistings', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newJobData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
            })
    }

    return (
        <Box
            sx={{
                maxWidth: 'lg',
                mx: 'auto'
            }}
        >
            <Typography variant="h4" sx={{ margin: '1rem 2rem' }}>
                Add Job to Hire
            </Typography>

            <form onSubmit={handleSubmit(handlePostJobs)} noValidate autoComplete="off"
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
                        <label htmlFor="title" style={{ fontSize: '13px' }}>Job Title</label>
                        <TextField
                            {...register('job_title', { required: 'true' })}
                            id="title"
                            // value={currentUser?.name}
                            sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', width: '100%' }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '1rem' }}>
                        <Box sx={{ width: '100%' }}>
                            <label htmlFor="company" style={{ fontSize: '13px' }}>Company</label>
                            <TextField
                                {...register('company', { required: 'true' })}
                                id="company"
                                sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', width: '100%' }}
                            />
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <label htmlFor="location" style={{ fontSize: '13px' }}>Job Location</label>
                            <TextField
                                {...register('location', { required: 'true' })}
                                id="location"
                                sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', width: '100%' }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '1rem' }}>
                        <Box sx={{ width: '100%' }}>
                            <label htmlFor="salary" style={{ fontSize: '13px' }}>Salary</label>
                            <TextField
                                {...register('salary', { required: 'true' })}
                                id="salary"
                                sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', width: '100%' }}
                            />
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <label htmlFor="type" style={{ fontSize: '13px' }}>Job Type</label>
                            <TextField
                                {...register('job_type', { required: 'true' })}
                                id="type"
                                sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', width: '100%' }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '1rem' }}>
                        <Box sx={{ width: '100%' }}>
                            <label htmlFor="img" style={{ fontSize: '13px' }}>Company Logo</label>
                            <TextField
                                {...register('photo', { required: 'true' })}
                                id="img"
                                type='file'
                                sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', width: '100%' }}
                            />
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <label htmlFor="category" style={{ fontSize: '13px' }}>Select Category</label>

                            <Select
                                {...register('category', { required: 'true' })}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', width: '100%' }}
                            >
                                {
                                    categories.map(c =>
                                        <MenuItem key={c._id} value={c.category}>{c.category_name}</MenuItem>
                                    )
                                }

                            </Select>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <label htmlFor="req" style={{ fontSize: '13px' }}>Write About Job Requirements</label>
                        <TextField
                            {...register('requirements', { required: 'true' })}
                            id="req"
                            sx={{ mb: 2, "& fieldset": { border: 'none' }, bgcolor: 'white', width: '100%' }}
                            multiline
                            rows={3}
                            maxRows={4}
                            placeholder='Requirements'
                        />
                    </Box>
                </Box>
                <Button type="submit" variant="contained" disableRipple sx={{
                    '&:hover': {
                        bgcolor: '#03a84e'
                    },
                    bgcolor: '#03a84e',
                    textTransform: 'capitalize',
                    px: '2rem',
                    py: '0.6rem'
                }}>
                    Post Job
                </Button>
            </form>
        </Box>
    );
};

export default ListJob;