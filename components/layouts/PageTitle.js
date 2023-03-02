import styled from "styled-components";
import Typography from "../design-configs/Typography";
import Spacing from "../design-configs/Spacing";
import Colours from "../design-configs/Colours";
import {
  GridConfig,
  GridContainer,
  GridRow,
  GridItem,
} from "../design-configs/Grid";

const StyledPageTitle = styled.h2`
  ${Typography.heading.h20};
  color: ${Colours.white};
  margin-bottom: ${Spacing.spacing16};

  @media screen and (min-width: ${GridConfig.tablet.minWidth}) {
    ${Typography.heading.h24};
  }
`;

const PageTitle = (props) => {
  return (
    <GridContainer>
      <GridRow>
        <GridItem>
          <StyledPageTitle>{props.heading}</StyledPageTitle>
        </GridItem>
      </GridRow>
    </GridContainer>
  );
};

export default PageTitle;
