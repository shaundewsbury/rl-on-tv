import { useState } from "react";
import styled from "styled-components";

import {
  GridConfig,
  GridContainer,
  GridRow,
  GridItem,
} from "./design-configs/Grid";
import Spacing from "./design-configs/Spacing";
import Colours from "./design-configs/Colours";

import Button from "./Button";
import { AiOutlineClose } from "react-icons/ai";
import Typography from "./design-configs/Typography";

const StyledGridItem = styled(GridItem)`
  margin-bottom: ${Spacing.spacing24};
`;

const StyledFilters = styled.div`
  display: flex;
  gap: ${Spacing.spacing16};
  flex-direction: column;
  position: absolute;
  padding: ${Spacing.spacing16};
  top: 0;
  left: -100%;
  width: 80%;
  height: 100vh;
  background: ${Colours.blues.light};
  opacity: 0;
  transition: all 0.5s ease-in;
  box-shadow: 4px 4px 8px ${Colours.blues.dark};

  @media screen and (min-width: ${GridConfig.tablet.minWidth}) {
    width: 60%;
  }
  @media screen and (min-width: ${GridConfig.desktop.minWidth}) {
    width: 40%;
  }

  &.active {
    left: 0%;
    opacity: 1;
  }

  h3 {
    ${Typography.heading.h24};
  }

  h4 {
    ${Typography.heading.h20};
  }

  .menu {
    display: flex;
    justify-content: space-between;
  }

  .filterType {
    display: flex;
    flex-direction: column;
    gap: ${Spacing.spacing8};

    p {
      cursor: pointer;
      &:before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        position: relative;
        margin-right: ${Spacing.spacing8};
        width: 6px;
        height: 6px;
        background: ${Colours.white};
        outline: 2px solid ${Colours.white};
      }
      &.active {
        font-weight: 600;

        &:before {
          background: ${Colours.black};
        }
      }
    }
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: ${Spacing.spacing8};
`;

let returnedFixtures = [];

const Filters = ({
  filtersPanel,
  teamsOnTv,
  channelList,
  fixtures,
  setFilteredFixtureChange,
}) => {
  const [activePanel, setActivePanel] = useState(false);

  let applyTeamFilter;

  const teamFilterClickHandler = (e) => {
    e.target.classList.toggle("active");
    const clickedTeam = e.target.innerHTML;

    applyTeamFilter = fixtures.filter(
      (fixture) =>
        fixture.homeTeam === clickedTeam || fixture.awayTeam === clickedTeam
    );
  };

  const openFilterPanelClickHandler = () => {
    setActivePanel(true);
  };
  const closeFilterPanelClickHandler = () => {
    setActivePanel(false);
  };
  const applyFiltersHandler = () => {
    setActivePanel(false);
    returnedFixtures = applyTeamFilter;
    setFilteredFixtureChange(returnedFixtures);
  };

  return (
    <GridContainer>
      <GridRow>
        <StyledGridItem>
          <Button title="Filters" onClick={openFilterPanelClickHandler} />
          <StyledFilters className={activePanel ? "active" : ""}>
            <div className="menu">
              <h3>Filters</h3>
              <div onClick={closeFilterPanelClickHandler}>
                <AiOutlineClose />
              </div>
            </div>
            <div className="filterType">
              <h4>By team</h4>
              {teamsOnTv.map((team, index) => (
                <p key={index} onClick={teamFilterClickHandler}>
                  {team}
                </p>
              ))}
            </div>
            {/* <div className="filterType">
              <h4>By Channel</h4>

              {channelList.map((channel, index) => (
                <p key={index}>{channel}</p>
              ))}
            </div> */}
            <StyledButton title="Apply Filters" onClick={applyFiltersHandler} />
          </StyledFilters>
        </StyledGridItem>
      </GridRow>
    </GridContainer>
  );
};

export function returnedFilteredFixtures() {
  return returnedFixtures;
}

export default Filters;
