
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 3rem;
  min-height: 100vh;
  background-color: var(--imspdr-background-bg1);
  color: var(--imspdr-foreground-fg1);
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 1400px; /* Limit max width for better calculations */
  margin: 0 auto;
`;

export const GridContainer = styled.div<{ height: number }>`
  position: relative;
  width: 100%;
  height: ${({ height }) => height}px;
  transition: height 0.3s ease;
`;

export const CardWrapper = styled.div<{ top: number; left: number; width: number; height: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  padding: 10px; /* Gap handling via padding */
  box-sizing: border-box;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;
