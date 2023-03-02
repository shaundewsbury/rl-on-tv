import styled from "styled-components";
import Image from "next/image";

import Typography from "./design-configs/Typography";
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

  p {
    ${Typography.paragraph.default}
  }

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

  .gridRow {
    row-gap: 0px;
    align-items: center;

    > div:not(.date) {
      margin-bottom: ${Spacing.spacing8};
    }

    .date {
      margin-bottom: ${Spacing.spacing4};
    }
  }
`;

import Clubs from "../data/Clubs";

const Fixture = (props) => {
  const homeTeamInfo = Clubs.sl.find((club) => club.name === props.homeTeam);
  const awayTeamInfo = Clubs.sl.find((club) => club.name === props.awayTeam);

  const dateFormated = new Date(props.date).toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <StyledFixture desktop="6">
      <GridRow>
        <GridItem className="fixtureType">
          {props.competition} | Round {props.round}
        </GridItem>

        <GridItem className="date">
          <p>{dateFormated}</p>
        </GridItem>
        <GridItem className="ko">
          <p>{props.time} KO</p>
        </GridItem>

        <GridItem className="homeTeam" mobile="5">
          <div>
            <Image src={homeTeamInfo.image} alt="" width={100} height={100} />
            <p className="teamName">{props.homeTeam}</p>
          </div>
        </GridItem>

        <GridItem className="vs" mobile="2">
          <p>vs</p>
        </GridItem>

        <GridItem className="awayTeam" mobile="5">
          <div>
            <Image src={awayTeamInfo.image} alt="" width={100} height={100} />
            <p className="teamName">{props.awayTeam}</p>
          </div>
        </GridItem>

        <GridItem className="channel">{props.channel}</GridItem>
      </GridRow>
    </StyledFixture>
  );
};

export default Fixture;
