import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Stack } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

import { addCertificate, getCertificates, deleteCertificate } from "src/redux/actions/utilsAction";

export default function UpdateCertificates() {
    const [state, setState] = useState(null);
    const dispatch = useDispatch();
    const certificates = useSelector((reduxState) => reduxState.utils.certificates);

    const [certificate, setCertificate] = useState({
        text: '',
        image: null,
        image_alt: ''
    })

    useEffect(() => {
        dispatch(getCertificates());
    }, [dispatch]);

    useEffect(() => {
        if (certificates) {
            setState(certificates);
        }
    }, [certificates]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCertificate((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (!files) return;
        setCertificate((prev) => ({
            ...prev,
            [name]: files[0],
        }));
    };

    const handleAdd = () => {
        const formData = new FormData();
        const fields = ["text", "image_alt"];

        fields.forEach((field) => {
            formData.append(
                field, certificate[field]
            )
        });

        formData.append("image", certificate.image);

        dispatch(addCertificate(formData));

        setCertificate({
            text: '',
            image: null,
            image_alt: ''
        })
    };


    const handleDelete = (id) => {
        dispatch(deleteCertificate(id))
    }


    console.log(certificate)


    return (state &&
        <Stack direction="column" spacing={2}>
            {["text", "image_alt"].map((name) => (
                <TextField
                    key={name}
                    name={name}
                    value={state[name]}
                    onChange={handleChange}
                    label={name}
                />
            ))}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                name="image"
            />
            {state && state.map((data) => (
                <>
                    <Typography key={data._id}>
                        <b>Text:</b> {data.text}
                    </Typography>
                    <Typography>
                        <b>Image Alt:</b> {data.image_alt}
                    </Typography>
                    <img
                        src={data.image}
                        alt="image"
                        width="100px"
                        height="100px"
                    />
                    <Button onClick={() => handleDelete(data._id)}>
                        Delete
                    </Button>
                </>
            ))}
            <Button variant="contained" onClick={handleAdd}>
                Add
            </Button>
        </Stack>
    );
}
