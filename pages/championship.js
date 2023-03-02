import PageTitle from "../components/layouts/PageTitle";
import Head from "next/head";
import GridContainer from "../components/design-configs/GridContainer";
import styled from "styled-components";
import Colours from "../components/design-configs/Colours";
import { fetchFixtures } from "../components/fetchFixtures";
const StyledParagraph = styled.p`
  ${Colours.blues.light}
`;
const ChampionshipPage = (props) => {
  const fixtures = fetchFixtures();
  console.log(fixtures);
  return (
    <div>
      <Head>
        <title>Rugby League on TV | Championship</title>
        <meta
          name="description"
          content="A list of all Championship games on TV"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageTitle heading="Championship"></PageTitle>
        <GridContainer>
          <StyledParagraph>Coming soon</StyledParagraph>
        </GridContainer>
      </main>
    </div>
  );
};

export default ChampionshipPage;
