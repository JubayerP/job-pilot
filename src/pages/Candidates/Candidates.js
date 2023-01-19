import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CandidateCard from './CandidateCard';

const Candidates = () => {
    const { data: jobseekers, isLoading } = useQuery({
        queryKey: ['jobseekers'],
        queryFn: async () => {
            const res = await fetch('https://job-pilot-server.vercel.app/jobseekers')
            const data = await res.json()
            return data;
        }
    })

    if (isLoading) {
        return 'Loading....'
    }

    return (
        <div>
            All Candidates

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: ['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']
                }}
            >
                {
                    jobseekers.map(seeker => <CandidateCard key={seeker._id} seeker={seeker} />)
                }
            </Box>
        </div>
    );
};

export default Candidates;