import { ThemeToggleButton, Typography } from '@imspdr/ui';
import { HeaderContainer, RightSection, TitleSection } from './styled';

const Header = () => {
  return (
    <HeaderContainer>
      <TitleSection>
        <Typography variant="title" level={2}>
          NEW VIDEO
        </Typography>
      </TitleSection>
      <RightSection>
        <ThemeToggleButton />
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
