import styled from '@emotion/styled';

export const CardContainer = styled.div<{ isExpanded: boolean; colIndex: number }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--imspdr-background-2);
  border-radius: 12px;
  border: 1px solid var(--imspdr-background-3);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ isExpanded }) => isExpanded ? '0 20px 40px rgba(0, 0, 0, 0.6)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: ${({ isExpanded }) => isExpanded ? 10 : 1};

  ${({ isExpanded, colIndex }) => isExpanded && `
    /* We handle width and positioning in the parent CardWrapper for better layout control */
  `}
`;

export const MediaSection = styled.div<{ isExpanded: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--imspdr-background-2);
  overflow: hidden;
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
    type === 'movie' ? 'var(--imspdr-danger-1)' : 'var(--imspdr-info-1)'};
  z-index: 12;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;
