import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--imspdr-border-border1);
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: flex-start;
    gap: 0.5rem;
    padding-bottom: 0.8rem;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;

    /* Hide scrollbar for cleaner look */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Group = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.4rem;
  }
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

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
    flex-shrink: 0;
  }
`;

export const Separator = styled.div`
  width: 1px;
  height: 20px;
  background-color: var(--imspdr-border-border1);
  margin: 0 0.5rem;

  @media (max-width: 768px) {
    margin: 0 0.2rem;
  }
`;
