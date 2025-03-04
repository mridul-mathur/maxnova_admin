import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid, Stack, Button, TextField, Typography } from "@mui/material";

import { getPcdUtil, updatePcdUtil } from "src/redux/actions/utilsAction";

export default function UpdatePcd() {
  const [state, setState] = useState(null);
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

  const patchPcd = () => {
    const formData = new FormData();
    const fields = ["head_pcd", "text_pcd", "slogan", "image_alt_pcd"];

    fields.forEach((field) => formData.append(field, state[field]));

    if (typeof state.image_pcd === "object") {
      formData.append("image_pcd", state.image_pcd);
    }
    if (typeof state.image_hero_pcd === "object") {
      formData.append("image_hero_pcd", state.image_hero_pcd);
    }

    dispatch(updatePcdUtil(state._id, formData));
  };

  return (
    state && (
      <Stack direction="column" spacing={4}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Update PCD Details
        </Typography>

        <Grid container spacing={2}>
          {["head_pcd", "text_pcd", "slogan"].map((name) => (
            <Grid item xs={12} md={6} key={name}>
              <TextField
                fullWidth
                name={name}
                value={state[name] || ""}
                onChange={handleChange}
                label={name.replace("_", " ").toUpperCase()}
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center", gap: 2 }}>
              <Typography variant="h6" sx={{ my: 1, textAlign: "left" }}>
                PCD Image
              </Typography>
              <Box>
                <img
                  src={state.image_hero_pcd}
                  alt={state.image_alt_pcd || "PCD Image"}
                  height="100px"
                  style={{
                    borderRadius: "8px",
                    marginTop: "1em",
                    marginBottom: "1em",
                  }}
                />
                <Button
                  size="medium"
                  variant="outlined"
                  component="label"
                  sx={{ my: 1, width: "fit-content", alignSelf: "center" }}
                >
                  Upload image_hero_pcd
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name="image_hero_pcd"
                    hidden
                  />
                </Button>
              </Box>
              <Box>
                <img
                  src={state.image_pcd}
                  alt={state.image_alt_pcd || "PCD Image"}
                  height="100px"
                  style={{
                    borderRadius: "8px",
                    marginTop: "1em",
                    marginBottom: "1em",
                  }}
                />

                <Button
                  size="medium"
                  variant="outlined"
                  component="label"
                  sx={{ my: 1, width: "fit-content", alignSelf: "center" }}
                >
                  Upload image_pcd
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name="image_pcd"
                    hidden
                  />
                </Button>
              </Box>
              <TextField
                fullWidth
                name="image_alt_pcd"
                value={state.image_alt_pcd || ""}
                onChange={handleChange}
                label="Image Alt Text"
                variant="outlined"
                sx={{ my: 1 }}
              />
            </Box>
          </Grid>
        </Grid>
        <Button size="medium" variant="contained" onClick={patchPcd}>
          Update PCD
        </Button>
      </Stack>
    )
  );
}
