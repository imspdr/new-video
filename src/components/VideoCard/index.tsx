
import { FC } from 'react';
import { Typography } from '@imspdr/ui';
import { CardContainer, PosterImage, CardContent, DateText, TypeTag, RatingTag } from './styled';

interface VideoCardProps {
  id: number;
  title: string;
  date: string;
  posterUrl: string | null;
  youtubeUrl: string | null;
  type: 'movie' | 'tv_series';
  rating?: number;
}

const VideoCard: FC<VideoCardProps> = ({ id, title, date, posterUrl, youtubeUrl, type, rating }) => {
  const handleCardClick = () => {
    if (youtubeUrl) {
      window.open(youtubeUrl, '_blank');
    }
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <TypeTag type={type}>
        {type === 'movie' ? '영화' : '시리즈'}
      </TypeTag>
      {rating && (
        <RatingTag>
          ★ {rating.toFixed(1)}
        </RatingTag>
      )}
      <PosterImage
        src={posterUrl || 'https://via.placeholder.com/500x750?text=No+Poster'}
        alt={title}
        loading="lazy"
      />
      <CardContent>
        <Typography variant="body" level={1} weight="medium">
          {title}
        </Typography>
        <DateText>{date}</DateText>
      </CardContent>
    </CardContainer>
  );
};

export default VideoCard;
