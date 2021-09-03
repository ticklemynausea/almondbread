import { useEffect, useRef, useState, useCallback } from "react";

import InteractionLayer from "InteractionLayer";
import MandelbrotLayer from "MandelbrotLayer";
import HelpLayer from "HelpLayer";
import InfoLayer from "InfoLayer";
import withWindowSize from "withWindowSize";
import { parameters } from "parameters";
import { render } from "mandelbrot";
import { query } from "query";

import "App.scss";

const CLEAR_AFTER = 2000;

function App({ windowSize }) {
  const parametersRef = useRef(null);
  const mandelbrotRef = useRef(null);
  const interactionRef = useRef(null);

  const [showHelp, setShowHelp] = useState(true);
  const [status, setStatus] = useState(null);
  const [action, setAction] = useState(null);

  const setStatusAndClearTimeoutRef = useRef(null);
  const setStatusAndClear = useCallback((text) => {
    clearTimeout(setStatusAndClearTimeoutRef.current);
    setStatus(text);
    setStatusAndClearTimeoutRef.current = setTimeout(() => {
      setStatus(null)
    }, CLEAR_AFTER);
  }, []);

  const setActionAndClearTimeoutRef = useRef(null);
  const setActionAndClear = useCallback((text) => {
    clearTimeout(setActionAndClearTimeoutRef.current);
    setAction(text);
    setActionAndClearTimeoutRef.current = setTimeout(() => {
      setAction(null)
    }, CLEAR_AFTER);
  }, []);

  const renderMandelbrot = useCallback(async () => {
    const timer = window.performance.now();
    setStatus("rendering...");

    await render(mandelbrotRef.current, parametersRef.current);

    const result = window.performance.now() - timer;

    setStatusAndClear(`rendered in ${result}ms.`);
  }, [setStatusAndClear]);

  const handlePopState = (event)  => {
    parametersRef.current = parameters(query());

    renderMandelbrot();
  };

  const toggleHelp = useCallback(() => {
    setShowHelp(showHelp => !showHelp);
  }, []);

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
  }, [windowSize, renderMandelbrot]);

  return (
    <div id="app">
      {showHelp && <HelpLayer
        toggleHelp={toggleHelp}
      />}
      {parametersRef.current && <InfoLayer
        status={status}
        action={action}
        wind0w={parametersRef.current.wind0w}
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
        setAction={setActionAndClear}
      />
    </div>
  );
}

export default withWindowSize(App);
