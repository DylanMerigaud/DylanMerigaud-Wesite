import React, { useEffect, useState } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { makeStyles } from "@material-ui/core/styles";
import SlideAnimation from "@material-ui/core/Slide";
import classNames from "classnames";

import Slide from "./Utils/Slide";

const useStyles = makeStyles({
  arrowTipsScroll: {
    marginTop: "auto",
    alignSelf: "center",
    fontSize: 50,
    opacity: 0,
  },
  arrowTipsScrollShown: {
    opacity: 1,
  },
});

const Intro = () => {
  const classes = useStyles();
  const [showArrowTipsScroll, setShowArrowTipsScroll] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowArrowTipsScroll(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [setShowArrowTipsScroll]);
  console.log(showArrowTipsScroll);
  return (
    <Slide>
      <div>Intro</div>
      <SlideAnimation direction="up" in={showArrowTipsScroll}>
        <ArrowDownward
          className={classNames(classes.arrowTipsScroll, {
            [classes.arrowTipsScrollShown]: showArrowTipsScroll,
          })}
        />
      </SlideAnimation>
    </Slide>
  );
};

export default Intro;
