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
import { useVideoCard } from "./useVideoCard";

interface VideoCardProps {
  id: number;
  title: string;
  date: string;
  posterUrl: string | null;
  youtubeUrl: string | null;
  type: "movie" | "tv_series";
  colIndex?: number;
  totalCols?: number;
}

const VideoCard: FC<VideoCardProps> = ({
  id,
  title,
  date,
  posterUrl,
  youtubeUrl,
  type,
  colIndex = 0,
  totalCols = 1
}) => {
  const {
    isExpanded,
    videoId,
    startHover,
    endHover,
    handleOpenLink,
    onPlayerReady,
  } = useVideoCard({ youtubeUrl });

  return (
    <CardContainer
      isExpanded={isExpanded}
      colIndex={colIndex}
      totalCols={totalCols}
      onMouseEnter={startHover}
      onMouseLeave={endHover}
      onClick={handleOpenLink}
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
                  showinfo: 0, // Legacy hint
                  autohide: 1, // Legacy hint
                  origin: window.location.origin,
                  vq: 'large', // Suggest 480p
                },
              }}
              onReady={(event: YouTubeEvent) => {
                onPlayerReady(event);
                // Attempt to set quality directly through the API
                try {
                  event.target.setPlaybackQuality('large');
                } catch (e) {
                  // Quality settings may be restricted by the player
                }
              }}
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

export default VideoCard;
