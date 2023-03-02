import styled from "styled-components";
import Typography from "../design-configs/Typography";
import Colours from "../design-configs/Colours";
import GridConfig from "../design-configs/GridConfig";
import Spacing from "../design-configs/Spacing";

const StyledHeader = styled.header`
  padding-top: ${Spacing.spacing16};
  margin-bottom: ${Spacing.spacing32};

  h1 {
    ${Typography.heading.h24};
    color: ${Colours.base.white};
    text-align: center;
    margin-bottom: ${Spacing.spacing16};

    @media screen and (min-width: ${GridConfig.tablet.minWidth}) {
      ${Typography.heading.h32};
      margin-bottom: ${Spacing.spacing32};
    }

    @media screen and (min-width: ${GridConfig.desktop.minWidth}) {
      ${Typography.heading.h40};
    }
  }
`;

import Navigation from "../Navigation";

const Header = (props) => {
  return (
    <StyledHeader>
      <h1>Rugby League on TV</h1>
      <Navigation />
    </StyledHeader>
  );
};
export default Header;
