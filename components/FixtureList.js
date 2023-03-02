import {
  GridContainer,
  GridRow,
  GridItem,
} from "../components/design-configs/Grid";

const FixtureList = (props) => {
  return (
    <GridContainer>
      <GridRow>{props.children}</GridRow>
    </GridContainer>
  );
};

export default FixtureList;
