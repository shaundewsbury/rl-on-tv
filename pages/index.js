import Head from "next/head";
import { useState, useEffect } from "react";

import PageTitle from "../components/layouts/PageTitle";

import FixtureList from "../components/FixtureList";
import Fixture from "../components/Fixture";
import SkeletonLoader from "../components/SkeletonLoader";

export default function Home() {
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

  function getEndOfCurrentWeek(x) {
    var now = new Date();
    now.setDate(now.getDate() + ((x + (7 - now.getDay())) % 7));
    return now;
  }

  let endOfCurrentWeek =
    getEndOfCurrentWeek(0).toISOString().split("T")[0] + 2359;
  const todaysDate =
    new Date().toISOString().split("T")[0] + new Date().getTime();

  console.log(todaysDate);
  const filteredFixtures = fixtureData.filter(
    (fixture) => (fixture.date < endOfCurrentWeek) & (fixture.date > todaysDate)
  );

  console.log(filteredFixtures);

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
            filteredFixtures.map((fixture) => (
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
