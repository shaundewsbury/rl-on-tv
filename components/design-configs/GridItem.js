import styled from "styled-components";
import GridConfig from "./GridConfig";

const breakpoints = Object.keys(GridConfig);

const spanCols = (props) =>
  breakpoints
    .filter(
      (breakpoint) =>
        (props[breakpoint] || breakpoint === "mobile") && props[breakpoint] > 0
    )
    .map((breakpoint) =>
      breakpoint === "mobile"
        ? `
					grid-column: auto / span ${props[breakpoint] ?? 12};
					display: grid;
				`
        : `@media screen and (min-width: ${GridConfig[breakpoint].minWidth}) {
					grid-column: auto / span ${props[breakpoint]};
					display: grid;
				}`
    )
    .join("");

const colStart = (props) =>
  breakpoints
    .filter((breakpoint) => props[`colStart-${breakpoint}`])
    .map((breakpoint) => {
      const colStartValue = props[`colStart-${breakpoint}`];
      return breakpoint === "xxs"
        ? `grid-column-start: ${colStartValue};`
        : `@media screen and (min-width: ${GridConfig[breakpoint].minWidth}) {
					grid-column-start: ${colStartValue};
				}`;
    })
    .join("");

const StyledGridItem = styled.div`
  grid-column: auto / span 12;
  ${(props) => spanCols(props)};
  ${(props) => colStart(props)};
`;

const GridItem = (props) => {
  return (
    <StyledGridItem className="gridItem" {...props}>
      {props.children}
    </StyledGridItem>
  );
};

export default GridItem;
