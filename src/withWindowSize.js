import { useState } from "react";
import { debounce } from "lodash";

let resizeHandler;

const withWindowSize = (Component, debounceTime = 100) => () => {
  const windowWidth = window.innerWidth || document.body.clientWidth;
  const windowHeight = window.innerHeight || document.body.clientHeight;

  const [windowSize, setWindowSize] = useState({ windowWidth, windowHeight });

  if (resizeHandler != null) {
    window.removeEventListener("resize", resizeHandler);
  }

  resizeHandler = debounce(() => {
    const windowWidth = window.innerWidth || document.body.clientWidth;
    const windowHeight = window.innerHeight || document.body.clientHeight;

    setWindowSize({ windowWidth, windowHeight });
  }, debounceTime)

  window.addEventListener("resize", resizeHandler);

  return <Component windowSize={windowSize} />;
};

export default withWindowSize;
