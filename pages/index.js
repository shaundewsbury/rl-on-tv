import Head from "next/head";
import { useState, useEffect } from "react";

import PageTitle from "../components/layouts/PageTitle";

import FixtureList from "../components/FixtureList";
import Fixture from "../components/Fixture";
import SkeletonLoader from "../components/SkeletonLoader";
import { FetchFixtures } from "../components/FetchFixtures";

export default function Home() {
  let fixtures = FetchFixtures();

  const [loadComplete, setLoadComplete] = useState(false);

  if (fixtures.length > 0) {
    setTimeout(function () {
      setLoadComplete(true);
    }, 1000);
  }

  const getEndOfCurrentWeek = (x) => {
    let now = new Date();
    now.setDate(now.getDate() + ((x + (7 - now.getDay())) % 7));
    return now;
  };

  const endOfCurrentWeek =
    getEndOfCurrentWeek(0).toISOString().split("T")[0] + 2359;
  const todaysDate =
    new Date().toISOString().split("T")[0] + new Date().getTime();

  fixtures = fixtures.filter(
    (fixture) => (fixture.date < endOfCurrentWeek) & (fixture.date > todaysDate)
  );

  return (
    <div>
      <Head>
        <title>Rugby League on TV | On this Week</title>
        <meta
          name="description"
          content="A list of Rugby League games on TV this week"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageTitle heading="On this Week" />
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
            fixtures.map((fixture) => (
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
