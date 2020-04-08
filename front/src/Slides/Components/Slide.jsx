import React from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "0px 15px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
});

const Slide = React.forwardRef(({ className, ...restProps }, ref) => {
  const classes = useStyles();
  return (
    <div
      className={classnames(classes.root, className)}
      {...restProps}
      ref={ref}
    />
  );
});

export default Slide;
