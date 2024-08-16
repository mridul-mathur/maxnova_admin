import PropTypes from "prop-types";
import React, { useState, useCallback } from "react";

import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ImageList from "@mui/material/ImageList";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ImageListItem from "@mui/material/ImageListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import EditModel from "./editmodal";

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export default function EditContent() {
  const pages = [
    { name: "home", data: home },
    { name: "about", data: about },
    { name: "Private Label", data: pvtlabel },
    { name: "Custom Formulation", data: customform },
  ];

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Edit Content
      </Typography>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
          px: 2,
        }}
        component="nav"
      >
        <Typography variant="h6" sx={{ my: 1 }}>
          Pages
        </Typography>
        {pages.map(({ name, data }) => (
          <PageTable key={name} pageName={name} pageData={data} />
        ))}
      </List>
    </div>
  );
}

function PageTable({ pageName, pageData }) {
  const [open, setOpen] = useState(true);
  const handleClick = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ background: "#fff" }}>
        <ListItemText primary={`${capitalizeFirstLetter(pageName)} Page`} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit sx={{ px: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Sections
        </Typography>
        <List component="div" disablePadding sx={{ px: 2 }}>
          {Object.keys(pageData).map((sectionKey) => (
            <SectionItem
              key={sectionKey}
              sectionName={sectionKey}
              sectionData={pageData[sectionKey]}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
}

function SectionItem({ sectionName, sectionData }) {
  const [open, setOpen] = useState(false);
  const handleClick = useCallback(() => setOpen((prev) => !prev), []);

  const renderSectionContent = (data) => {
    if (Array.isArray(data)) {
      return (
        <ImageList
          sx={{ width: "100%", height: "auto" }}
          cols={3}
          rowHeight={164}
        >
          {data.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={item.image}
                alt={item.image_alt}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {item.text && (
                <ListItemText primary={item.text} sx={{ fontWeight: "bold" }} />
              )}
            </ImageListItem>
          ))}
        </ImageList>
      );
    }

    if (typeof data === "object" && data !== null) {
      return Object.keys(data).map((key, index) => (
        <List key={index}>
          {typeof data[key] === "object" ? (
            <SectionItem sectionName={key} sectionData={data[key]} />
          ) : (
            <>
              {key === "image" ? (
                <ImageItem src={data[key]} alt={data.image_alt} />
              ) : (
                <ListItemText
                  primary={`${capitalizeFirstLetter(key)}: ${data[key]}`}
                />
              )}
            </>
          )}
        </List>
      ));
    }

    return <ListItemText primary={data} />;
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={capitalizeFirstLetter(sectionName)} />
        <EditModel content={sectionData} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ px: 6, py: 0 }}>
          {renderSectionContent(sectionData)}
        </List>
      </Collapse>
    </>
  );
}

function ImageItem({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt || "Image"}
      style={{ width: "auto", height: 100 }}
    />
  );
}

PageTable.propTypes = {
  pageName: PropTypes.string.isRequired,
  pageData: PropTypes.object.isRequired,
};

SectionItem.propTypes = {
  sectionName: PropTypes.string.isRequired,
  sectionData: PropTypes.any.isRequired,
};

ImageItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

const home = {
  hero: {
    head: "WE ARE LEADING\nCOSMETIC MANUFACTURER",
    splineurl: "https://example.com/3d-model",
  },
  about: {
    subhead:
      "All the credits goes to each person working in the backend day and night for us.",
    text: "Maxnova group of companies is committed to delivering happiness in the form of ’good health’ in everyone’s home.",
    image: "../../../../public/assets/images/covers/cover_6.jpg",
    image_alt: "An image showing a happy family",
  },
  whyus: {
    head: "Extensive range\nof products",
    text1: "Hassle-free product\nmanufacturing and delivery",
    image1: {
      text: "Short product development cycle & Brand-specific products with Specialised consultation",
      image: "../../../../public/assets/images/covers/cover_7.jpg",
      image_alt: "An image of our top product",
    },
    image2: {
      text: "Short product development cycle with Specialised consultation",
      image: "../../../../public/assets/images/covers/cover_8.jpg",
      image_alt: "An image of our second top product",
    },
    whylist: {
      text: "Unique Products Variety Of Products High Quality Cost-effective Timely Delivery Personalized Products",
    },

    text2: "Value driven and quality conscious!",
  },
};

