import styled from '@emotion/styled';

export const PageContainer = styled.div`
  margin: 0 auto;
  padding: 24px;
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: flex-start;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 767px) {
    flex-direction: column;
    overflow-y: auto;
    padding: 8px;
    gap: 16px;
  }
`;

export const LoadingContainer = styled.div`
  padding: 80px;
  text-align: center;
`;

export const FlexColumn = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    height: auto;
    width: 100%;
  }
`;
