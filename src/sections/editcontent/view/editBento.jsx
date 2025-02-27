import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Stack, Button, TextField, Typography } from "@mui/material";

import { getBentoUtil, updateBentoUtil } from "src/redux/actions/utilsAction";

export default function UpdateBento() {
  const [state, setState] = useState(null);
  const dispatch = useDispatch();
  const bento = useSelector((reduxState) => reduxState.utils.bentoutil);

  useEffect(() => {
    dispatch(getBentoUtil());
  }, [dispatch]);

  useEffect(() => {
    if (bento && Array.isArray(bento) && bento.length > 0) {
      setState(bento[0]);
    }
  }, [bento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setState((prev) => {
      const updatedState = { ...prev };
      let temp = updatedState;

      for (let i = 0; i < keys.length - 1; i += 1) {
        temp[keys[i]] = { ...temp[keys[i]] };
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;

      return updatedState;
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    const keys = name.split(".");

    setState((prev) => {
      const updatedState = { ...prev };
      let temp = updatedState;

      for (let i = 0; i < keys.length - 1; i += 1) {
        temp[keys[i]] = { ...temp[keys[i]] };
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = files[0];

      return updatedState;
    });
  };

  const appendNestedFields = (formData, obj, parentKey = "") => {
    Object.keys(obj).forEach((key) => {
      const fieldName = parentKey ? `${parentKey}.${key}` : key;

      if (obj[key] instanceof File) {
        formData.append(fieldName, obj[key]);
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        appendNestedFields(formData, obj[key], fieldName);
      } else {
        formData.append(fieldName, obj[key] || "");
      }
    });
  };

  const patchBento = () => {
    if (!state || !state._id) return;

    const formData = new FormData();
    appendNestedFields(formData, state);
    dispatch(updateBentoUtil(state._id, formData));
  };

  return (
    state && (
      <Stack direction="column" spacing={4}>
        <Grid container spacing={2}>
          {[
            "service_bento.value1_head",
            "service_bento.value1_desc",
            "service_bento.value2_head",
            "service_bento.value2_desc",
          ].map((name) => {
            const [parent, child] = name.split(".");
            return (
              <Grid item md={6} key={name}>
                <TextField
                  fullWidth
                  name={name}
                  value={state?.[parent]?.[child] || ""}
                  onChange={handleChange}
                  label={name.replace(/_/g, " ")}
                  variant="outlined"
                />
              </Grid>
            );
          })}
        </Grid>
        <Typography variant="h6">Images</Typography>
        <Grid container spacing={2}>
          {[
            "service_bento.box1_image",
            "service_bento.value1_image",
            "service_bento.value2_image",
            "vertical_bento.box1_image",
            "service_bento.contact_image",
          ].map((name) => {
            const [parent, child] = name.split(".");
            const imageUrl =
              state?.[parent]?.[child] instanceof File
                ? URL.createObjectURL(state[parent][child])
                : state?.[parent]?.[child];

            return (
              <Grid item xs={12} md={6} key={name} sx={{ textAlign: "center" }}>
                {imageUrl && <img src={imageUrl} alt={name} height="100px" />}
                <Button variant="outlined" component="label">
                  Upload {name.replace(/_/g, " ")}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name={name}
                    hidden
                  />
                </Button>
              </Grid>
            );
          })}
        </Grid>
        <Button variant="contained" onClick={patchBento}>
          Update Bento Grid
        </Button>
      </Stack>
    )
  );
}
