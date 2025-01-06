import React from 'react';
import { Alert, Snackbar } from '@mui/material';

const AlertMessage = ({ open, message, severity, handleClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertMessage;
