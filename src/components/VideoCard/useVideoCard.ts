import { useState, useCallback, useRef, useEffect } from "react";
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
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const videoId = extractYouTubeId(youtubeUrl);

  const startHover = useCallback(() => {
    if (!videoId) return;

    // Disable hover expansion on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Clear any previous timer
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    // Slight delay to prevent accidental expansion while scrolling
    hoverTimerRef.current = setTimeout(() => {
      setIsExpanded(true);
    }, 400); // 400ms delay for a better user experience
  }, [videoId]);

  const endHover = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setIsExpanded(false);
  }, []);

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

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  return {
    isExpanded,
    videoId,
    startHover,
    endHover,
    handleOpenLink,
    onPlayerReady,
  };
};
