import React from "react";

import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

import UpdatePvt from "./editpvt";
import UpdatePcd from "./editpcd";
import UpdateHome from "./edithome";
import UpdateCustom from "./editcustom";
import UpdateAbout from "./editabout";
import UpdateCertificates from "./editCertificates"

export default function EditContent() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Edit Content
      </Typography>

      <Box
        sx={{
          p: 5,
          background: "white",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", pb: 3 }}>
          Home Utils
        </Typography>
        <UpdateHome />
      </Box>

      <Box
        sx={{
          p: 5,
          background: "white",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", pb: 3 }}>
          PCD Utils
        </Typography>
        <UpdatePcd />
      </Box>

      <Box
        sx={{
          p: 5,
          background: "white",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", pb: 3 }}>
          PVT Utils
        </Typography>
        <UpdatePvt />
      </Box>

      <Box
        sx={{
          p: 5,
          background: "white",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", pb: 3 }}>
          Custom Formulation Utils
        </Typography>
        <UpdateCustom />
      </Box>

      <Box
        sx={{
          p: 5,
          background: "white",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", pb: 3 }}>
          About Utils
        </Typography>
        <UpdateAbout />
      </Box>

      <Box
        sx={{
          p: 5,
          background: "white",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", pb: 3 }}>
          Certificates Utils
        </Typography>
        <UpdateCertificates />
      </Box>
    </div>
  );
}

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
