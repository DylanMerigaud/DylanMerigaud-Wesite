import React from "react";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "calc(100% - 30px)",
    marginLeft: 15,
    marginRight: 15,
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
