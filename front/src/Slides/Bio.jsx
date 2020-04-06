import React from "react";

import Slide from "./Components/Slide";

const Bio = React.forwardRef(({ ...restProps }, ref) => {
  return (
    <Slide ref={ref} {...restProps}>
      Bio
    </Slide>
  );
});

export default Bio;
