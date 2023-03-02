import styled from "styled-components";
import Spacing from "./design-configs/Spacing";
import Colours from "./design-configs/Colours";
import Typography from "./design-configs/Typography";

const StyledButton = styled.button`
  ${Typography.paragraph.default};
  height: 40px;
  padding: 0 ${Spacing.spacing32};
  background: ${Colours.white};
  border-radius: 8px;
  border: 2px solid ${Colours.blues.dark};
  color: ${Colours.blues.dark};
`;

const Button = (props) => {
  return <StyledButton {...props}>{props.title}</StyledButton>;
};

export default Button;
