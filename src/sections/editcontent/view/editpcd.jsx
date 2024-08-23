import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Stack } from "@mui/system";
import { Button, TextField } from "@mui/material";

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
    const fields = ["head_pcd", "image_alt_pcd"];

    fields.forEach((field) => formData.append(field, state[field]));

    if (typeof state.image_pcd === "object") {
      formData.append("image_pcd", state.image_pcd);
    }

    dispatch(updatePcdUtil(state._id, formData));
  };

  return (
    state && (
      <Stack direction="column" spacing={2}>
        {["head_pcd", "image_alt_pcd"].map((name) => (
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
        <Button variant="contained" onClick={patchPcd}>
          Update
        </Button>
      </Stack>
    )
  );
}
