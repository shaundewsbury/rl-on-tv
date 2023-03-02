import { useState, useEffect } from "react";

export function fetchFixtures() {
  const [fixtureData, setFixtureData] = useState([]);

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

        loadedFixtures.sort(function (a, b) {
          const aDate = a.date.replace(/\-/g, "") + a.time.replace(":", "");
          const bDate = b.date.replace(/\-/g, "") + b.time.replace(":", "");
          return aDate - bDate;
        });

        setFixtureData(loadedFixtures);
      });
  }, []);

  return fixtureData;
}
