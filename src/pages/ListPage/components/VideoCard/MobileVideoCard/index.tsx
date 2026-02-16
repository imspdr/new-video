import { FC } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import {
  CardContainer,
  MediaSection,
  PosterImage,
  VideoWrapper,
  InfoSection,
  TypeTag,
} from "./styled";
import { Typography } from "@imspdr/ui";

interface MobileVideoCardProps {
  id: number;
  title: string;
  date: string;
  posterUrl: string | null;
  youtubeUrl: string | null;
  type: "movie" | "tv_series";
  isExpanded: boolean;
  onToggle: () => void;
  colIndex: number;
}

const extractYouTubeId = (url: string | null) => {
  if (!url) return null;
  const match = url.match(/(?:\?v=|&v=|youtu\.be\/|embed\/|\/v\/|shorts\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

const MobileVideoCard: FC<MobileVideoCardProps> = ({
  title,
  date,
  posterUrl,
  youtubeUrl,
  type,
  isExpanded,
  onToggle,
  colIndex,
}) => {
  const videoId = extractYouTubeId(youtubeUrl);

  const onPlayerReady = (event: YouTubeEvent) => {
    if (isExpanded) {
      event.target.playVideo();
      event.target.mute();
    }
  };

  return (
    <CardContainer
      isExpanded={isExpanded}
      onClick={onToggle}
      colIndex={colIndex}
    >
      <TypeTag type={type}>{type === "movie" ? "영화" : "시리즈"}</TypeTag>

      <MediaSection isExpanded={isExpanded}>
        <PosterImage
          isVisible={!isExpanded}
          src={posterUrl || "https://via.placeholder.com/500x750?text=No+Poster"}
          alt={title}
          loading="lazy"
        />

        {isExpanded && videoId && (
          <VideoWrapper isVisible={isExpanded}>
            <YouTube
              videoId={videoId}
              className="youtube-iframe"
              containerClassName="youtube-container"
              opts={{
                height: "100%",
                width: "100%",
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  rel: 0,
                  mute: 1,
                  loop: 1,
                  playlist: videoId,
                  modestbranding: 1,
                  disablekb: 1,
                  iv_load_policy: 3,
                  fs: 0,
                  origin: window.location.origin,
                  vq: 'large',
                },
              }}
              onReady={onPlayerReady}
            />
          </VideoWrapper>
        )}

        <InfoSection>
          <Typography variant="body" level={2} bold color="white">
            {title}
          </Typography>
          <Typography variant="caption" level={1} color="white">
            {date}
          </Typography>
        </InfoSection>
      </MediaSection>
    </CardContainer>
  );
};

export default MobileVideoCard;
