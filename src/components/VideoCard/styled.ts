
import styled from '@emotion/styled';

export const CardContainer = styled.div<{ isExpanded: boolean; colIndex: number; totalCols: number }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--imspdr-background-bg2);
  border-radius: 12px;
  border: 1px solid var(--imspdr-border-border1);
  cursor: pointer;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
              left 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1;
  left: 0;

  ${({ isExpanded, colIndex, totalCols }) => isExpanded && `
    @media (min-width: 768px) {
      z-index: 1000;
      width: 266.66%;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      
      /* Stable positioning during width expansion */
      ${colIndex === 0 ? `
        left: 0;
      ` : colIndex === totalCols - 1 ? `
        left: -166.66%;
      ` : `
        left: -83.33%;
      `}
    }
  `}
`;

export const MediaSection = styled.div<{ isExpanded: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--imspdr-surface-surface1);
  overflow: hidden;
  /* Aspect ratio will naturally adjust as width increases and height is fixed by Grid */
`;

export const PosterImage = styled.img<{ isVisible: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export const VideoWrapper = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: #000;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease;
  pointer-events: none;

  .youtube-container {
    width: 100%;
    height: 100%;
  }

  .youtube-iframe {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    /* Increased zoom and centered crop to hide 'Share', 'Watch Later' and top bar */
    transform: scale(1.7); 
    transform-origin: center;
  }
`;

export const InfoSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 3rem 1rem 1rem 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 60%, transparent 100%);
  color: #fff;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  pointer-events: none;
`;

export const TitleText = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.3;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
  word-break: keep-all;
  overflow-wrap: break-word;
  display: block;
  width: 100%;
`;

export const DateText = styled.span`
  font-size: 0.75rem;
  opacity: 0.8;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
`;

export const TypeTag = styled.div<{ type: 'movie' | 'tv_series' }>`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.6rem;
  font-weight: bold;
  color: #fff;
  background-color: ${({ type }) =>
    type === 'movie' ? 'var(--imspdr-primary-primary1, #e50914)' : 'var(--imspdr-secondary-secondary1, #5646ff)'};
  z-index: 12;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;
