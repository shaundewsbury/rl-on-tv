import { useState } from "react";
import styled from "styled-components";

import { useRouter } from "next/router";

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
  transition: all 0.25s ease-in;
  box-shadow: 4px 4px 0px ${Colours.blues.dark};

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

    svg {
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
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

  .filterButtons {
    position: absolute;
    bottom: ${Spacing.spacing8};
  }
`;

let filteredFixtures = [];

const Filters = ({
  filtersPanel,
  teamsOnTv,
  channelList,
  fixtures,
  setFilteredFixtures,
}) => {
  const [activePanel, setActivePanel] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);

  // const routerQueryArray = [];

  const teamFilterClickHandler = (e) => {
    const target = e.target;
    const clickedTeam = e.target.innerHTML;

    if (target.classList.contains("active")) {
      target.classList.remove("active");

      let removeTeamFilter = filteredFixtures.filter(
        (fixture) => fixture.homeTeam !== clickedTeam
      );
      removeTeamFilter = removeTeamFilter.filter(
        (fixture) => fixture.awayTeam !== clickedTeam
      );

      removeTeamFilter.length > 0
        ? (filteredFixtures = removeTeamFilter)
        : (filteredFixtures = []);
    } else {
      target.classList.add("active");

      let applyTeamFilter = fixtures.filter(
        (fixture) =>
          fixture.homeTeam === clickedTeam || fixture.awayTeam === clickedTeam
      );

      applyTeamFilter.push.apply(applyTeamFilter, filteredFixtures);

      const removeDuplicates = new Set();
      applyTeamFilter = applyTeamFilter.filter((el) => {
        const duplicate = removeDuplicates.has(el.id);
        removeDuplicates.add(el.id);
        return !duplicate;
      });
      filteredFixtures = applyTeamFilter;

      setSelectedTeams([...selectedTeams, clickedTeam]);

      // setFixtureHolding(filteredFixtures);
      // console.log(fixtureHolding);
    }

    // For URL Query
    // const clickedTeamString = clickedTeam.toLowerCase().replace(/ /g, "-");
    // routerQueryArray.push(...routerQueryArray, clickedTeamString);
    // console.log(routerQueryArray);

    // router.push({
    //   query: `team=${routerQueryArray}`,
    // });
  };

  const openFilterPanelClickHandler = () => {
    setActivePanel(true);
  };

  const closeFilterPanelClickHandler = () => {
    setActivePanel(false);
  };
  const applyFiltersHandler = () => {
    setActivePanel(false);
    console.log(selectedTeams);

    if (
      filteredFixtures.length === 0
        ? setFilteredFixtures(fixtures)
        : setFilteredFixtures(filteredFixtures)
    );
  };

  const resetFiltersHandler = () => {
    const removeActiveClasses = document.querySelectorAll("p.active");
    removeActiveClasses.forEach((el) => {
      el.classList.remove("active");
    });

    // setActivePanel(false);

    setFilteredFixtures(fixtures);
  };

  const router = useRouter();

  const { team } = router.query;
  const query = router.query;

  return (
    <GridContainer>
      <GridRow>
        <StyledGridItem>
          <Button title="Filters" onClick={openFilterPanelClickHandler} />

          {selectedTeams.length > 0 && <p>Teams: {selectedTeams}</p>}
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

            <div className="filterButtons">
              <Button title="Apply Filters" onClick={applyFiltersHandler} />
              <Button textLink title="Reset" onClick={resetFiltersHandler} />
            </div>
          </StyledFilters>
        </StyledGridItem>
      </GridRow>
    </GridContainer>
  );
};

// export function returnedFilteredFixtures() {
//   return filteredFixtures;
// }

export default Filters;
