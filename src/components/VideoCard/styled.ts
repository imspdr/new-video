
import styled from '@emotion/styled';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--imspdr-background-bg2);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  height: 100%;
  border: 1px solid var(--imspdr-border-border1);
  position: relative;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
  }
`;

export const PosterImage = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  background-color: var(--imspdr-surface-surface1);
`;

export const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
`;

export const DateText = styled.span`
  font-size: 0.8rem;
  color: var(--imspdr-foreground-fg2);
`;

export const TypeTag = styled.div<{ type: 'movie' | 'tv_series' }>`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  color: #fff;
  background-color: ${({ type }) =>
    type === 'movie' ? 'var(--imspdr-primary-primary1, #e50914)' : 'var(--imspdr-secondary-secondary1, #5646ff)'};
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

export const RatingTag = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  gap: 2px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
