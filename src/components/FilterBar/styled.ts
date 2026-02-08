import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start
  align-items: center;
  gap: 10px;
  height: 36px;
`;

export const Button = styled.button<{ active: boolean }>`
  width: 60px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid
    ${({ active }) => (active ? "var(--imspdr-mint-mint1)" : "var(--imspdr-border-border1)")};
  background-color: ${({ active }) => (active ? "var(--imspdr-mint-mint1)" : "transparent")};
  color: ${({ active }) =>
    active ? "var(--imspdr-background-bg1)" : "var(--imspdr-foreground-fg1)"};
  &:hover {
    background-color: ${({ active }) =>
      active ? "var(--imspdr-mint-mint1)" : "var(--imspdr-surface-surface1)"};
    opacity: ${({ active }) => (active ? 0.9 : 1)};
  }
`;
