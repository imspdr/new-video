import { FC } from "react";
import YouTube from "react-youtube";
import {
  CardContainer,
  MediaSection,
  PosterImage,
  VideoWrapper,
  InfoSection,
  DateText,
  TypeTag,
  TitleText,
  ActionButton,
} from "./styled";
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
  totalCols = 1,
}) => {
  const { isExpanded, videoId, toggleExpansion, handleOpenLink, onPlayerReady } = useVideoCard({
    youtubeUrl,
  });

  return (
    <CardContainer
      isExpanded={isExpanded}
      colIndex={colIndex}
      totalCols={totalCols}
      onClick={toggleExpansion}
    >
      <TypeTag type={type}>{type === "movie" ? "영화" : "시리즈"}</TypeTag>

      <MediaSection>
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
                },
              }}
              onReady={onPlayerReady}
            />
          </VideoWrapper>
        )}

        <InfoSection>
          <TitleText>{title}</TitleText>
          <DateText>{date}</DateText>
        </InfoSection>
      </MediaSection>
    </CardContainer>
  );
};

export default VideoCard;
