import { useEffect, useRef, useState } from "react";

import InteractionLayer from "InteractionLayer";
import MandelbrotLayer from "MandelbrotLayer";
import HelpLayer from "HelpLayer";
import InfoLayer from "InfoLayer";
import withWindowSize from "withWindowSize";
import { parameters } from "parameters";
import { render } from "mandelbrot";
import { query } from "query";

import 'App.scss';

const setStateAndClear = (setState) => {
  let timeout;

  return (state, clearAfter = 2000) => {
    clearTimeout(timeout);
    setState(state);
    timeout = setTimeout(() => setState(null), clearAfter);
  }
};

function App({ windowSize }) {
  const parametersRef = useRef(null);
  const mandelbrotRef = useRef(null);
  const interactionRef = useRef(null);

  const [showHelp, setShowHelp] = useState(true);
  const [status, setStatus] = useState(null);
  const [action, setAction] = useState(null);

  const setStatusAndClear = setStateAndClear(setStatus);
  const setActionAndClear = setStateAndClear(setAction);

  const renderMandelbrot = async () => {
    const timer = window.performance.now();
    setStatus("rendering...");

    await render(mandelbrotRef.current, parametersRef.current);

    const result = window.performance.now() - timer;
    setStatusAndClear(`rendered in ${result}ms.`, 2000);
  };

  const handlePopState = (event)  => {
    parametersRef.current = parameters(query());

    renderMandelbrot();
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  }

  useEffect(() => {
    if (parametersRef.current == null) {
      parametersRef.current = parameters(query());
    }

    window.onpopstate = handlePopState;
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    interactionRef.current.width = windowSize.windowWidth;
    interactionRef.current.height = windowSize.windowHeight;
    mandelbrotRef.current.width = windowSize.windowWidth;
    mandelbrotRef.current.height = windowSize.windowHeight

    renderMandelbrot();
  }, [windowSize]);
  /* eslint-enable react-hooks/exhaustive-deps */

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
