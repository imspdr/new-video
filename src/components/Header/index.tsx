import { AutoComplete, ThemeToggleButton, Typography } from '@imspdr/ui';
import { HeaderContainer, RightSection, SearchWrapper, TitleButton, TitleSection } from './styled';
import { useDeviceType } from '@imspdr/ui';

interface HeaderProps {
  onHomeClick?: () => void;
}

const Header = ({ onHomeClick }: HeaderProps) => {
  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.location.href = '/';
    }
  };
  return (
    <HeaderContainer>
      <TitleSection>
        <TitleButton onClick={handleHomeClick}>
          <Typography variant="title" level={2}>
            NEW VIDEO
          </Typography>
        </TitleButton>
      </TitleSection>
      <RightSection>
        <ThemeToggleButton />
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
