import { TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeUtil, updateHomeUtil } from "src/redux/actions/utilsAction";

export default function UpdateHome() {

    const [state, setState] = useState(null)

    const dispatch = useDispatch()
    const home = useSelector(state => state.utils.homeutil)

    useEffect(() => {
        dispatch(getHomeUtil());
    }, [])

    useEffect(() => {
        if (home) {
            setState(home[0])
        }
    }, [home])

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

    const patchHome = () => {
        const formData = new FormData();

        formData.append('head_hero', state.head_hero); // Replace with your value
        formData.append('spleine_hero', state.spleine_hero); // Replace with your value
        formData.append('subhead_about', state.subhead_about); // Replace with your value
        formData.append('text_about', state.text_about); // Replace with your value
        formData.append('image_alt_about', state.image_alt_about); // Replace with your value
        formData.append('head_whyus', state.head_whyus); // Replace with your value
        formData.append('text1_whyus', state.text1_whyus); // Replace with your value
        formData.append('whylist_whyus', state.whylist_whyus); // Replace with your value
        formData.append('text2_whyus', state.text2_whyus); // Replace with your value
        formData.append('text_3_whyus', state.text_3_whyus); // Replace with your value
        formData.append('image_alt_3_whyus', state.image_alt_3_whyus); // Replace with your value
        formData.append('text_4_whyus', state.text_4_whyus); // Replace with your value
        formData.append('image_alt_4_whyus', state.image_alt_4_whyus); // Replace with your value

        if (typeof state.image_about === "object") {
            formData.append('image_about', state.image_about);
        }
        if (typeof state.image_3_whyus === "object") {
            formData.append('image_3_whyus', state.image_3_whyus);
        }
        if (typeof state.image_4_whyus === "object") {
            formData.append('image_4_whyus', state.image_4_whyus);
        }

        dispatch(updateHomeUtil(state._id, formData))
    }

    console.log(state)

    return (
        state &&
        <>
            <Stack direction="column" spacing={2}>
                <TextField
                    name="head_hero"
                    value={state.head_hero}
                    onChange={handleChange}
                    label="head_hero"
                />
                <TextField
                    name="spleine_hero"
                    value={state.spleine_hero}
                    onChange={handleChange}
                    label="spleine_hero"
                />
                <TextField
                    name="subhead_about"
                    value={state.subhead_about}
                    onChange={handleChange}
                    label="subhead_about"
                />
                <TextField
                    name="text_about"
                    value={state.text_about}
                    onChange={handleChange}
                    label="text_about"
                />
                <img
                    src={state.image_about}
                    alt="image"
                    height="100px"
                    width="100px"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name="image_about"
                />
                <TextField
                    name="image_alt_about"
                    value={state.image_alt_about}
                    onChange={handleChange}
                    label="image_alt_about"
                />
                <TextField
                    name="text1_whyus"
                    value={state.text1_whyus}
                    onChange={handleChange}
                    label="text1_whyus"
                />
                <TextField
                    name="text2_whyus"
                    value={state.text2_whyus}
                    onChange={handleChange}
                    label="text2_whyus"
                />
                <TextField
                    name="text_3_whyus"
                    value={state.text_3_whyus}
                    onChange={handleChange}
                    label="text_3_whyus"
                />
                <img
                    src={state.image_3_whyus}
                    alt="image"
                    height="100px"
                    width="100px"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name="image_3_whyus"
                />
                <TextField
                    name="image_alt_3_whyus"
                    value={state.image_alt_3_whyus}
                    onChange={handleChange}
                    label="image_alt_3_whyus"
                />
                <TextField
                    name="text_4_whyus"
                    value={state.text_4_whyus}
                    onChange={handleChange}
                    label="text_4_whyus"
                />
                <img
                    src={state.image_4_whyus}
                    alt="image"
                    height="100px"
                    width="100px"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name="image_4_whyus"
                />
                <TextField
                    name="image_alt_4_whyus"
                    value={state.image_alt_4_whyus}
                    onChange={handleChange}
                    label="image_alt_4_whyus"
                />
                <TextField
                    name="whylist_whyus"
                    value={state.whylist_whyus}
                    onChange={handleChange}
                    label="whylist_whyus"
                />
                <Button variant="contained" onClick={patchHome}>
                    Update
                </Button>
            </Stack>
        </>
    )
}