import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Stack } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

import { getHomeUtil, updateHomeUtil } from "src/redux/actions/utilsAction";

export default function UpdateHome() {
  const [state, setState] = useState(null);
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

  const handleVerticalChange = (e) => {
    const { name, value } = e.target;
    setVertical((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVerticalImageChange = (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;
    setVertical((prev) => ({
      ...prev,
      image: files[0],
    }));
  };

  const handleAddVertical = () => {
    const newVerticals = [...(state.verticals || []), vertical];
    setState((prev) => ({
      ...prev,
      verticals: newVerticals,
    }));
    setVertical({ head: "", image: null });
  };

  const handleDeleteVertical = (index) => {
    const updatedVerticals = state.verticals.filter((_, i) => i !== index);
    setState((prev) => ({
      ...prev,
      verticals: updatedVerticals,
    }));
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
    ];

    fields.forEach((field) => formData.append(field, state[field]));

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
    if (state.verticals) {
      state.verticals.forEach((vert, index) => {
        formData.append(`verticals[${index}][head]`, vert.head);
        if (typeof vert.image === "object") {
          formData.append(`verticals[${index}][image]`, vert.image);
        }
      });
    }
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
        <Typography variant="h6">Verticals</Typography>
        <TextField
          name="head"
          value={vertical.head}
          onChange={handleVerticalChange}
          label="Vertical Heading"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleVerticalImageChange}
        />
        <Button onClick={handleAddVertical}>Add Vertical</Button>

        {state.verticals?.map((vert, index) => (
          <React.Fragment key={index}>
            <Typography>
              <b>Heading:</b> {vert.head}
            </Typography>
            {vert.image && (
              <img
                onChange={handleFileChange}
                src={URL.createObjectURL(vert.image)}
                alt="Vertical"
                height="100px"
                width="100px"
              />
            )}
            <Button onClick={() => handleDeleteVertical(index)}>
              Remove Vertical
            </Button>
          </React.Fragment>
        ))}

        <Button variant="contained" onClick={patchHome}>
          Update Home
        </Button>
      </Stack>
    )
  );
}
