import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid, Stack, Button, TextField, Typography } from "@mui/material";

import { getHomeUtil, updateHomeUtil } from "src/redux/actions/utilsAction";

export default function UpdateHome() {
  const [state, setState] = useState(null);
  const [faq, setFaq] = useState({ ques: "", ans: "" });
  const [numb, setNumb] = useState({ numb: 0, head: "" });

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

    ["image_about1", "image_about2", "image_quality"].forEach((field) => {
      if (typeof state[field] === "object") {
        formData.append(field, state[field]);
      }
    });

    dispatch(updateHomeUtil(state._id, formData));
  };

  return (
    state && (
      <Stack direction="column" spacing={4}>
        <Grid container spacing={2}>
          {[
            "head_hero",
            "subhead_about",
            "text_about",
            "subhead_quality",
            "text_quality",
          ].map((name) => (
            <Grid item md={6} key={name}>
              <TextField
                fullWidth
                name={name}
                value={state[name] || ""}
                onChange={handleChange}
                label={name}
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
        <Typography variant="h6">Images</Typography>
        <Grid container spacing={2}>
          {[
            {
              name: "image_about1",
              src: state.image_about1,
              alt: state.image_alt_about1,
            },
            {
              name: "image_about2",
              src: state.image_about2,
              alt: state.image_alt_about2,
            },
            {
              name: "image_quality",
              src: state.image_quality,
              alt: state.image_alt_quality,
            },
          ].map(({ name, src, alt }) => (
            <Grid item xs={12} md={6} key={name} sx={{ textAlign: "center" }}>
              <img
                src={src}
                alt={alt || name}
                height="100px"
                style={{
                  width: "auto",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginTop: "1em",
                  marginBottom: "1em",
                }}
              />
              <TextField
                fullWidth
                name={`image_alt_${name}`}
                value={alt || ""}
                onChange={handleChange}
                label="Image Alt Text"
                variant="outlined"
                sx={{ my: 1 }}
              />
              <Button
                size="medium"
                variant="outlined"
                component="label"
                sx={{ my: 1, width: "fit-content", alignSelf: "center" }}
              >
                Upload {name}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  name={name}
                  hidden
                />
              </Button>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h6">FAQs</Typography>
        <Grid container spacing={2}>
          {["ques", "ans"].map((name) => (
            <Grid item xs={12} md={6} key={name}>
              <TextField
                fullWidth
                name={name}
                value={faq[name] || ""}
                onChange={handleChangeFaqs}
                label={name}
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
        <Button
          size="medium"
          variant="outlined"
          component="label"
          sx={{ my: 1, width: "fit-content", alignSelf: "center" }}
          onClick={handleAddFaqs}
        >
          Add FAQ
        </Button>
        <Box>
          {state.faqs.map((stp, i) => (
            <Box
              key={i}
              sx={{
                marginBottom: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
                paddingX: 2,
                paddingY: 1,
              }}
            >
              <Typography sx={{ my: 1 }}>
                <b>Question:</b> {stp.ques}
              </Typography>
              <Typography sx={{ my: 1 }}>
                <b>Answer:</b> {stp.ans}
              </Typography>
              <Button
                size="medium"
                variant="outlined"
                component="label"
                sx={{ my: 1, width: "fit-content", alignSelf: "center" }}
                color="error"
                onClick={() => handleDeleteFaqs(i)}
              >
                Remove FAQ
              </Button>
            </Box>
          ))}
        </Box>

        <Typography variant="h6">Numbers</Typography>
        <Grid container spacing={2}>
          {["numb", "head"].map((name) => (
            <Grid item xs={12} md={6} key={name}>
              {name === "numb" ? (
                <TextField
                  fullWidth
                  name={name}
                  value={numb[name] || 0}
                  onChange={handleChangeNumbs}
                  label={name}
                  variant="outlined"
                  type="number"
                />
              ) : (
                <TextField
                  fullWidth
                  name={name}
                  value={numb[name] || ""}
                  onChange={handleChangeNumbs}
                  label={name}
                  variant="outlined"
                />
              )}
            </Grid>
          ))}
        </Grid>
        <Button
          size="medium"
          variant="outlined"
          component="label"
          sx={{ my: 1, width: "fit-content", alignSelf: "center" }}
          onClick={handleAddNumbs}
        >
          Add Number
        </Button>
        <Box>
          {state.numbs.map((stp, i) => (
            <Box
              key={i}
              sx={{
                marginBottom: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
                paddingX: 2,
                paddingY: 1,
              }}
            >
              <Typography sx={{ my: 1 }}>
                <b>Number:</b> {stp.numb}
              </Typography>
              <Typography sx={{ my: 1 }}>
                <b>Heading:</b> {stp.head}
              </Typography>
              <Button
                size="medium"
                variant="outlined"
                component="label"
                sx={{ my: 1, width: "fit-content", alignSelf: "center" }}
                onClick={() => handleDeleteNumbs(i)}
                color="error"
              >
                Remove Number
              </Button>
            </Box>
          ))}
        </Box>

        <Button size="medium" variant="contained" onClick={patchHome}>
          Update Home Page
        </Button>
      </Stack>
    )
  );
}
