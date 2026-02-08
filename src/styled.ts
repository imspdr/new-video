import styled from "@emotion/styled";

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const MainContent = styled.main`
  flex: 1;
  height: calc(100vh - 60px);
  overflow-y: auto;
  margin-top: 60px;
  background-color: var(--imspdr-background-bg2);
  box-sizing: border-box;
`;
