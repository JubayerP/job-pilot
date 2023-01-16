import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = await res.json();
            return data;
        }
    })
    console.log(categories);
    return (
        <Box sx={{ my: '80px', px: '80px' }}>
            <Typography variant='h4' sx={{ color: '#333', textAlign: 'center', mb: '20px' }}>
                Popular Category
            </Typography>

            <Box
                sx={{

                    display: 'grid',
                    gridTemplateColumns: ['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)'],
                    gridGap: '20px',
                }}
            >
                {
                    categories.map(c => <Box key={c._id}
                        sx={{
                            p: '10px',
                            borderRadius: '5px',
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            cursor: 'pointer',
                            transition: '.3s',
                            '&:hover': {
                                bgcolor: '#03A84E',
                            },
                        }}
                    >
                        <Link to={`/jobs/${c.category}`} style={{
                            textDecoration: 'none', color: 'black'
                        }}>
                            <Typography variant='h6' sx={{
                                textAlign: 'center', '&:hover': {
                                    color: 'white'
                                }
                            }}>{c.category_name}</Typography>
                        </Link>
                    </Box>)
                }
            </Box>
        </Box>
    );
};

export default Category;