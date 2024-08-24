import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Stack } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

import { getAboutUtil, updateAboutUtil } from "src/redux/actions/utilsAction";

export default function UpdateAbout() {
    const [state, setState] = useState(null);
    const dispatch = useDispatch();
    const about = useSelector((reduxState) => reduxState.utils.aboututil);

    const [images, setImages] = useState(null)

    useEffect(() => {
        dispatch(getAboutUtil());
    }, [dispatch]);

    useEffect(() => {
        if (about) {
            setState(about[0]);
        }
    }, [about]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (!files) return;
        setState((prev) => ({
            ...prev,
            [name]: files[0],
        }));
    };

    const handleMultipleFiles = (e) => {
        setImages([...e.target.files])
    }

    const patchAbout = () => {
        const formData = new FormData();
        const fields = ["subhead_hero", "subhead_about", "text_about", "image_alt_about"];

        fields.forEach((field) =>
            formData.append(
                field, state[field]
            )
        );

        if (typeof state.image_about === "object") {
            formData.append("about_image", state.image_about);
        }

        if (images && images.length > 0) {
            images.forEach((file) => {
                formData.append('hero_images', file);
            });
        }


        dispatch(updateAboutUtil(state._id, formData));
    };



    return (
        state && (
            <Stack direction="column" spacing={2}>
                {["subhead_hero", "subhead_about", "text_about", "image_alt_about"].map((name) => (
                    <TextField
                        key={name}
                        name={name}
                        value={state[name]}
                        onChange={handleChange}
                        label={name}
                    />
                ))}
                {state.image.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt="image"
                        height="100px"
                        width="100px"
                    />
                ))}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleMultipleFiles}
                    name="hero_images"
                    multiple
                />
                <img
                    src={state.image_about} alt="image" height="100px" width="100px"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name="image_about"
                />
                <Button variant="contained" onClick={patchAbout}>
                    Update
                </Button>
            </Stack>
        )
    );
}
