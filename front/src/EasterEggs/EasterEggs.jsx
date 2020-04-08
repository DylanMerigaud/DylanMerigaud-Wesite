import React, { useRef, useState, useEffect, useCallback } from "react";
import Modal from "@material-ui/core/Modal";

import Laboulle from "./Laboule";

const EasterEggs = React.forwardRef(({ ...restProps }, ref) => {
  const lastTypedLetters = useRef("");
  const [easterEggs, setEasterEggs] = useState({
    Laboulle: { code: "laboule", active: false },
  });
  useEffect(() => {
    const onKeyDown = (e) => {
      lastTypedLetters.current = (lastTypedLetters.current + e.key).slice(-40);
      Object.keys(easterEggs).forEach((key) => {
        if (
          lastTypedLetters.current.slice(-easterEggs[key].code.length) ===
          easterEggs[key].code
        )
          setEasterEggs((state) => ({
            ...state,
            [key]: { ...easterEggs[key], active: !easterEggs[key].active },
          }));
      });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [setEasterEggs, easterEggs]);

  const onLaboulleClose = useCallback(() => {
    setEasterEggs((state) => ({
      ...state,
      Laboulle: { ...state.Laboulle, active: !state.Laboulle.active },
    }));
  }, [setEasterEggs]);

  return (
    <React.Fragment>
      {easterEggs.Laboulle.active ? (
        <Modal open={true} onClose={onLaboulleClose}>
          <Laboulle />
        </Modal>
      ) : null}
    </React.Fragment>
  );
});

export default EasterEggs;
