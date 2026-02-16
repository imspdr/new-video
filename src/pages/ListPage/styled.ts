
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  width: 100%;
  box-sizing: border-box;
  gap: 10px;
  color: var(--imspdr-foreground-1);
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const GridContainer = styled.div<{ height: number }>`
  position: relative;
  width: 100%;
  height: ${({ height }) => height}px;
  transition: height 0.3s ease;
`;

export const CardWrapper = styled.div<{
  top: number;
  left: number;
  width: number;
  height: number;
  isExpanded?: boolean;
}>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left, isExpanded }) => isExpanded ? 0 : left}px;
  width: ${({ width, isExpanded }) => isExpanded ? '100%' : width}px;
  height: ${({ height }) => height}px;
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: ${({ isExpanded }) => (isExpanded ? 1000 : 1)};
  
  &:hover {
    z-index: 1000;
  }

  /* On mobile expansion, we want to ensure it covers the whole row */
  @media (max-width: 767px) {
    ${({ isExpanded }) => isExpanded && `
      left: 0;
      width: 100%;
    `}
  }
`;
