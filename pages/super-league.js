import Head from "next/head";
import { useState, useEffect } from "react";
import styled from "styled-components";
import PageTitle from "../components/layouts/PageTitle";

import FixtureList from "../components/FixtureList";
import Fixture from "../components/Fixture";
import SkeletonLoader from "../components/SkeletonLoader";

const StyledFilterPanel = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100vh;
  background: blue;
  opacity: 0;
  transition: all 0.5s;

  &.active {
    left: 0%;
    opacity: 1;
  }
`;

export default function SuperLeaguePage() {
  const [filtersPanel, setFiltersPanel] = useState(false);
  const [showPreviousFixtures, setShowPreviousFixtures] = useState(false);
  const [fixtureData, setFixtureData] = useState([]);
  const [loadComplete, setLoadComplete] = useState(false);

  useEffect(() => {
    fetch(
      "https://rlontv-default-rtdb.europe-west1.firebasedatabase.app/fixtures.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const loadedFixtures = [];

        for (const key in data) {
          loadedFixtures.push({
            id: key,
            competition: data[key].competition,
            round: data[key].round,
            date: data[key].date,
            homeTeam: data[key].homeTeam,
            awayTeam: data[key].awayTeam,
            time: data[key].time,
            channel: data[key].channel,
          });
        }

        setFixtureData(loadedFixtures);
        setTimeout(function () {
          setLoadComplete(true);
        }, 1000);
      });
  }, []);

  const todaysDate = new Date().toISOString().split("T")[0] + "23:59";

  let activeFixtures = fixtureData.filter(
    (fixture) => `${fixture.date}${fixture.time}` > todaysDate
  );

  let expiredFixtures = fixtureData.filter(
    (fixture) => fixture.date < todaysDate
  );

  // Teams Available
  let teamsOnTv = [];
  for (let fixture of activeFixtures) {
    teamsOnTv.push(fixture.homeTeam);
    teamsOnTv.push(fixture.awayTeam);
  }
  teamsOnTv = teamsOnTv.filter(
    (value, index, array) => array.indexOf(value) === index
  );
  teamsOnTv.sort();

  // Channels available
  let channelList = [];
  for (let fixture of activeFixtures) {
    channelList.push(fixture.channel);
  }
  channelList = channelList.filter(
    (value, index, array) => array.indexOf(value) === index
  );
  channelList.sort();

  const teamFilterClickHandler = (team) => {
    const selectedTeam = team.target.innerHTML;
    console.log(team.target.innerHTML);

    activeFixtures = activeFixtures.filter(
      (team) => team.homeTeam === selectedTeam || team.awayTeam === selectedTeam
    );
  };

  const showPreviousFixturesClickHandler = () => {
    setShowPreviousFixtures(!showPreviousFixtures);
  };

  const openFilterPanelClickHandler = () => {
    setFiltersPanel(true);
  };
  const closeFilterPanelClickHandler = () => {
    setFiltersPanel(false);
  };
  return (
    <div>
      <Head>
        <title>Rugby League on TV | Super League</title>
        <meta
          name="description"
          content="A list of all Super League games on TV"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageTitle heading="Super League" />

        <button onClick={openFilterPanelClickHandler}>Filters</button>
        {filtersPanel && (
          <StyledFilterPanel className={filtersPanel ? "active" : ""}>
            <button onClick={closeFilterPanelClickHandler}>Close</button>
            <p>Filter by Teams:</p>
            <ul>
              {teamsOnTv.map((team, index) => (
                <li key={index} onClick={teamFilterClickHandler}>
                  {team}
                </li>
              ))}
            </ul>
            <p>Filter by Channel:</p>

            <ul>
              {channelList.map((channel, index) => (
                <li key={index}>{channel}</li>
              ))}
            </ul>
          </StyledFilterPanel>
        )}

        <FixtureList>
          {!loadComplete && (
            <>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </>
          )}
          {loadComplete &&
            activeFixtures.map((fixture) => (
              <Fixture
                key={fixture.id}
                competition={fixture.competition}
                round={fixture.round}
                date={fixture.date}
                homeTeam={fixture.homeTeam}
                awayTeam={fixture.awayTeam}
                time={fixture.time}
                channel={fixture.channel}
              />
            ))}
        </FixtureList>

        <div onClick={showPreviousFixturesClickHandler}>
          {showPreviousFixtures
            ? "Hide Previous Fixtures"
            : "Show Previous Fixtures"}
        </div>

        <FixtureList>
          {showPreviousFixtures & loadComplete &&
            expiredFixtures.map((fixture) => (
              <Fixture
                key={fixture.id}
                competition={fixture.competition}
                round={fixture.round}
                date={fixture.date}
                homeTeam={fixture.homeTeam}
                awayTeam={fixture.awayTeam}
                time={fixture.time}
                channel={fixture.channel}
              />
            ))}
        </FixtureList>
      </main>
    </div>
  );
}
