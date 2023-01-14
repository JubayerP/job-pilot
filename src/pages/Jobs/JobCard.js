import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import * as React from 'react';

export const JobCard = ({ job }) => {
    const { job_title, company, location, salary, job_type, company_image } = job;
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
                    src={company_image}
                    style={{ borderRadius: '50%' }}
                />
                <Box sx={{ml: 4}}>
                    <Typography variant='h6' sx={{fontWeight: '600'}}>{company}</Typography>
                    <Typography variant='p' sx={{color: 'gray'}}>{location}</Typography>
                </Box>
            </Box>
            <CardContent
                sx={{ '&.MuiCardContent-root': { p: 0 } }}
            >
                <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: '600'}}>
                    {job_title.split(' ').slice(0, 2).join(' ')}
                </Typography>
                <Typography variant='p' sx={{
                    fontWeight: '600',
                    color: job_type === 'Full-Time' ? '#03A84E' : '#1461FF'
                }}
                >{job_type}</Typography>
            </CardContent>
            <CardActions sx={{ '&.MuiCardActions-root': { p: 0 },  display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '20px'}}>
                <Typography variant='h6' sx={{fontWeight: '700'}}>
                    {salary}<Typography variant='small' sx={{fontWeight: 'normal', fontSize: '16px'}}>/mo</Typography>
                </Typography>
                <Button variant='contained' disableRipple sx={{
                    background: '#03A84E',
                    '&:hover': {
                        background: '#03A84E',
                        boxShadow: 'none'
                    },
                    boxShadow: 'none',
                    px: 4

                }}>Details</Button>
            </CardActions>
        </Card>
    );
}
