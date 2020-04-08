import React, { useEffect, useState, useRef } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { makeStyles } from "@material-ui/core/styles";
import { Keyframes } from "react-spring/renderprops";
import { config } from "react-spring";

import Slide from "./Components/Slide";

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

const Intro = React.forwardRef(({ ...restProps }, ref) => {
  const classes = useStyles();
  const [stateArrowTipsScroll, setStateArrowTipsScroll] = useState(
    ArrowTipsAimationScrollStates.HIDDEN
  );
  const userDidScroll = useRef(false);
  useEffect(() => {
    if (window.scrollY > 0) return undefined;
    const showTimeout = setTimeout(() => {
      if (!userDidScroll.current)
        setStateArrowTipsScroll(ArrowTipsAimationScrollStates.SHOWN);
    }, 3000);
    const wiggleTimeout = setTimeout(() => {
      if (!userDidScroll.current)
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
      userDidScroll.current = true;
      window.removeEventListener("scroll", scrollCb, { passive: true });
    };
    window.addEventListener("scroll", scrollCb, { passive: true });
    return () =>
      window.removeEventListener("scroll", scrollCb, { passive: true });
  });

  return (
    <Slide ref={ref} {...restProps}>
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
});

export default Intro;
