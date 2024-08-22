import { TextField, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPvtUtil, updatePvtUtil } from "src/redux/actions/utilsAction";

export default function UpdatePvt() {

    const [state, setState] = useState(null)

    const dispatch = useDispatch()
    const pvt = useSelector(state => state.utils.pvtutil)

    const [step, setStep] = useState({
        head: '',
        text: ''
    })

    useEffect(() => {
        dispatch(getPvtUtil());
    }, [])

    useEffect(() => {
        if (pvt) {
            setState(pvt[0])
        }
    }, [pvt])

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

    const patchPvt = () => {
        const formData = new FormData();

        formData.append('head_pvt', state.head_pvt);
        formData.append('image_alt_pvt', state.image_alt_pvt);
        formData.append('text_pvt', state.text_pvt);
        formData.append('steps', JSON.stringify(state.steps));

        if (typeof state.image_pvt === "object") {
            formData.append('image_pvt', state.image_pvt);
        }

        dispatch(updatePvtUtil(state._id, formData))
    }

    const handleChangeSteps = (e) => {
        const { name, value } = e.target
        setStep((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDeleteSteps = (id) => {
        const temp = state.steps.filter((_, i) => i !== id)
        setState((prev) => ({
            ...prev,
            steps: temp
        }))
    }

    const handleAddStep = () => {
        const temp = [...state.steps]
        temp.push(step)
        setState((prev) => ({
            ...prev,
            steps: temp
        }))
        setStep({
            head: '',
            text: ''
        })
    }

    return (
        state &&
        <>
            <Stack direction="column" spacing={2}>
                <TextField
                    name="head_pvt"
                    value={state.head_pvt}
                    onChange={handleChange}
                    label="head_pvt"
                />
                <TextField
                    name="text_pvt"
                    value={state.text_pvt}
                    onChange={handleChange}
                    label="text_pvt"
                />
                <img
                    src={state.image_pvt}
                    alt="image"
                    height="100px"
                    width="100px"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name="image_pvt"
                />
                <TextField
                    name="image_alt_pvt"
                    value={state.image_alt_pvt}
                    onChange={handleChange}
                    label="image_alt_pvt"
                />
                <TextField
                    name="head"
                    value={step.head}
                    onChange={handleChangeSteps}
                    label="head"
                />
                <TextField
                    name="text"
                    value={step.text}
                    onChange={handleChangeSteps}
                    label="text"
                />
                <Button onClick={handleAddStep}>
                    Add Step
                </Button>
                {state && state.steps.map((step, i) => (
                    <>
                        <Typography key={i}>
                            <b>Head:</b> {step.head}
                        </Typography>
                        <Typography key={i}>
                            <b>Text:</b> {step.text}
                        </Typography>
                        <Button onClick={() => handleDeleteSteps(i)}>
                            Remove
                        </Button>
                    </>
                ))}
                <Button variant="contained" onClick={patchPvt}>
                    Update
                </Button>
            </Stack>
        </>
    )
}