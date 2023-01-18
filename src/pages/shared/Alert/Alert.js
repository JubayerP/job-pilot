import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function AlertDialog() {
    const [open, setOpen] = React.useState(false)

    setTimeout(() => {
        setOpen(true)
    }, 2000)


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Update Your Profile"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ color: 'red' }}>
                        Please Update Your Profile In The Profile Section
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to='/profile' style={{textDecoration: 'none'}}>
                        <Button onClick={handleClose} disableRipple
                            variant='contained'
                            sx={{
                                bgcolor: '#03a84e',
                                '&:hover': {
                                    bgcolor: '#03a84e'
                                },
                                px: 4,
                                py: 1,
                                textTransform: 'capitalize'
                        }}>
                            Update
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}
