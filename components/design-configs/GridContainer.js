import styled from "styled-components";
import GridConfig from "./GridConfig";

const StyledGridContainer = styled.div`
  display: grid;
  padding: 0 ${GridConfig.mobile.margin};
  max-width: 1280px;

  @media screen and (min-width: ${GridConfig.tablet.minWidth}) {
    padding: 0 ${GridConfig.tablet.margin};
  }

  @media screen and (min-width: ${GridConfig.desktop.minWidth}) {
    padding: 0 ${GridConfig.desktop.margin};
  }
`;
const GridContainer = (props) => {
  return (
    <StyledGridContainer clasName="gridContainer">
      {props.children}
    </StyledGridContainer>
  );
};

export default GridContainer;
