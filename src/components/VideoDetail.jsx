import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Divider, Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [comments, setComments] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );

    fetchFromAPI(`commentThreads?part=snippet&videoId=${id}`).then((data) =>
      setComments(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box
            sx={{
              width: "100%",
              position: "sticky",
              top: "86px",
              backgroundColor: "#000",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography
              color="#fff"
              variant="h5"
              fontWeight="bold"
              p={2}
              wordBreak="break-word"
            >
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff", py: 1, px: 2 }}
              alignItems="center"
            >
              <Link
                to={`/channel/${channelId}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Stack direction="row" alignItems="center">
                  <VisibilityIcon sx={{ color: "#fff", marginRight: "5px" }} />
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(viewCount).toLocaleString()}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <ThumbUpIcon sx={{ color: "#fff", marginRight: "5px" }} />
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(likeCount).toLocaleString()}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <CommentIcon sx={{ color: "#fff", marginRight: "5px" }} />
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {comments ? comments.length : 0}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Divider sx={{ backgroundColor: "#fff", mt: 2, mb: 2 }} />
            <Stack sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Comments
              </Typography>
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <Box
                    key={comment.id}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginTop: "20px",
                    }}
                  >
                    <Avatar
                      src={
                        comment.snippet.topLevelComment.snippet
                          .authorProfileImageUrl
                      }
                      alt={
                        comment.snippet.topLevelComment.snippet
                          .authorDisplayName
                      }
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box sx={{ marginLeft: "10px" }}>
                      <Typography variant="body1" sx={{ color: "#fff" }}>
                        {
                          comment.snippet.topLevelComment.snippet
                            .authorDisplayName
                        }
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", marginTop: "5px" }}
                      >
                        {comment.snippet.topLevelComment.snippet.textDisplay}
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body1" sx={{ color: "#fff" }}>
                  No comments found.
                </Typography>
              )}
            </Stack>
          </Box>
        </Box>
        <Box
          px={{ xs: 2, md: 4 }}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
