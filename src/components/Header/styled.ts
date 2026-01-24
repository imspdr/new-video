import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: var(--imspdr-background-bg1);
  border-bottom: 1px solid var(--imspdr-background-bg3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
  box-sizing: border-box;
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
`;

export const TitleButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--imspdr-foreground-fg1);
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  white-space: nowrap;

  &:hover {
    opacity: 0.8;
  }
`;

export const SearchWrapper = styled.div`
  flex: 1;
  max-width: 400px;

  /* Styling for the nested AutoComplete/SearchInput */
  & > div {
    background: var(--imspdr-background-bg2);
    border: 1px solid var(--imspdr-background-bg3);
    border-radius: 8px;

    input {
      background: transparent;
      &::placeholder {
        color: var(--imspdr-foreground-fg3);
      }
    }
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 16px;
`;
