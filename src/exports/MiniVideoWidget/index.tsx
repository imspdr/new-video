import React from 'react';
import { Typography } from '@imspdr/ui';
import { useLatestBanner } from '../LatestBanner/useLatestBanner';
import { WidgetContainer, InfoWrapper, PosterOverlay } from './styled';

const MiniVideoWidget = () => {
  const { latestItem, isLoading } = useLatestBanner();

  const handleClick = () => {
    window.location.href = 'https://imspdr.github.io/new-video';
  };

  const posterPath = (latestItem as any)?.poster_url || null;

  if (isLoading || !latestItem) {
    return (
      <WidgetContainer onClick={handleClick}>
        <Typography variant="caption" color="foreground.3" level={6}>
          VIDEO
        </Typography>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer onClick={handleClick} bg={posterPath}>
      <PosterOverlay />
      <InfoWrapper>
        <Typography
          variant="body"
          level={3}
          bold
          color="foreground.1"
        >
          NEW-VIDEO
        </Typography>
      </InfoWrapper>
    </WidgetContainer>
  );
};

export default MiniVideoWidget;
