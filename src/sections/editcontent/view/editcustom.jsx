import { TextField, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomUtil, updateCustomUtil } from "src/redux/actions/utilsAction";

export default function UpdateCustom() {

    const [state, setState] = useState(null)

    const dispatch = useDispatch()
    const custom = useSelector(state => state.utils.customutil)

    const [step, setStep] = useState({
        head: '',
        text: ''
    })

    useEffect(() => {
        dispatch(getCustomUtil());
    }, [])

    useEffect(() => {
        if (custom) {
            setState(custom[0])
        }
    }, [custom])

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

        formData.append('head_custom', state.head_custom);
        formData.append('image_alt_custom', state.image_alt_custom);
        formData.append('text_custom', state.text_custom);
        formData.append('steps', JSON.stringify(state.steps));

        if (typeof state.image_custom === "object") {
            formData.append('image_custom', state.image_custom);
        }

        dispatch(updateCustomUtil(state._id, formData))
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
                    name="head_custom"
                    value={state.head_custom}
                    onChange={handleChange}
                    label="head_custom"
                />
                <TextField
                    name="text_custom"
                    value={state.text_custom}
                    onChange={handleChange}
                    label="text_custom"
                />
                <img
                    src={state.image_custom}
                    alt="image"
                    height="100px"
                    width="100px"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name="image_custom"
                />
                <TextField
                    name="image_alt_custom"
                    value={state.image_alt_custom   }
                    onChange={handleChange}
                    label="image_alt_custom"
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