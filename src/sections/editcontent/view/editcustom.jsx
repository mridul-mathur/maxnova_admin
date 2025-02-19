import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Stack } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

import { getCustomUtil, updateCustomUtil } from "src/redux/actions/utilsAction";

export default function UpdateCustom() {
  const [state, setState] = useState(null);
  const [step, setStep] = useState({ head: "", text: "" });

  const dispatch = useDispatch();
  const custom = useSelector((reduxState) => reduxState.utils.customutil);

  useEffect(() => {
    dispatch(getCustomUtil());
  }, [dispatch]);

  useEffect(() => {
    if (custom) {
      setState(custom[0]);
    }
  }, [custom]);

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

  const patchPvt = () => {
    const formData = new FormData();
    const fields = [
      "head_custom",
      "image_alt_custom",
      "text_custom",
      "slogan",
      "steps",
    ];

    fields.forEach((field) =>
      formData.append(
        field,
        field === "steps" ? JSON.stringify(state[field]) : state[field]
      )
    );

    if (typeof state.image_custom === "object") {
      formData.append("image_custom", state.image_custom);
    }

    dispatch(updateCustomUtil(state._id, formData));
  };

  const handleChangeSteps = (e) => {
    const { name, value } = e.target;
    setStep((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteSteps = (id) => {
    const temp = state.steps.filter((_, i) => i !== id);
    setState((prev) => ({
      ...prev,
      steps: temp,
    }));
  };

  const handleAddStep = () => {
    const temp = [...state.steps, step];
    setState((prev) => ({
      ...prev,
      steps: temp,
    }));
    setStep({ head: "", text: "" });
  };

  return (
    state && (
      <Stack direction="column" spacing={2}>
        {["head_custom", "text_custom", "slogan", "image_alt_custom"].map(
          (name) => (
            <TextField
              key={name}
              name={name}
              value={state[name]}
              onChange={handleChange}
              label={name}
            />
          )
        )}
        <img src={state.image_custom} alt="" height="100px" width="100px" />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          name="image_custom"
        />
        {["head", "text"].map((name) => (
          <TextField
            key={name}
            name={name}
            value={step[name]}
            onChange={handleChangeSteps}
            label={name}
          />
        ))}
        <Button onClick={handleAddStep}>Add Step</Button>
        {state.steps.map((stp, i) => (
          <React.Fragment key={i}>
            <Typography>
              <b>Head:</b> {stp.head}
            </Typography>
            <Typography>
              <b>Text:</b> {stp.text}
            </Typography>
            <Button onClick={() => handleDeleteSteps(i)}>Remove</Button>
          </React.Fragment>
        ))}
        <Button variant="contained" onClick={patchPvt}>
          Update
        </Button>
      </Stack>
    )
  );
}
