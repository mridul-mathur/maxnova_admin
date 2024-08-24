import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Stack } from "@mui/system";
import { Button, TextField } from "@mui/material";

import { getHomeUtil, updateHomeUtil } from "src/redux/actions/utilsAction";

export default function UpdateHome() {
  const [state, setState] = useState(null);

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
    if (!files) return;
    setState((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const patchHome = () => {
    const formData = new FormData();
    const fields = [
      "head_hero",
      "spline_hero",
      "subhead_about",
      "text_about",
      "image_alt_about",
      "head_whyus",
      "text1_whyus",
      "whylist_whyus",
      "text2_whyus",
      "text_3_whyus",
      "image_alt_3_whyus",
      "text_4_whyus",
      "image_alt_4_whyus",
    ];

    fields.forEach((field) => formData.append(field, state[field]));

    ["image_about", "image_3_whyus", "image_4_whyus"].forEach((field) => {
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
          { name: "spline_hero", label: "spline_hero" },
          { name: "subhead_about", label: "subhead_about" },
          { name: "text_about", label: "text_about" },
          { name: "image_alt_about", label: "image_alt_about" },
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
            value={state[name]}
            onChange={handleChange}
            label={label}
          />
        ))}
        {[
          { name: "image_about", src: state.image_about },
          { name: "image_3_whyus", src: state.image_3_whyus },
          { name: "image_4_whyus", src: state.image_4_whyus },
        ].map(({ name, src }) => (
          <React.Fragment key={name}>
            <img src={src} alt="" height="100px" width="100px" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              name={name}
            />
          </React.Fragment>
        ))}
        <Button variant="contained" onClick={patchHome}>
          Update
        </Button>
      </Stack>
    )
  );
}
