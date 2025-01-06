import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Stack } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

import { getPvtUtil, updatePvtUtil } from "src/redux/actions/utilsAction";

export default function UpdatePvt() {
  const [state, setState] = useState(null);
  const [step, setStep] = useState({ head: "", text: "" });
  const [faq, setFaq] = useState({ ques: "", ans: "" });

  const dispatch = useDispatch();
  const pvt = useSelector((reduxState) => reduxState.utils.pvtutil);

  useEffect(() => {
    dispatch(getPvtUtil());
  }, [dispatch]);

  useEffect(() => {
    if (pvt) {
      setState(pvt[0]);
    }
  }, [pvt]);

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
    const fields = ["head_pvt", "image_alt_pvt", "text_pvt", "steps", "faqs"];

    fields.forEach((field) =>
      formData.append(
        field,
        field === "steps" || field === "faqs"
          ? JSON.stringify(state[field])
          : state[field]
      )
    );

    if (typeof state.image_pvt === "object") {
      formData.append("image_pvt", state.image_pvt);
    }

    dispatch(updatePvtUtil(state._id, formData));
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
  const handleChangeFaqs = (e) => {
    const { name, value } = e.target;
    setFaq((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteFaqs = (id) => {
    const temp = state.faqs.filter((_, i) => i !== id);
    setState((prev) => ({
      ...prev,
      faqs: temp,
    }));
  };

  const handleAddFaqs = () => {
    const temp = [...state.faqs, faq];
    setState((prev) => ({
      ...prev,
      faqs: temp,
    }));
    setFaq({ ques: "", ans: "" });
  };

  return (
    state && (
      <Stack direction="column" spacing={2}>
        {["head_pvt", "text_pvt", "image_alt_pvt"].map((name) => (
          <TextField
            key={name}
            name={name}
            value={state[name]}
            onChange={handleChange}
            label={name}
          />
        ))}
        <img src={state.image_pvt} alt="" height="100px" width="100px" />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          name="image_pvt"
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
            <Button onClick={() => handleDeleteSteps(i)}>Remove Step</Button>
          </React.Fragment>
        ))}

        <Typography variant="h6">FAQs</Typography>
        {["ques", "ans"].map((name) => (
          <TextField
            key={name}
            name={name}
            value={faq[name]}
            onChange={handleChangeFaqs}
            label={name}
          />
        ))}

        <Button onClick={handleAddFaqs}>Add FAQ</Button>
        {state.faqs.map((stp, i) => (
          <React.Fragment key={i}>
            <Typography>
              <b>Question:</b> {stp.ques}
            </Typography>
            <Typography>
              <b>Answer:</b> {stp.ans}
            </Typography>
            <Button onClick={() => handleDeleteFaqs(i)}>Remove FAQ</Button>
          </React.Fragment>
        ))}
        <Button variant="contained" onClick={patchPvt}>
          Update
        </Button>
      </Stack>
    )
  );
}
