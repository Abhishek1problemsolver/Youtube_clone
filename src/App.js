import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed } from "./components";

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: "#000" }}>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
      </Routes>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          py: 2,
          px: 2,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        &copy; {new Date().getFullYear()} <span style={{ color: "red" }}>NextTube</span>. All rights reserved.
      </Typography>
    </Box>
  </BrowserRouter>
);

export default App;
