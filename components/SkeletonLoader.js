import styled from "styled-components";
import Image from "next/image";

import Spacing from "./design-configs/Spacing";
import Colours from "./design-configs/Colours";

import {
  GridContainer,
  GridRow,
  GridItem,
} from "../components/design-configs/Grid";

const StyledFixture = styled(GridItem)`
  background: #f5f5f5;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  box-shadow: 4px 4px 8px #001325;

  .fixtureType {
    background: ${Colours.purple.light};
    padding: ${Spacing.spacing8};
    color: ${Colours.purple.dark};
    border-radius: 0 4px 0 0;
  }

  img {
    max-width: 50%;
    height: auto;
  }

  .textLoader {
    display: flex;
    margin: 0 auto;
    animation: skeleton-loading 1s linear infinite alternate;
    width: 25%;
    height: 16px;
  }

  .imgLoader {
    display: flex;
    margin: 0 auto;
    animation: skeleton-loading 1s linear infinite alternate;
    width: 100px;
    height: 100px;
    margin-bottom: ${Spacing.spacing8};
  }

  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 80%);
    }
    100% {
      background-color: hsl(200, 20%, 95%);
    }
  }
`;

const SkeletonLoader = (props) => {
  return (
    <StyledFixture desktop="6">
      <GridRow>
        <GridItem className="fixtureType">
          <span className="textLoader"></span>
        </GridItem>

        <GridItem className="date">
          <span className="textLoader"></span>
        </GridItem>

        <GridItem className="homeTeam" mobile="5">
          <div>
            <span className="imgLoader"></span>
            <span className="textLoader"></span>
          </div>
        </GridItem>

        <GridItem className="vs" mobile="2">
          <span className="textLoader"></span>
        </GridItem>

        <GridItem className="awayTeam" mobile="5">
          <div>
            <span className="imgLoader"></span>
            <span className="textLoader"></span>
          </div>
        </GridItem>

        <GridItem className="ko">
          <span className="textLoader"></span>
        </GridItem>

        <GridItem className="channel">
          <span className="textLoader"></span>
        </GridItem>
      </GridRow>
    </StyledFixture>
  );
};

export default SkeletonLoader;
