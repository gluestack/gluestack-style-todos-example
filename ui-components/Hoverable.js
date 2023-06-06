import React, { useState } from "react";
import { styled } from "@gluestack-style/react";
import StyledPressable from "./StyledPressable";

const Hoverable = ({ children, ...props }) => {
  const [hover, setHover] = useState(false);
  return (
    <StyledPressable
      states={{
        hover,
      }}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      sx={{
        ":hover": {
          bg: "$backgroundDark700",
        },
      }}
      {...props}
    >
      {children}
    </StyledPressable>
  );
};
export default Hoverable;
