import React from 'react';
import { Typography, Button } from '@imspdr/ui';
import YouTube from 'react-youtube';
import { useLatestBanner } from './useLatestBanner';
import * as S from './styled';

const LatestBanner: React.FC = () => {
  const { latestItem, isLoading } = useLatestBanner();

  if (isLoading) {
    return (
      <S.BannerContainer>
        <S.ContentSection>
          <Typography variant="body" level={1}>로딩 중...</Typography>
        </S.ContentSection>
      </S.BannerContainer>
    );
  }

  if (!latestItem) return null;

  const getVideoId = (url: string | null) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|user\/\S+|live\/))([^?&"'>]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(latestItem.youtube_url);

  return (
    <S.BannerContainer id="latest-promo-banner">
      <S.FloatingTitle>
        <Typography variant="caption" color="primary.1" bold>
          {latestItem.type === 'movie' ? 'NEW MOVIE' : 'NEW SERIES'}
        </Typography>
        <Typography variant="title" level={1} as="h2" color="white">
          {latestItem.displayTitle}
        </Typography>
      </S.FloatingTitle>

      <S.PosterSection bg={latestItem.poster_url} />

      {videoId && (
        <S.VideoWrapper>
          <YouTube
            videoId={videoId}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 1,
                mute: 1,
                controls: 0,
                modestbranding: 1,
                rel: 0,
                loop: 1,
                playlist: videoId,
              },
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </S.VideoWrapper>
      )}
    </S.BannerContainer>
  );
};

export default LatestBanner;
