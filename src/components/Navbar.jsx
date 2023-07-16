import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../utils/constants";
import { SearchBar } from "./";

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      position: "sticky",
      background: "#000",
      top: 0,
      justifyContent: "space-between",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      zIndex: 100,
    }}
  >
    <Link
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <img src={logo} alt="logo" height={45} />
    </Link>
    <Typography
      variant="h6"
      sx={{
        color: "#fff",
        fontWeight: "bold",
        letterSpacing: "1px",
      }}
    >
      <span style={{ color: "#FF0000", borderBottom: "2px solid #FF0000", paddingBottom: "2px" }}>Next</span>Tube
    </Typography>
    <SearchBar />
  </Stack>
);

export default Navbar;