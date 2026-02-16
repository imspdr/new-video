import styled from '@emotion/styled';

export const BannerContainer = styled.div`
  width: fit-content;
  height: 240px;
  margin: 0 auto;
  display: flex;
  background: #000;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 767px) {
    flex-direction: column;
    height: auto;
  }
`;

export const FloatingTitle = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 10;
  pointer-events: none;
  
  h2 {
    font-weight: 900;
    font-size: 28px;
    letter-spacing: -0.04em;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
    margin-top: 4px;
  }
`;

export const PosterSection = styled.div<{ bg: string | null }>`
  flex: 0 0 160px;
  background-image: ${({ bg }) => (bg ? `url(${bg})` : 'none')};
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 60px;
    background: linear-gradient(to right, #000, transparent 100%);
    transform: rotate(180deg);
    z-index: 1;
  }

  @media (max-width: 767px) {
    flex: 0 0 300px;
    width: 100%;
    
    &::after {
      width: 100%;
      height: 60px;
      top: auto;
      bottom: 0;
      background: linear-gradient(to bottom, #000, transparent 100%);
      transform: rotate(180deg);
    }
  }
`;

export const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  justify-content: flex-end;
  position: relative;
  z-index: 2;
  background: linear-gradient(to right, #000 0%, transparent 100%);

  @media (max-width: 767px) {
    padding: 20px;
    background: linear-gradient(to top, #000 0%, transparent 100%);
  }
`;

export const VideoWrapper = styled.div`
  flex: 0 0 450px;
  background: #000;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #000 0%, transparent 15%);
    pointer-events: none;
  }

  @media (max-width: 1200px) {
    flex: 0 0 400px;
  }

  @media (max-width: 1000px) {
    flex: 0 0 350px;
  }

  @media (max-width: 767px) {
    flex: 0 0 200px;
    width: 100%;
  }
`;
