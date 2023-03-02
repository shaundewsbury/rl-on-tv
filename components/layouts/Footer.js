import styled from "styled-components";
import Colours from "../design-configs/Colours";
import Spacing from "../design-configs/Spacing";

const StyledFooter = styled.footer`
  background: ${Colours.base.white};
  color: ${Colours.purple.dark};
  padding: ${Spacing.spacing16};
  text-align: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>Created by Shaun Dewsbury</p>
    </StyledFooter>
  );
};

export default Footer;
