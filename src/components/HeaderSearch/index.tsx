import { FC, ChangeEvent } from "react";
import { SearchInput } from "@imspdr/ui";
import { SearchWrapper } from "./styled";

interface HeaderSearchProps {
  placeholder?: string;
  onChange: (value: string) => void;
}

const HeaderSearch: FC<HeaderSearchProps> = ({ placeholder = "검색", onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <SearchWrapper>
      <SearchInput
        placeholder={placeholder}
        onChange={handleChange as any}
      />
    </SearchWrapper>
  );
};

export default HeaderSearch;
