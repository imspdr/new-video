import { useState, useCallback } from "react";
import { YouTubeProps } from "react-youtube";

interface UseVideoCardProps {
  youtubeUrl: string | null;
}

const extractYouTubeId = (url: string | null) => {
  if (!url) return null;
  const match = url.match(/(?:\?v=|&v=|youtu\.be\/|embed\/|\/v\/|shorts\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

export const useVideoCard = ({ youtubeUrl }: UseVideoCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const videoId = extractYouTubeId(youtubeUrl);

  const toggleExpansion = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoId) {
      setIsExpanded(prev => !prev);
    }
  }, [videoId]);

  const handleOpenLink = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (youtubeUrl) {
      window.open(youtubeUrl, "_blank");
    }
  }, [youtubeUrl]);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    if (isExpanded) {
      event.target.playVideo();
      event.target.mute();
    }
  };

  return {
    isExpanded,
    videoId,
    toggleExpansion,
    handleOpenLink,
    onPlayerReady,
  };
};
