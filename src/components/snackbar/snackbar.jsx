import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackBar } from "src/redux/actions/snackbarAction";

const SnackBar = () => {
    const dispatch = useDispatch();
    const { show, message, severity } = useSelector((state) => state.snackbar);

    const handleClose = () => {
        dispatch(hideSnackBar());
    };


    return (
        <>
            <Snackbar open={show} autoHideDuration={3000} onClose={() => handleClose()} anchorOrigin={{
               vertical: 'top',
               horizontal: 'center' 
            }}>
                <Alert
                    onClose={() => handleClose()}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}


export default SnackBar