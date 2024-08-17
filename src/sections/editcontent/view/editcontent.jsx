import PropTypes from "prop-types";
import React, { useState, useCallback } from "react";

import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import EditModal from "./editmodal";

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export default function EditContent() {
  const [homeData, setHomeData] = useState(home)
  const [aboutData, setAboutData] = useState(about)
  const [pcdData, setPcdData] = useState(pcdfran)
  const [pvtData, setPvtData] = useState(pvtlabel)
  const [customData, setCustomData] = useState(customform)

  const [pages, setPages] = useState([
    { name: "home", data: homeData },
    { name: "about", data: aboutData },
    { name: "PCD Franchise", data: pcdData },
    { name: "Private Label", data: pvtData },
    { name: "Custom Formulation", data: customData },
  ]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = (updatedData) => {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.name === selectedPage.name ? { ...page, data: updatedData } : page
      )
    );
    setModalOpen(false);
  };

  const handleEditClick = (page) => {
    setSelectedPage(page);
    setModalOpen(true);
  };

  const onChange = (e) => {
    const { value } = e.target
    setHomeData((prev) => ({
      ...prev,
      [e.target.name]: value
    }))
  }

  console.log(homeData)

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
        {pages.map((page) => (
          <PageTable
            key={page.name}
            page={page}
            onEditClick={handleEditClick}
          />
        ))}
      </List>

      {selectedPage && (
        <EditModal
          content={selectedPage.data}
          onSave={handleSave}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          handleChange={onChange}
        />
      )}
    </div>
  );
}

function PageTable({ page, onEditClick }) {
  const [open, setOpen] = useState(true);
  const handleClick = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ background: "#fff" }}>
        <ListItemText primary={`${capitalizeFirstLetter(page.name)} Page`} />
        <IconButton
          onClick={() => onEditClick(page)}
          sx={{ mx: 2, fontSize: "medium", gap: 1 }}
        >
          <EditIcon sx={{ fontSize: "medium" }} />
          Edit
        </IconButton>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit sx={{ px: 2 }}>
        <List component="div" disablePadding sx={{ px: 2 }}>
          {Object.keys(page.data).map((sectionKey) => (
            <SectionItem
              key={sectionKey}
              sectionName={sectionKey}
              sectionData={page.data[sectionKey]}
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
    if (typeof data === "string") {
      if (data.match(/\.(jpg|jpeg|png)$/i)) {
        return <ImageItem src={data} alt={sectionName} />;
      }
      return data;
    }

    if (Array.isArray(data) || (typeof data === "object" && data !== null)) {
      return (
        <>
          <ListItemButton onClick={handleClick} sx={{ background: "#f0f0f0" }}>
            <ListItemText
              primary={<strong>{capitalizeFirstLetter(sectionName)}:</strong>}
            />
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ px: 2 }}>
              {Array.isArray(data)
                ? data.map((item, index) => (
                  <SectionItem
                    key={index}
                    sectionName={`${sectionName} [${index}]`}
                    sectionData={item}
                  />
                ))
                : Object.keys(data).map((key) => (
                  <SectionItem
                    key={key}
                    sectionName={key}
                    sectionData={data[key]}
                  />
                ))}
            </List>
          </Collapse>
        </>
      );
    }

    return null;
  };

  return (
    <ListItemText>
      <strong>{capitalizeFirstLetter(sectionName)}:</strong>{" "}
      {renderSectionContent(sectionData)}
    </ListItemText>
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
  page: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
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
  head_hero: "Welcome to Our Platform",
  spline_hero: "Your success is our priority.",
  subhead_about: "About Us",
  text_about:
    "We are dedicated to delivering high-quality services to our clients.",
  image_about: "../../../../public/assets/images/covers/cover_2.jpg",
  image_alt_about: "Team working together",
  head_whyus: "Why Choose Us",
  text1_whyus: "We provide exceptional services tailored to your needs.",
  whylist_whyus: "Expert team, 24/7 support, Proven results",
  text2_whyus: "Our commitment to excellence sets us apart.",
  text_1_whyus: "High-quality service",
  image_1_whyus: "../../../../public/assets/images/covers/cover_2.jpg",
  image_alt_1_whyus: "Quality service illustration",
  text_2_whyus: "Reliable and efficient solutions",
  image_2_whyus: "../../../../public/assets/images/covers/cover_2.jpg",
  image_alt_2_whyus: "Efficient solutions illustration",
};

const about = {
  subhead_hero: "Welcome to Our Service",
  image: [
    "../../../../public/assets/images/covers/cover_2.jpg",
    "../../../../public/assets/images/covers/cover_2.jpg",
  ],
  subhead_about: "About Us",
  text_about:
    "We are committed to providing the best service to our customers.",
  image_about: "../../../../public/assets/images/covers/cover_2.jpg",
  image_alt_about: "Our Team at Work",
  certificates: [
    {
      text: "Certified Excellence",
      image: "../../../../public/assets/images/covers/cover_2.jpg",
      image_alt: "Certificate of Excellence",
    },
    {
      text: "Industry Standard",
      image: "../../../../public/assets/images/covers/cover_2.jpg",
      image_alt: "Standard Certification",
    },
  ],
};

const pvtlabel = {
  head_pvt: "Private Solutions Tailored for You",
  image_pvt: "../../../../public/assets/images/covers/cover_2.jpg",
  image_alt_pvt: "Private solution illustration",
  text_pvt:
    "We specialize in creating private solutions that meet your specific requirements.",
  steps: [
    {
      head: "Step 1: Initial Consultation",
      text: "We begin by discussing your unique needs in detail.",
    },
    {
      head: "Step 2: Customized Planning",
      text: "Our experts develop a tailored plan to address your needs.",
    },
    {
      head: "Step 3: Execution and Support",
      text: "We implement the solution with ongoing support to ensure success.",
    },
  ],
};

const customform = {
  head_custom: "Custom Solutions for You",
  image_custom: "../../../../public/assets/images/covers/cover_2.jpg",
  image_alt_custom: "Custom solution illustration",
  text_custom: "We offer tailored solutions to meet your unique needs.",
  steps: [
    {
      head: "Step 1: Understanding Your Requirements",
      text: "We begin by thoroughly understanding your specific needs and challenges.",
    },
    {
      head: "Step 2: Developing a Strategy",
      text: "Our team creates a customized strategy that aligns with your goals.",
    },
    {
      head: "Step 3: Implementation",
      text: "We implement the strategy with precision and focus on delivering results.",
    },
  ],
};

const pcdfran = {
  head_pcd: "PCD Solutions Tailored for You",
  image_pcd: "../../../../public/assets/images/covers/cover_2.jpg",
  image_alt_pcd: "PCD solution illustration",
};
