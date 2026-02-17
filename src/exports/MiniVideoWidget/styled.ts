import styled from '@emotion/styled';

export const WidgetContainer = styled.div<{ bg?: string | null }>`
  background: ${({ bg }) => (bg ? `url(${bg})` : 'var(--imspdr-background-1)')};
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
  transition: transform 0.1s ease;
  user-select: none;
  overflow: hidden;
  box-sizing: border-box;
  aspect-ratio: 1;
  position: relative;
  border: 1px solid var(--imspdr-background-3);
  
  &:active {
    transform: scale(0.95);
  }
`;

export const PosterOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;
  width: 100%;
  z-index: 2;
  margin-top: auto;
`;
