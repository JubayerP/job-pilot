import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const CandidateCard = ({ seeker }) => {
    const { email, name, photo, type, address, passion, resume } = seeker;
    return (
        <Card sx={{
            maxWidth: 380, p: "30px",
            boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
            borderRadius: '10px',
            border: '0',
            mx: 'auto',
            '&:hover': {
                boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px'
            },
            width: '100%'
        }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '30px',
                }}
            >
                <img
                    alt="companyLogo"
                    width={80}
                    height={80}
                    src={photo}
                    style={{ borderRadius: '50%' }}
                />
                <Box sx={{ml: 4}}>
                    <Typography variant='h6' sx={{fontWeight: '600'}}>{name}</Typography>
                    <Typography variant='p' sx={{color: 'gray'}}>{address}</Typography>
                </Box>
            </Box>
            <CardContent
                sx={{ '&.MuiCardContent-root': { p: 0 } }}
            >
                <Typography gutterBottom variant="h6" component="div" sx={{fontWeight: '600'}}>
                    <p>{passion}</p>
                    {email}
                </Typography>
            </CardContent>
            <CardActions sx={{ '&.MuiCardActions-root': { p: 0 }, mt: '20px'}}>
                <Button variant='contained' disableRipple sx={{
                    background: '#03A84E',
                    '&:hover': {
                        background: 'white',
                        boxShadow: 'none',
                        border: '1px solid #03A84E',
                        color: '#03A84E'
                    },
                    boxShadow: 'none',
                    px: 4,
                    border: '1px solid #03A84E',

                }}>Download Resume</Button>
            </CardActions>
        </Card>
    );
};

export default CandidateCard;