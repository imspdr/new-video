import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start
  align-items: center;
  gap: 10px;
`;

export const Button = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid
    ${({ active }) => (active ? "var(--imspdr-mint-mint1)" : "var(--imspdr-border-border1)")};
  background-color: ${({ active }) => (active ? "var(--imspdr-mint-mint1)" : "transparent")};
  color: ${({ active }) =>
    active ? "var(--imspdr-background-bg1)" : "var(--imspdr-foreground-fg1)"};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: inherit;

  &:hover {
    background-color: ${({ active }) =>
      active ? "var(--imspdr-mint-mint1)" : "var(--imspdr-surface-surface1)"};
    opacity: ${({ active }) => (active ? 0.9 : 1)};
  }

  @media (max-width: 767px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
    flex-shrink: 0;
  }
`;
