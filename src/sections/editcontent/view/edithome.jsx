import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Stack } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

import { getHomeUtil, updateHomeUtil } from "src/redux/actions/utilsAction";

export default function UpdateHome() {
  const [state, setState] = useState(null);
  const [faq, setFaq] = useState({ ques: "", ans: "" });
  const [numb, setNumb] = useState({ numb: 0, head: "" });
  const [vertical, setVertical] = useState({ head: "", image: null });

  const dispatch = useDispatch();
  const home = useSelector((reduxState) => reduxState.utils.homeutil);

  useEffect(() => {
    dispatch(getHomeUtil());
  }, [dispatch]);

  useEffect(() => {
    if (home) {
      setState(home[0]);
    }
  }, [home]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
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

  const handleChangeNumbs = (e) => {
    const { name, value } = e.target;
    setNumb((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteNumbs = (id) => {
    const temp = state.numbs.filter((_, i) => i !== id);
    setState((prev) => ({
      ...prev,
      numbs: temp,
    }));
  };

  const handleAddNumbs = () => {
    const temp = [...state.numbs, numb];
    setState((prev) => ({
      ...prev,
      numbs: temp,
    }));
    setNumb({ numb: 0, head: "" });
  };

  const patchHome = () => {
    const formData = new FormData();
    const fields = [
      "head_hero",
      "subhead_about",
      "text_about",
      "image_alt_about1",
      "image_alt_about2",
      "subhead_quality",
      "text_quality",
      "image_alt_quality",
      "head_whyus",
      "text1_whyus",
      "whylist_whyus",
      "text2_whyus",
      "text_3_whyus",
      "image_alt_3_whyus",
      "text_4_whyus",
      "image_alt_4_whyus",
      "faqs",
      "numbs",
    ];
    fields.forEach((field) =>
      formData.append(
        field,
        field === "numbs" || field === "faqs"
          ? JSON.stringify(state[field])
          : state[field]
      )
    );
    [
      "image_about1",
      "image_about2",
      "image_quality",
      "image_3_whyus",
      "image_4_whyus",
    ].forEach((field) => {
      if (typeof state[field] === "object") {
        formData.append(field, state[field]);
      }
    });

    dispatch(updateHomeUtil(state._id, formData));
  };

  return (
    state && (
      <Stack direction="column" spacing={2}>
        {[
          { name: "head_hero", label: "head_hero" },
          { name: "subhead_about", label: "subhead_about" },
          { name: "text_about", label: "text_about" },
          { name: "image_alt_about1", label: "image_alt_about1" },
          { name: "image_alt_about2", label: "image_alt_about2" },
          { name: "subhead_quality", label: "subhead_quality" },
          { name: "text_quality", label: "text_quality" },
          { name: "image_alt_quality", label: "image_alt_quality" },
          { name: "head_whyus", label: "head_whyus" },
          { name: "text1_whyus", label: "text1_whyus" },
          { name: "text2_whyus", label: "text2_whyus" },
          { name: "text_3_whyus", label: "text_3_whyus" },
          { name: "image_alt_3_whyus", label: "image_alt_3_whyus" },
          { name: "text_4_whyus", label: "text_4_whyus" },
          { name: "image_alt_4_whyus", label: "image_alt_4_whyus" },
          { name: "whylist_whyus", label: "whylist_whyus" },
        ].map(({ name, label }) => (
          <TextField
            key={name}
            name={name}
            value={state[name] || ""}
            onChange={handleChange}
            label={label}
          />
        ))}
        {[
          { name: "image_about1", src: state.image_about1 },
          { name: "image_about2", src: state.image_about2 },
          { name: "image_quality", src: state.image_quality },
          { name: "image_3_whyus", src: state.image_3_whyus },
          { name: "image_4_whyus", src: state.image_4_whyus },
        ].map(({ name, src }) => (
          <React.Fragment key={name}>
            <Typography variant="h5">{name}</Typography>
            <img src={src} alt="" height="100px" width="100px" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              name={name}
            />
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

        <Typography variant="h6">Numbers</Typography>
        {["numb", "head"].map((name) => (
          <TextField
            key={name}
            name={name}
            value={numb[name]}
            onChange={handleChangeNumbs}
            label={name}
          />
        ))}

        <Button onClick={handleAddNumbs}>Add Number</Button>
        {state.numbs.map((stp, i) => (
          <React.Fragment key={i}>
            <Typography>
              <b>Number:</b> {stp.numb}
            </Typography>
            <Typography>
              <b>Heading:</b> {stp.head}
            </Typography>
            <Button onClick={() => handleDeleteNumbs(i)}>Remove Number</Button>
          </React.Fragment>
        ))}
        <Button variant="contained" onClick={patchHome}>
          Update Home Page
        </Button>
      </Stack>
    )
  );
}
