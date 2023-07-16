import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
  demoProfilePicture,
} from '../utils/constants';

const VideoCard = ({ video: { id: { videoId }, snippet }, channelDetail }) => {
  const publishedAt = new Date(snippet?.publishedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const channelIconUrl = channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture;

  return (
    <Card sx={{ width: { xs: '100%', sm: '358px', md: '320px' }, boxShadow: 'none', borderRadius: 0 }}>
      <Link to={videoId ? `/video/${videoId}` : '/video/cV2gBU6hKfY'}>
        <CardMedia
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title} 
          sx={{ width: { xs: '100%', sm: '358px' }, height: 180 }} 
        />
      </Link>
      <CardContent sx={{ backgroundColor: '#1E1E1E', height: '106px' }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl }>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
          <Typography variant="subtitle2" color="gray" sx={{ display: 'flex', alignItems: 'center' }}>
            {channelIconUrl && (
              <img
                src={channelIconUrl}
                alt="Channel Icon"
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  marginRight: '5px',
                  objectFit: 'cover',
                }}
              />
            )}
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleIcon sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
          </Typography>
        </Link>
        <Typography variant="caption" color="gray">
          Published on {publishedAt}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
