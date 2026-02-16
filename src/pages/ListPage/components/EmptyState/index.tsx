
import { FC } from "react";
import { Typography } from "@imspdr/ui";
import { EmptyContainer } from "./styled";

interface EmptyStateProps {
  message?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
  message = "표시할 컨텐츠가 없습니다.",
}) => {
  return (
    <EmptyContainer>
      <Typography variant="body" level={2} color="foreground.3">
        {message}
      </Typography>
    </EmptyContainer>
  );
};

export default EmptyState;
