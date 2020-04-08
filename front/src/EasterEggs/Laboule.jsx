import React from "react";

const Laboulle = React.forwardRef(({ ...restProps }, ref) => {
  return (
    <iframe
      title="Laboulle"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/VDI1269lWPM?controls=0&autoplay=1&loop=1&playlist=VDI1269lWPM"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      style={{
        position: "absolute",
        width: "calc(100% - 80px)",
        height: "calc(100% - 80px)",
        top: 40,
        left: 40,
      }}
      ref={ref}
      {...restProps}
    />
  );
});

export default Laboulle;
