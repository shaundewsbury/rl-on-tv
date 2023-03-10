import Link from "next/link";
import styled from "styled-components";
import Colours from "./design-configs/Colours";
import Spacing from "./design-configs/Spacing";

import GridConfig from "./design-configs/GridConfig";
import NavigationLinks from "../data/NavigationLinks";

const StyledNavigation = styled.ul`
  display: flex;
  gap: 1rem;
  width: auto;
  padding: 0;
  margin: 0 auto;
  margin-bottom: ${Spacing.spacing32};
  justify-content: center;
  list-style: none;

  li {
    background: ${Colours.blues.light};
    padding: ${Spacing.spacing8} ${Spacing.spacing16};
    border: 2px solid ${Colours.blues.dark};
    box-shadow: 4px 4px 0px ${Colours.blues.dark};

    // a.active {
    //   font-weight: bold;
    //   position: relative;

    //   &:after {
    //     display: block;
    //     content: "";
    //     position: relative;
    //     width: 50%;
    //     left: 50%;
    //     transform: translateX(-50%);
    //     height: 4px;
    //     background: ${Colours.blues.light};
    //     margin-top: ${Spacing.spacing4};
    //     border-radius: 4px;
    //   }
    // }
  }

  @media screen and (max-width: ${GridConfig.desktop.minWidth}) {
    overflow-x: scroll;
    justify-content: start;
    padding: 0 ${Spacing.spacing16};

    li {
      min-width: 150px;
      text-align: center;
    }
  }
`;

const Navigation = (props) => {
  return (
    <StyledNavigation>
      {NavigationLinks.map((navItem) => (
        <li key={navItem.id}>
          <Link href={navItem.link}>{navItem.title}</Link>
        </li>
      ))}
    </StyledNavigation>
  );
};

export default Navigation;
