import styled from "styled-components";
import GridConfig from "./GridConfig";

const StyledGridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: ${GridConfig.mobile.gap};
  row-gap: ${GridConfig.mobile.gap};
  width: 100%;
  margin: 0 0 16px;
  &:last-child {
    margin: 0;
  }

  @media screen and (min-width: ${GridConfig.tablet.minWidth}) {
    column-gap: ${GridConfig.tablet.gap};
    row-gap: ${GridConfig.tablet.gap};
  }

  @media screen and (min-width: ${GridConfig.desktop.minWidth}) {
    column-gap: ${GridConfig.desktop.gap};
    row-gap: ${GridConfig.desktop.gap};
  }
`;

const GridRow = (props) => {
  return <StyledGridRow className="gridRow">{props.children}</StyledGridRow>;
};

export default GridRow;
