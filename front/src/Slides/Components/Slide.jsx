import React from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
});

const Slide = React.forwardRef(({ className, ...restProps }, ref) => {
  const classes = useStyles();
  return (
    <div
      className={classnames(className, classes.root)}
      {...restProps}
      ref={ref}
    />
  );
});

export default Slide;