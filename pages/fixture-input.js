import { useState } from "react";
import Channels from "../data/Channels";
import Clubs from "../data/Clubs";
import Competition from "../data/Competition";

import styled from "styled-components";
import Colours from "../components/design-configs/Colours";
import Spacing from "../components/design-configs/Spacing";

import { useRef } from "react";
import {
  GridContainer,
  GridRow,
  GridItem,
} from "../components/design-configs/Grid";

const StyledForm = styled.form`
  background: ${Colours.white};
  padding: ${Spacing.spacing24};

  display: flex;
  flex-direction: column;
  gap: 1rem;

  input,
  select {
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 ${Spacing.spacing8};
  }

  button {
    background: ${Colours.blues.mid};
    color: ${Colours.white};
    height: 40px;
    border-radius: 4px;
    padding: 0 ${Spacing.spacing32};
    font-weight: 600;
  }
`;

const FixtureInputPage = () => {
  const competitionRef = useRef("");
  const roundRef = useRef("");
  const dateRef = useRef("");
  const timeRef = useRef("");
  const homeTeamRef = useRef("");
  const awayTeamRef = useRef("");
  const channelRef = useRef("");

  console.log(competitionRef);

  async function addFixtureHandler(e) {
    e.preventDefault();

    console.log(homeTeamRef.current.value);

    const fixture = {
      competition: competitionRef.current.value,
      round: roundRef.current.value,
      date: dateRef.current.value,
      time: timeRef.current.value,
      homeTeam: homeTeamRef.current.value,
      awayTeam: awayTeamRef.current.value,
      channel: channelRef.current.value,
    };

    const response = await fetch(
      "https://rlontv-default-rtdb.europe-west1.firebasedatabase.app/fixtures.json",
      {
        method: "POST",
        body: JSON.stringify(fixture),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  }

  const [competitionType, setCompetitionType] = useState("Super League");
  const competitionChangeHandler = (e) => {
    setCompetitionType(e.target.value);
    console.log(e.target.value);
  };

  return (
    <GridContainer>
      <GridRow>
        <GridItem>
          <StyledForm onSubmit={addFixtureHandler}>
            <select
              id="competition"
              name="Competition"
              ref={competitionRef}
              onChange={competitionChangeHandler}
            >
              <option hidden selected>
                Competition
              </option>
              {Competition.map((comp) => (
                <option key={comp.name} value={comp.name}>
                  {comp.name}
                </option>
              ))}
            </select>
            <input
              id="round"
              type="text"
              placeholder="Round Number"
              ref={roundRef}
            ></input>

            <input type="date" ref={dateRef} />
            <input type="time" ref={timeRef} />

            <select id="homeTeam" name="Home Team" ref={homeTeamRef}>
              <option hidden selected>
                Home Team
              </option>
              {competitionType === "Super League" &&
                Clubs.sl.map((club) => (
                  <option key={club.name} value={club.name}>
                    {club.name}
                  </option>
                ))}

              {competitionType === "NRL" &&
                Clubs.nrl.map((club) => (
                  <option key={club.name} value={club.name}>
                    {club.name}
                  </option>
                ))}
            </select>

            <select id="awayTeam" name="Away Team" ref={awayTeamRef}>
              <option hidden selected>
                Away Team
              </option>
              {competitionType === "Super League" &&
                Clubs.sl.map((club) => (
                  <option key={club.name} value={club.name}>
                    {club.name}
                  </option>
                ))}

              {competitionType === "NRL" &&
                Clubs.nrl.map((club) => (
                  <option key={club.name} value={club.name}>
                    {club.name}
                  </option>
                ))}
            </select>

            <select id="channels" name="Channels" ref={channelRef}>
              <option hidden selected>
                TV Channel
              </option>
              {Channels.map((channel) => (
                <option key={channel.id} value={channel.name}>
                  {channel.name}
                </option>
              ))}
            </select>
            <button>Submit</button>
          </StyledForm>
        </GridItem>
      </GridRow>
    </GridContainer>
  );
};

export default FixtureInputPage;
