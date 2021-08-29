import { useEffect, useRef } from "react";
import { debounce } from "lodash";

import Help from "Help";
import { parameters } from "parameters";
import { render } from "mandelbrot";
import 'reset-css';
import './App.css';

function App() {
  const mandelbrotRef = useRef(null);
  const interactionRef = useRef(null);
  const parametersRef = useRef(null);

  let dragZoom = {};

  const setupCanvas = () => {
    mandelbrotRef.current.width = mandelbrotRef.current.clientWidth;
    mandelbrotRef.current.height = mandelbrotRef.current.clientHeight;

    interactionRef.current.width = interactionRef.current.clientWidth;
    interactionRef.current.height = interactionRef.current.clientHeight;

    interactionRef.current.focus();
  }

  const renderCanvas = () => render(mandelbrotRef.current, parametersRef.current);

  useEffect(() => {
    setupCanvas();

    parametersRef.current = parameters(mandelbrotRef.current);

    renderCanvas();

    window.addEventListener("resize", debounce(handleResize, 100));
  });

  const handleKeyDown = (event) => {
    const parameters = parametersRef.current;

    switch (event.code) {
      case "ArrowUp":
        parameters.pan(0, -1);
        break;

      case "ArrowDown":
        parameters.pan(0, 1);
        break;

      case "ArrowLeft":
        parameters.pan(1, 0);
        break;

      case "ArrowRight":
        parameters.pan(-1, 0);
        break;

      case "KeyQ":
        parameters.zoom(-1, -1);
        break;

      case "KeyW":
        parameters.zoom(1, 1);
        break;

      case "KeyA":
        parameters.changeIterations(-50);
        break;

      case "KeyS":
        parameters.changeIterations(100);
        break;

     case "KeyZ":
        parameters.changeWorkers(-1);
        break;

      case "KeyX":
        parameters.changeWorkers(1);
        break;

      case "KeyE":
        parameters.undo();
        break;

      case "KeyR":
        parameters.reset();
        break;

      case "KeyD":
        parameters.zoom(-1, 0);
        break;

      case "KeyF":
        parameters.zoom(1, 0);
        break;

      case "KeyC":
        parameters.zoom(0, -1);
        break;

      case "KeyV":
        parameters.zoom(0, 1);
        break;

      case "KeyH":
        toggleHelp();
        return;

      default:
        return;
    }

    renderCanvas();
  }

  const handleMouseDown = (e) => {
    dragZoom = {
      dragging: true,
      x0: e.pageX,
      y0: e.pageY,
    };
  }

  const handleMouseMove = (e) => {
    if (!dragZoom.dragging) {
      return;
    }
    const ctx = interactionRef.current.getContext("2d")
    ctx.clearRect(
      0,
      0,
      interactionRef.current.width,
      interactionRef.current.height,
    );

     dragZoom = {
      ...dragZoom,
      x1: e.pageX,
      y1: e.pageY,
    };

    ctx.strokeStyle = "rgba(255, 100, 50, 50)";
    ctx.strokeRect(
      dragZoom.x0,
      dragZoom.y0,
      dragZoom.x1 - dragZoom.x0,
      dragZoom.y1 - dragZoom.y0,
    );


  }

  const handleMouseUp = (e) => {
    if (!dragZoom.dragging) {
      return;
    }

    const parameters = parametersRef.current;

    const x0 = Math.min(dragZoom.x0, dragZoom.x1);
    const x1 = Math.max(dragZoom.x0, dragZoom.x1);
    const y0 = Math.min(dragZoom.y0, dragZoom.y1);
    const y1 = Math.max(dragZoom.y0, dragZoom.y1);

    parameters.zoomInto(
      mandelbrotRef.current.width,
      mandelbrotRef.current.height,
      x0,
      y0,
      x1,
      y1,
    );

    dragZoom = {
      dragging: false,
    };

    const ctx = interactionRef.current.getContext("2d");
    ctx.clearRect(
      0,
      0,
      interactionRef.current.width,
      interactionRef.current.height,
    );

    renderCanvas();
  }

  const handleResize = (e) => {
    setupCanvas();
    renderCanvas();
  };

  const toggleHelp = (e) => {
    const div = document.getElementById("help");

    if (div.style.display === "none") {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  }

  return (
    <>
      <Help />
      <div>
        <canvas
          id="mandelbrot"
          ref={mandelbrotRef}
        />
        <canvas
          id="interaction"
          ref={interactionRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
    </>
  );
}

export default App;
