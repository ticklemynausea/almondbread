import { useEffect, useRef, useState } from "react";

import InteractionLayer from "InteractionLayer";
import MandelbrotLayer from "MandelbrotLayer";
import HelpLayer from "HelpLayer";
import StatusLayer from "StatusLayer";
import withWindowSize from "withWindowSize";
import { parameters } from "parameters";
import { render } from "mandelbrot";
import { query } from "query";

import 'reset-css';
import 'App.scss';

function App({ windowSize }) {
  const parametersRef = useRef(null);
  const mandelbrotRef = useRef(null);
  const interactionRef = useRef(null);

  const [showHelp, setShowHelp] = useState(true);

  const renderMandelbrot = () => render(mandelbrotRef.current, parametersRef.current);

  useEffect(() => {
    if (parametersRef.current == null) {
      parametersRef.current = parameters(query());
    }

    window.onpopstate = handlePopState;
  });

  useEffect(() => {
    interactionRef.current.width = windowSize.windowWidth;
    interactionRef.current.height = windowSize.windowHeight;
    mandelbrotRef.current.width = windowSize.windowWidth;
    mandelbrotRef.current.height = windowSize.windowHeight

    renderMandelbrot();
  }, [windowSize]);

  const handlePopState = (event)  => {
    parametersRef.current = parameters(query());

    renderMandelbrot();
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  }

  return (
    <>
      {showHelp && <HelpLayer
        toggleHelp={toggleHelp}
      />}
      <MandelbrotLayer
        parametersRef={parametersRef}
        mandelbrotRef={mandelbrotRef}
      />
      <InteractionLayer
        parametersRef={parametersRef}
        mandelbrotRef={mandelbrotRef}
        interactionRef={interactionRef}
        toggleHelp={toggleHelp}
        renderMandelbrot={renderMandelbrot}
      />
      <StatusLayer />
    </>
  );
}

export default withWindowSize(App);
