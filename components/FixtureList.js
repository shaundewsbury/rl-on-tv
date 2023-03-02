import styled from "styled-components";
import {
  GridContainer,
  GridRow,
  GridItem,
} from "../components/design-configs/Grid";

const StyledDiv = styled.div`
  margin-bottom: 32px;
`;

const FixtureList = (props) => {
  return (
    <StyledDiv>
      <GridContainer>
        <GridRow>{props.children}</GridRow>
      </GridContainer>
    </StyledDiv>
  );
};

export default FixtureList;
