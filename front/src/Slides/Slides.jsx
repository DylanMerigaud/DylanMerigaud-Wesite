import React, { useRef, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";

import Intro from "./Intro";
import Bio from "./Bio";

const Slides = () => {
  const history = useHistory();

  const slides = [
    { id: "intro", component: Intro },
    { id: "bio", component: Bio },
  ];
  const slidesRef = useRef(
    slides.map((e) => ({
      current: null,
    }))
  );
  const reversedSlideRefCurrent = useMemo(
    () => slidesRef.current.slice().reverse(),
    [slidesRef]
  );
  useEffect(() => {
    const scrollCb = () => {
      reversedSlideRefCurrent.some((ref, index) => {
        if (
          ref.current &&
          ref.current.getBoundingClientRect().top < window.innerHeight * 0.5
        ) {
          const computedHash = `#${slides[slides.length - index - 1].id}`;
          if (computedHash !== history.location.hash)
            history.replace(computedHash);
          return true;
        }
        return false;
      });
    };
    window.addEventListener("scroll", scrollCb, { passive: true });
    return () =>
      window.removeEventListener("scroll", scrollCb, { passive: true });
  }, [history, slides, reversedSlideRefCurrent]);

  return slides.map(({ id, component: Component }, index) => {
    return (
      <Component id={id} name={id} ref={slidesRef.current[index]} key={index} />
    );
  });
};

export default Slides;
