import { useState, useEffect } from "react";
import Head from "next/head";

import PageTitle from "../components/layouts/PageTitle";

import FixtureList from "../components/FixtureList";
import Fixture from "../components/Fixture";
import SkeletonLoader from "../components/SkeletonLoader";

import GridItem from "../components/design-configs/GridItem";

import Button from "../components/Button";
import Filters from "../components/Filters";

import { fetchFixtures } from "../components/fetchFixtures";

export default function SuperLeaguePage() {
  let fixtures = fetchFixtures();

  const [filteredFixtureChange, setFilteredFixtureChange] = useState();

  console.log("NEW USE STATE", filteredFixtureChange);

  const [loadComplete, setLoadComplete] = useState(false);

  if (fixtures.length > 0) {
    setTimeout(function () {
      setLoadComplete(true);
    }, 1000);
  }

  const [showPreviousFixtures, setShowPreviousFixtures] = useState(false);

  const todaysDate = new Date().toISOString().split("T")[0] + "23:59";

  let activeFixtures = fixtures.filter(
    (fixture) =>
      `${fixture.date}${fixture.time}` > todaysDate &&
      `${fixture.competition}` === "Super League"
  );

  let expiredFixtures = fixtures.filter((fixture) => fixture.date < todaysDate);

  // Teams available
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

        <Filters
          teamsOnTv={teamsOnTv}
          channelList={channelList}
          fixtures={fixtures}
          setFilteredFixtureChange={setFilteredFixtureChange}
        />

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
            // filteredFixtureChange
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

        <FixtureList>
          {showPreviousFixtures &&
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
          <GridItem>
            <Button
              onClick={showPreviousFixturesClickHandler}
              title={
                showPreviousFixtures
                  ? "Hide Previous Fixtures"
                  : "Show Previous Fixtures"
              }
            />
          </GridItem>
        </FixtureList>
      </main>
    </div>
  );
}
