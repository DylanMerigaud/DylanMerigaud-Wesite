import React, { useEffect, useState } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { makeStyles } from "@material-ui/core/styles";
import { Keyframes } from "react-spring/renderprops";
import { config } from "react-spring";

import Slide from "./Utils/Slide";

const useStyles = makeStyles({
  arrowTipsScroll: {
    marginTop: "auto",
    marginBottom: 10,
    alignSelf: "center",
    fontSize: 40,
  },
});

const ArrowTipsAimationScrollStates = {
  HIDDEN: "hidden",
  SHOWN: "shown",
  WIGGLE: "wiggle",
};

const ArrowTipsAimationScroll = Keyframes.Spring({
  [ArrowTipsAimationScrollStates.HIDDEN]: { opacity: 0 },
  [ArrowTipsAimationScrollStates.SHOWN]: {
    opacity: 1,
    config: config.molasses,
  },
  [ArrowTipsAimationScrollStates.WIGGLE]: async (next, cancel, ownProps) => {
    while (true) {
      await next({ transform: "translate(0px, 0px)", config: config.gentle });
      await next({ transform: "translate(0px, -20px)", config: config.gentle });
    }
  },
});

const Intro = () => {
  const classes = useStyles();
  const [stateArrowTipsScroll, setStateArrowTipsScroll] = useState(
    ArrowTipsAimationScrollStates.HIDDEN
  );
  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setStateArrowTipsScroll(ArrowTipsAimationScrollStates.SHOWN);
    }, 3000);
    const wiggleTimeout = setTimeout(() => {
      setStateArrowTipsScroll(ArrowTipsAimationScrollStates.WIGGLE);
    }, 10000);
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(wiggleTimeout);
    };
  }, [setStateArrowTipsScroll]);
  useEffect(() => {
    const scrollCb = () => {
      setStateArrowTipsScroll(ArrowTipsAimationScrollStates.HIDDEN);
      window.removeEventListener("scroll", scrollCb);
    };
    window.addEventListener("scroll", scrollCb);
    return () => window.removeEventListener("scroll", scrollCb);
  });

  return (
    <Slide>
      <div>Intro</div>
      <ArrowTipsAimationScroll state={stateArrowTipsScroll}>
        {(styleProps) => (
          <ArrowDownward
            className={classes.arrowTipsScroll}
            style={styleProps}
          />
        )}
      </ArrowTipsAimationScroll>
    </Slide>
  );
};

export default Intro;
