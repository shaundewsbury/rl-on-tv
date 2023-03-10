import { useState, useEffect } from "react";
import Head from "next/head";

import PageTitle from "../components/layouts/PageTitle";

import FixtureList from "../components/FixtureList";
import Fixture from "../components/Fixture";
import SkeletonLoader from "../components/SkeletonLoader";
import { FetchFixtures } from "../components/FetchFixtures";
import GridItem from "../components/design-configs/GridItem";

import Button from "../components/Button";
import Filters from "../components/Filters";

export default function SuperLeaguePage() {
  const [loadComplete, setLoadComplete] = useState(false);
  const [filteredFixtures, setFilteredFixtures] = useState();

  let fixtures = FetchFixtures();

  const todaysDate = new Date().toISOString().split("T")[0] + " 23:59";

  let activeFixtures = fixtures.filter(
    (fixture) =>
      `${fixture.date}${fixture.time}` > todaysDate &&
      `${fixture.competition}` === "Super League"
  );

  if (fixtures.length > 0) {
    setTimeout(function () {
      setLoadComplete(true);
      // setFilteredFixtures(activeFixtures);
    }, 1000);
  }

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
          // channelList={channelList}
          fixtures={activeFixtures}
          setFilteredFixtures={setFilteredFixtures}
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
          {loadComplete && filteredFixtures
            ? filteredFixtures.map((fixture) => (
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
              ))
            : activeFixtures.map((fixture) => (
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