const about = {
  hero: {
    subhead:
      "All the credits goes to each person working in the backend day and night for us.",
    images: [
      {
        image: "../../../../public/assets/images/covers/cover_9.jpg",
        image_alt: "Our team",
      },
      {
        image: "../../../../public/assets/images/covers/cover_10.jpg",
        image_alt: "Company building",
      },
      {
        image: "../../../../public/assets/images/covers/cover_10.jpg",
        image_alt: "Company building",
      },
      {
        image: "../../../../public/assets/images/covers/cover_10.jpg",
        image_alt: "Company building",
      },
      {
        image: "../../../../public/assets/images/covers/cover_10.jpg",
        image_alt: "Company building",
      },
      {
        image: "../../../../public/assets/images/covers/cover_10.jpg",
        image_alt: "Company building",
      },
      {
        image: "../../../../public/assets/images/covers/cover_10.jpg",
        image_alt: "Company building",
      },
      {
        image: "../../../../public/assets/images/covers/cover_10.jpg",
        image_alt: "Company building",
      },
      {
        image: "../../../../public/assets/images/covers/cover_10.jpg",
        image_alt: "Company building",
      },
      {
        image: "../../../../public/assets/images/covers/cover_10.jpg",
        image_alt: "Company building",
      },
      {
        image: "../../../../public/assets/images/covers/cover_10.jpg",
        image_alt: "Company building",
      },
      {
        image: "../../../../public/assets/images/covers/cover_10.jpg",
        image_alt: "Company building",
      },
    ],
  },
  about: {
    subhead:
      "All the credits goes to each person working in the backend day and night for us.",
    text: "Maxnova group of companies is committed to delivering happiness in the form of ’good health’ in everyone’s home.",
    image: "../../../../public/assets/images/covers/cover_11.jpg",
    image_alt: "Our mission",
  },
  certificates: [
    {
      text: "ISO Certified",
      image: "../../../../public/assets/images/covers/cover_12.jpg",
      image_alt: "ISO Certification",
    },
    {
      text: "Best Business Award",
      image: "../../../../public/assets/images/covers/cover_13.jpg",
      image_alt: "Best Business Award",
    },
  ],
};

const pvtlabel = {
  hero: {
    head: "Custom Formulation Services",
    image: "../../../../public/assets/images/covers/cover_14.jpg",
    image_alt: "Lab equipment for custom formulation",
  },
  description:
    "Our custom formulation services are tailored to meet your specific needs, ensuring high-quality and innovative products.",
  steps: [
    {
      head: "Step 1: Consultation",
      description:
        "We begin with a thorough consultation to understand your requirements and product goals.",
    },
    {
      head: "Step 2: Research & Development",
      description:
        "Our team conducts extensive research and development to create a formulation that meets your specifications.",
    },
    {
      head: "Step 3: Testing & Validation",
      description:
        "The formulation undergoes rigorous testing and validation to ensure it meets quality standards.",
    },
    {
      head: "Step 4: Production",
      description:
        "Once validated, the formulation is scaled up for production, ensuring consistency and quality.",
    },
    {
      head: "Step 5: Packaging & Delivery",
      description:
        "We offer custom packaging options and ensure timely delivery of the final product.",
    },
  ],
};

const customform = {
  hero: {
    head: "Custom Formulation Services",
    image: "../../../../public/assets/images/covers/cover_15.jpg",
    image_alt: "Lab equipment for custom formulation",
  },
  description:
    "Our custom formulation services are tailored to meet your specific needs, ensuring high-quality and innovative products.",
  steps: [
    {
      head: "Step 1: Consultation",
      description:
        "We begin with a thorough consultation to understand your requirements and product goals.",
    },
    {
      head: "Step 2: Research & Development",
      description:
        "Our team conducts extensive research and development to create a formulation that meets your specifications.",
    },
    {
      head: "Step 3: Testing & Validation",
      description:
        "The formulation undergoes rigorous testing and validation to ensure it meets quality standards.",
    },
    {
      head: "Step 4: Production",
      description:
        "Once validated, the formulation is scaled up for production, ensuring consistency and quality.",
    },
    {
      head: "Step 5: Packaging & Delivery",
      description:
        "We offer custom packaging options and ensure timely delivery of the final product.",
    },
  ],
};
