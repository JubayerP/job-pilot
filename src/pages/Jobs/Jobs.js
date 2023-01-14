import { Box } from '@mui/system';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { JobCard } from './JobCard';

const Jobs = () => {
    const jobs = useLoaderData();
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: {xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)',lg: 'repeat(3, 1fr)',},
            gap: '15px',
            px: '80px',
            bgcolor: '#f4f7f7',
            py: '80px'
        }}>
            {
                jobs.map(job => <JobCard key={job._id} job={job} />)
            }
        </Box>
    );
};

export default Jobs;