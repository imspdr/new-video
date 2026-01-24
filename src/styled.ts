import styled from '@emotion/styled';
import { SIDEBAR_WIDTH, TAB_BAR_WIDTH } from './constants/layout';

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

interface MainContentProps {
  isFolded: boolean;
}

export const MainContent = styled.main<MainContentProps>`
  flex: 1;
  height: calc(100vh - 60px);
  overflow-y: auto;
  margin-top: 60px;
  margin-right: ${({ isFolded }) => (isFolded ? `${TAB_BAR_WIDTH}px` : `${SIDEBAR_WIDTH}px`)};
  background-color: var(--imspdr-background-bg2);
  transition: margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;

  @media (max-width: 1080px) {
    margin-right: ${TAB_BAR_WIDTH}px;
  }
`;
