
import { FC } from "react";
import { Typography } from "@imspdr/ui";
import { EmptyContainer } from "./styled";

interface EmptyStateProps {
  message?: string;
  type?: "empty" | "loading" | "error";
}

const EmptyState: FC<EmptyStateProps> = ({
  message = "표시할 컨텐츠가 없습니다.",
  type = "empty"
}) => {
  const getSubMessage = () => {
    switch (type) {
      case "loading": return "잠시만 기다려주세요.";
      case "error": return "잠시 후 다시 시도해주세요.";
      default: return "다른 검색어로 시도해보거나 필터를 변경해보세요.";
    }
  };

  return (
    <EmptyContainer>
      <Typography variant="title" level={3} color="foreground.2">
        {message}
      </Typography>
      <Typography variant="body" level={2} color="foreground.3">
        {getSubMessage()}
      </Typography>
    </EmptyContainer>
  );
};

export default EmptyState;
