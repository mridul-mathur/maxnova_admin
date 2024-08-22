import { TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPcdUtil, updatePcdUtil } from "src/redux/actions/utilsAction";

export default function UpdatePcd() {

    const [state, setState] = useState(null)

    const dispatch = useDispatch()
    const pcd = useSelector(state => state.utils.pcdutil)

    useEffect(() => {
        dispatch(getPcdUtil());
    }, [])

    useEffect(() => {
        if (pcd) {
            setState(pcd[0])
        }
    }, [pcd])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target

        if (!files) {
            return;
        }

        setState((prev) => ({
            ...prev,
            [name]: files[0]
        }))
    }

    const patchPcd = () => {
        const formData = new FormData();

        formData.append('head_pcd', state.head_pcd); // Replace with your value
        formData.append('image_alt_pcd', state.image_alt_pcd); // Replace with your value
        
        if (typeof state.image_pcd === "object") {
            formData.append('image_pcd', state.image_pcd);
        }
        
        dispatch(updatePcdUtil(state._id, formData))
    }


    return (
        state &&
        <>
            <Stack direction="column" spacing={2}>
                <TextField
                    name="head_pcd"
                    value={state.head_pcd}
                    onChange={handleChange}
                    label="head_pcd"
                />
                <img
                    src={state.image_pcd}
                    alt="image"
                    height="100px"
                    width="100px"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name="image_pcd"
                />
                <TextField
                    name="image_alt_pcd"
                    value={state.image_alt_pcd}
                    onChange={handleChange}
                    label="image_alt_pcd"
                />
                <Button variant="contained" onClick={patchPcd}>
                    Update
                </Button>
            </Stack>
        </>
    )
}