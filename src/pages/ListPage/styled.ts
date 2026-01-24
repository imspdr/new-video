
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 3rem;
  min-height: 100vh;
  background-color: var(--imspdr-background-bg1);
  color: var(--imspdr-foreground-fg1);
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--imspdr-border-border1);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background: var(--imspdr-background-bg2);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  height: 100%;
  border: 1px solid var(--imspdr-border-border1);

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
