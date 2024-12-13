import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Stack } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

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
    const { name, val } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: val,
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
      "subhead_research",
      "text_research",
      "image_alt_research1",
      "image_alt_research2",
      "values",
    ];

    fields.forEach((field) =>
      formData.append(
        field,
        field === "values" ? JSON.stringify(state[field]) : state[field]
      )
    );

    if (typeof state.image_about === "object") {
      formData.append("about_image", state.image_about);
    }
    if (typeof state.image_research1 === "object") {
      formData.append("image_research1", state.image_research1);
    }

    if (typeof state.image_research2 === "object") {
      formData.append("image_research2", state.image_research2);
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
      <Stack direction="column" spacing={2}>
        {[
          "subhead_hero",
          "subhead_about",
          "text_about",
          "image_alt_about",
          "subhead_research",
          "text_research",
          "image_alt_research1",
          "image_alt_research2",
        ].map((name) => (
          <TextField
            key={name}
            name={name}
            value={state[name]}
            onChange={handleChange}
            label={name}
          />
        ))}

        <Typography variant="h5">Upload Multiple Images - 12 </Typography>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          {state.image.map((img, i) => (
            <img key={i} src={img} alt="icds" height="100px" width="100px" />
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleMultipleFiles}
          name="hero_images"
          multiple
        />

        <Typography variant="h5">About Image</Typography>
        <img src={state.image_about} alt="" height="100px" width="100px" />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          name="image_about"
        />

        <Typography variant="h5">Research Image 1</Typography>

        <img
          src={state.image_research1}
          alt={state.image_alt_research1 || ""}
          height="100px"
          width="100px"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          name="image_research1"
        />

        <Typography variant="h5">Research Image 2</Typography>

        <img
          src={state.image_research2}
          alt={state.image_alt_research2 || ""}
          height="100px"
          width="100px"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          name="image_research2"
        />

        {["head", "text"].map((name) => (
          <TextField
            key={name}
            name={name}
            value={vali[name]}
            onChange={handleChangeValues}
            label={name}
          />
        ))}

        <Button onClick={handleAddValue}>Add Value</Button>
        {state.values.map((stp, i) => (
          <React.Fragment key={i}>
            <Typography>
              <b>Head:</b> {stp.head}
            </Typography>
            <Typography>
              <b>Text:</b> {stp.text}
            </Typography>
            <Button onClick={() => handleDeleteValues(i)}>Remove</Button>
          </React.Fragment>
        ))}

        <Button variant="contained" onClick={patchAbout}>
          Update About Page
        </Button>
      </Stack>
    )
  );
}
