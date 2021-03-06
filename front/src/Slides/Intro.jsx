import React, { useEffect, useState, useRef, useCallback } from "react";
import ArrowDropDownCircleTwoToneIcon from "@material-ui/icons/ArrowDropDownCircleTwoTone";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Keyframes } from "react-spring/renderprops";
import { config } from "react-spring";
import { useTranslation } from "react-i18next";

import Slide from "./Components/Slide";
import useRefreshOnResize from "../hooks/useRefreshOnResize";

const useStyles = makeStyles({
  slide: {
    backgroundImage: `url("${process.env.PUBLIC_URL}/kiff_ta_patate.jpg")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    color: "white",
  },
  arrowTipsScroll: {
    position: "fixed",
    bottom: 0,
    marginTop: "auto",
    marginBottom: 10,
    alignSelf: "center",
    fontSize: 40,
    "& path:first-child": {
      fill: "white",
    },
  },
});

const ArrowTipsAimationScrollStates = {
  HIDDEN: "hidden",
  STILL: "still",
  WIGGLE: "wiggle",
};

const ArrowTipsAimationScroll = Keyframes.Spring({
  [ArrowTipsAimationScrollStates.HIDDEN]: {
    opacity: 0,
    transform: "translate(0px, 0px)",
  },
  [ArrowTipsAimationScrollStates.STILL]: {
    opacity: 1,
    config: config.molasses,
    transform: "translate(0px, 0px)",
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
  const { t } = useTranslation(["slides"]);
  const [stateArrowTipsScroll, setStateArrowTipsScroll] = useState(
    ArrowTipsAimationScrollStates.HIDDEN
  );
  const userDidScroll = useRef(false);
  const userDidHoverArrowTips = useRef(false);
  useEffect(() => {
    if (window.scrollY > 0) return undefined;
    const showTimeout = setTimeout(() => {
      if (!userDidScroll.current)
        setStateArrowTipsScroll(ArrowTipsAimationScrollStates.STILL);
    }, 3000);
    const wiggleTimeout = setTimeout(() => {
      if (!userDidScroll.current && !userDidHoverArrowTips.current)
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
  const onMouseEnterArrowScrollTip = useCallback(() => {
    userDidHoverArrowTips.current = true;
    if (stateArrowTipsScroll === ArrowTipsAimationScrollStates.WIGGLE)
      setStateArrowTipsScroll(ArrowTipsAimationScrollStates.STILL);
  }, [stateArrowTipsScroll]);

  const isSmallDevice = !useMediaQuery((theme) => theme.breakpoints.up("md"));
  useRefreshOnResize();
  return (
    <Slide ref={ref} className={classes.slide} {...restProps}>
      <Typography
        variant={isSmallDevice ? "h2" : "h1"}
        component="h1"
        gutterBottom
      >
        Dylan
        <br />
        Merigaud
      </Typography>
      <Typography
        variant={isSmallDevice ? "h3" : "h2"}
        component="h2"
        gutterBottom
      >
        {t("slides:intro_title")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t("slides:intro_body")}
      </Typography>
      <ArrowTipsAimationScroll state={stateArrowTipsScroll}>
        {(styleProps) => (
          <Tooltip placement="top" title="You can scroll to view more">
            <ArrowDropDownCircleTwoToneIcon
              onMouseEnter={onMouseEnterArrowScrollTip}
              className={classes.arrowTipsScroll}
              style={styleProps}
            />
          </Tooltip>
        )}
      </ArrowTipsAimationScroll>
    </Slide>
  );
});

export default Intro;
