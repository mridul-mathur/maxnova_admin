import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid, Stack, Button, TextField, Typography } from "@mui/material";

import { getAboutUtil, updateAboutUtil } from "src/redux/actions/utilsAction";

export default function UpdateAbout() {
  const [state, setState] = useState(null);
  const [vali, setVali] = useState({ head: "", text: "" });
  const dispatch = useDispatch();
  const about = useSelector((reduxState) => reduxState.utils.aboututil);
  const [images, setImages] = useState(null);

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
    setImages([...e.target.files]);
  };

  const patchAbout = () => {
    const formData = new FormData();
    const fields = [
      "subhead_hero",
      "subhead_about",
      "text_about",
      "image_alt_about",
      "subhead_vm1",
      "text_vm1",
      "subhead_vm2",
      "text_vm2",
      "image_alt_vm",
      "values",
    ];

    fields.forEach((field) => {
      if (state[field] !== undefined && state[field] !== null) {
        formData.append(
          field,
          field === "values" ? JSON.stringify(state[field]) : state[field]
        );
      }
    });

    if (typeof state.image_about === "object") {
      formData.append("about_image", state.image_about);
    }
    if (typeof state.image_vm === "object") {
      formData.append("image_vm", state.image_vm);
    }
    if (images && images.length > 0) {
      images.forEach((file) => {
        formData.append("hero_images", file);
      });
    }

    dispatch(updateAboutUtil(state._id, formData));
  };

  const handleChangeValues = (e) => {
    const { name, value } = e.target;
    setVali((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteValues = (id) => {
    const temp = state.values.filter((_, i) => i !== id);
    setState((prev) => ({
      ...prev,
      values: temp,
    }));
  };

  const handleAddValue = () => {
    const temp = [...state.values, vali];
    setState((prev) => ({
      ...prev,
      values: temp,
    }));
    setVali({ head: "", text: "" });
  };

  return (
    state && (
      <Stack direction="column" spacing={4}>
        <Grid container spacing={2}>
          {[
            "subhead_hero",
            "subhead_about",
            "text_about",
            "subhead_vm1",
            "text_vm1",
            "subhead_vm2",
            "text_vm2",
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

        <Typography variant="h5">Hero Images</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          {state.image.map((img, i) => (
            <Box key={i} sx={{ textAlign: "center" }}>
              <img
                src={img}
                alt={`Preview ${i}`}
                style={{ height: "200px", width: "auto" }}
              />
            </Box>
          ))}
        </Box>
        <Button
          size="medium"
          variant="outlined"
          component="label"
          sx={{ my: 1, width: "fit-content", alignSelf: "center" }}
        >
          Upload Hero Images (9 only)
          <input
            type="file"
            accept="image/*"
            onChange={handleMultipleFiles}
            name="hero_images"
            multiple
            hidden
          />
        </Button>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center", gap: 2 }}>
              <Typography variant="h6" sx={{ my: 1, textAlign: "left" }}>
                About Image
              </Typography>
              <img
                src={state.image_about}
                alt={state.image_alt_about || "About Image"}
                height="100px"
                style={{
                  borderRadius: "8px",
                  marginTop: "1em",
                  marginBottom: "1em",
                }}
              />
              <TextField
                fullWidth
                name="image_alt_about"
                value={state.image_alt_about || ""}
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
                Upload About Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  name="image_about"
                  hidden
                />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ my: 1, textAlign: "left" }}>
                Vision & Mission Image
              </Typography>
              <img
                src={state.image_vm}
                alt={state.image_alt_vm || "Vision & Mission"}
                height="100px"
                style={{
                  borderRadius: "8px",
                  marginTop: "1em",
                  marginBottom: "1em",
                }}
              />
              <TextField
                fullWidth
                name="image_alt_vm"
                value={state.image_alt_vm || ""}
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
                Upload Vision & Mission Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  name="image_vm"
                  hidden
                />
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="h6">Add Values</Typography>
        <Grid container spacing={2}>
          {["head", "text"].map((name) => (
            <Grid item xs={12} md={6} key={name}>
              <TextField
                fullWidth
                name={name}
                value={vali[name] || ""}
                onChange={handleChangeValues}
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
          sx={{ width: "fit-content", alignSelf: "center" }}
          onClick={handleAddValue}
        >
          Add Value
        </Button>
        <Box>
          {state.values.map((stp, i) => (
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
              <Typography sx={{ my: 1, display: "flex", gap: 1 }}>
                <b>Head:</b>
                {stp.head}
              </Typography>
              <Typography sx={{ my: 1, display: "flex", gap: 1 }}>
                <b>Text:</b>
                {stp.text}
              </Typography>
              <Button
                size="medium"
                variant="outlined"
                component="label"
                sx={{ width: "fit-content", alignSelf: "center" }}
                color="error"
                onClick={() => handleDeleteValues(i)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Box>

        <Button size="medium" variant="contained" onClick={patchAbout}>
          Update About Page
        </Button>
      </Stack>
    )
  );
}
