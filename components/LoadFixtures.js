import { useState, useEffect } from "react";

const LoadFixtures = () => {
  const [fixtureData, setFixtureData] = useState([]);
  const [loadComplete, setLoadComplete] = useState(false);
  useEffect(() => {
    fetch(
      "https://rlontv-default-rtdb.europe-west1.firebasedatabase.app/fixtures.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const fixturesArray = [];

        for (const key in data) {
          fixturesArray.push({
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

        setFixtureData(fixturesArray);
        setLoadComplete(true);
      });
  }, []);

  return { fixtureData };
};

export default LoadFixtures;
