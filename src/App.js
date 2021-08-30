import { useEffect, useRef } from "react";
import { debounce } from "lodash";

import InteractionLayer from "InteractionLayer";
import MandelbrotLayer from "MandelbrotLayer";
import HelpLayer from "HelpLayer";
import StatusLayer from "StatusLayer";
import { parameters } from "parameters";
import { render } from "mandelbrot";
import { query } from "query";
import { message, clear } from "status";
import 'reset-css';
import './App.scss';

function App() {
  const parametersRef = useRef(null);
  const mandelbrotRef = useRef(null);
  const interactionRef = useRef(null);

  const renderMandelbrot = () => render(mandelbrotRef.current, parametersRef.current);

  useEffect(() => {
    parametersRef.current = parameters(query());

    message("welcome!", parametersRef.current.wind0w);
    renderMandelbrot().then(clear);

    window.addEventListener("resize", debounce(handleResize, 100));

    window.onpopstate = handlePopState;
  });

  const handleResize = (e) => {
    interactionRef.current.width = interactionRef.current.clientWidth;
    interactionRef.current.height = interactionRef.current.clientHeight;
    mandelbrotRef.current.width = mandelbrotRef.current.clientWidth;
    mandelbrotRef.current.height = mandelbrotRef.current.clientHeight;

    renderMandelbrot();
  };

  const handlePopState = (event)  => {
    parametersRef.current = parameters(query());

    message("going back", parametersRef.current.wind0w);
    renderMandelbrot().then(clear);
  };

  return (
    <>
      <HelpLayer />
      <MandelbrotLayer
        mandelbrotRef={mandelbrotRef}
      />
      <InteractionLayer
        interactionRef={interactionRef}
        parametersRef={parametersRef}
        mandelbrotRef={mandelbrotRef}
        renderMandelbrot={renderMandelbrot}
      />
      <StatusLayer />
    </>
  );
}

export default App;
