import PropTypes from "prop-types";
import React, { useState, useCallback, useEffect } from "react";

import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import EditModal from "./edithome";
import { Button, TextField, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getHomeUtil, updateHomeUtil } from "src/redux/actions/utilsAction";
import UpdateHome from "./edithome";
import UpdatePcd from "./editpcd";
import UpdatePvt from "./editpvt";
import UpdateCustom from "./editcustom";

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export default function EditContent() {
  const [homeData, setHomeData] = useState(null);
  const [aboutData, setAboutData] = useState(about);
  const [pcdData, setPcdData] = useState(pcdfran);
  const [pvtData, setPvtData] = useState(pvtlabel);
  const [customData, setCustomData] = useState(customform);

  const dispatch = useDispatch()
  const home = useSelector(state => state.utils.homeutil)

  useEffect(() => {
    dispatch(getHomeUtil())
  }, [])

  useEffect(() => {
    if (home) {
      setHomeData(home[0])
    }
  }, [home])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHomeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Edit Content
      </Typography>

      <Box
        sx={{
          p: 5,
          background: 'white'
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', pb: 3 }}>
          Home Utils
        </Typography>
        <UpdateHome />
      </Box>

      <Box
        sx={{
          p: 5,
          background: 'white'
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', pb: 3 }}>
          PCD Utils
        </Typography>
        <UpdatePcd />
      </Box>

      <Box
        sx={{
          p: 5,
          background: 'white'
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', pb: 3 }}>
          PVT Utils
        </Typography>
        <UpdatePvt />
      </Box>

      <Box
        sx={{
          p: 5,
          background: 'white'
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', pb: 3 }}>
          Custom Formulation Utils
        </Typography>
        <UpdateCustom />
      </Box>
    </div>
  );
}


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
  text_3_whyus: "High-quality service",
  image_3_whyus: "../../../../public/assets/images/covers/cover_2.jpg",
  image_alt_3_whyus: "Quality service illustration",
  text_4_whyus: "Reliable and efficient solutions",
  image_4_whyus: "../../../../public/assets/images/covers/cover_2.jpg",
  image_alt_4_whyus: "Efficient solutions illustration",
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
      head: "Initial Consultation",
      text: "We begin by discussing your unique needs in detail.",
    },
    {
      head: "Customized Planning",
      text: "Our experts develop a tailored plan to address your needs.",
    },
    {
      head: "Execution and Support",
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
      head: "Understanding Your Requirements",
      text: "We begin by thoroughly understanding your specific needs and challenges.",
    },
    {
      head: "Developing a Strategy",
      text: "Our team creates a customized strategy that aligns with your goals.",
    },
    {
      head: "Implementation",
      text: "We implement the strategy with precision and focus on delivering results.",
    },
  ],
};

const pcdfran = {
  head_pcd: "PCD Solutions Tailored for You",
  image_pcd: "../../../../public/assets/images/covers/cover_2.jpg",
  image_alt_pcd: "PCD solution illustration",
};
