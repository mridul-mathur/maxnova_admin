import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Stack } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

import { getPcdUtil, updatePcdUtil } from "src/redux/actions/utilsAction";

export default function UpdatePcd() {
  const [state, setState] = useState(null);
  const [faq, setFaq] = useState({ ques: "", ans: "" });
  const dispatch = useDispatch();
  const pcd = useSelector((reduxState) => reduxState.utils.pcdutil);

  useEffect(() => {
    dispatch(getPcdUtil());
  }, [dispatch]);

  useEffect(() => {
    if (pcd) {
      setState(pcd[0]);
    }
  }, [pcd]);

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

  const patchPcd = () => {
    const formData = new FormData();
    const fields = ["head_pcd", "text_pcd", "image_alt_pcd", "faqs"];

    fields.forEach((field) =>
      formData.append(
        field,
        field === "faqs" ? JSON.stringify(state[field]) : state[field]
      )
    );

    if (typeof state.image_pcd === "object") {
      formData.append("image_pcd", state.image_pcd);
    }

    dispatch(updatePcdUtil(state._id, formData));
  };

  return (
    state && (
      <Stack direction="column" spacing={2}>
        {["head_pcd", "text_pcd", "image_alt_pcd"].map((name) => (
          <TextField
            key={name}
            name={name}
            value={state[name]}
            onChange={handleChange}
            label={name}
          />
        ))}
        <img src={state.image_pcd} alt="" height="100px" width="100px" />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          name="image_pcd"
        />

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
        <Button variant="contained" onClick={patchPcd}>
          Update
        </Button>
      </Stack>
    )
  );
}
