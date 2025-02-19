import React from "react";

import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

import UpdatePvt from "./editpvt";
import UpdatePcd from "./editpcd";
import UpdateHome from "./edithome";
import UpdateAbout from "./editabout";
import UpdateCustom from "./editcustom";
import UpdateCertificates from "./editCertificates";

export default function EditContent() {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Edit Content
      </Typography>

      <Box
        sx={{
          p: 5,
          mt: 15,
          background: "#ffffff",

          borderRadius: "1rem",
        }}
      >
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ fontWeight: "bold", mb: 5 }}
        >
          Home Utils
        </Typography>
        <UpdateHome />
      </Box>

      <Box
        sx={{
          p: 5,
          background: "#ffffff",
          mt: 15,
          borderRadius: "1rem",
        }}
      >
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ fontWeight: "bold", mb: 5 }}
        >
          About Utils
        </Typography>
        <UpdateAbout />
      </Box>

      <Box
        sx={{
          p: 5,
          background: "#ffffff",
          mt: 15,
          borderRadius: "1rem",
        }}
      >
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ fontWeight: "bold", mb: 5 }}
        >
          Certificates Utils
        </Typography>
        <UpdateCertificates />
      </Box>

      <Box
        sx={{
          p: 5,
          background: "#ffffff",
          mt: 15,
          borderRadius: "1rem",
        }}
      >
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ fontWeight: "bold", mb: 5 }}
        >
          PCD Utils
        </Typography>
        <UpdatePcd />
      </Box>

      <Box
        sx={{
          p: 5,
          background: "#ffffff",
          mt: 15,
          borderRadius: "1rem",
        }}
      >
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ fontWeight: "bold", mb: 5 }}
        >
          PVT Utils
        </Typography>
        <UpdatePvt />
      </Box>

      <Box
        sx={{
          p: 5,
          background: "#ffffff",
          mt: 15,
          borderRadius: "1rem",
        }}
      >
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ fontWeight: "bold", mb: 5 }}
        >
          Custom Formulation Utils
        </Typography>
        <UpdateCustom />
      </Box>
    </div>
  );
}
