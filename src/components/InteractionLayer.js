import { memo, useEffect } from "react";

import { download, filename } from "canvas";

const InteractionLayer = ({
  interactionRef,
  parametersRef,
  mandelbrotRef,
  renderMandelbrot,
  toggleHelp,
  setAction,
}) => {
  let dragZoom = {};

  useEffect(() => {
    interactionRef.current.width = interactionRef.current.clientWidth;
    interactionRef.current.height = interactionRef.current.clientHeight;

    interactionRef.current.focus();
  });

  const handleKeyDown = (event) => {
    const parameters = parametersRef.current;

    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }

    let moveDelta = event.shiftKey ? 0.1 : 1;
    let iterDelta = event.shiftKey ? 5 : 50;
    switch (event.code) {
      case "ArrowUp":
        parameters.pan(0, moveDelta);
        break;

      case "ArrowDown":
        parameters.pan(0, -moveDelta);
        break;

      case "ArrowLeft":
        parameters.pan(-moveDelta, 0);
        break;

      case "ArrowRight":
        parameters.pan(moveDelta, 0);
        break;

      case "KeyQ":
        parameters.zoom(-moveDelta, -moveDelta);
        break;

      case "KeyW":
        parameters.zoom(moveDelta, moveDelta);
        break;

      case "KeyA":
        parameters.changeIterations(-iterDelta);
        setAction(`set max iterations: ${parameters.iterations}`);
        break;

      case "KeyS":
        parameters.changeIterations(iterDelta);
        setAction(`set max iterations: ${parameters.iterations}`);
        break;

     case "KeyZ":
        parameters.changeWorkers(-1);
        setAction(`set max worker threads: ${parameters.workers}`);
        break;

      case "KeyX":
        parameters.changeWorkers(1);
        setAction(`set max worker threads: ${parameters.workers}`);
        break;

      case "KeyE":
        parameters.undo();
        break;

      case "KeyR":
        parameters.reset();
        break;

      case "KeyD":
        parameters.zoom(-moveDelta, 0);
        break;

      case "KeyF":
        parameters.zoom(moveDelta, 0);
        break;

      case "KeyC":
        parameters.zoom(0, -moveDelta);
        break;

      case "KeyV":
        parameters.zoom(0, moveDelta);
        break;

      case "KeyT":
        parameters.recolor(-1);
        setAction(`set palette: ${parameters.palette}`);
        break;

      case "KeyY":
        parameters.recolor(1);
        setAction(`set palette: ${parameters.palette}`);
        break;

      case "KeyU":
        parameters.toggleColoringMethod();
        setAction(`set coloring method: ${parameters.coloringMethod}`);
        break;

      case "KeyH":
        toggleHelp();
        return;

      case "KeyG":
        download(filename(parameters.wind0w));
        return;

      default:
        return;
    }

    renderMandelbrot();
  }

  const handleMouseDown = (e) => {
    dragZoom = {
      dragging: false,
      down: true,
      x0: e.pageX,
      y0: e.pageY,
    };
  }

  const handleMouseMove = (e) => {
    if (!dragZoom.down) {
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
       dragging: true,
      x1: e.pageX,
      y1: e.pageY,
    };

    ctx.strokeStyle = "rgb(0, 0, 0, 0.9)";
    ctx.lineWidth = 1;
    ctx.strokeRect(
      dragZoom.x0,
      dragZoom.y0,
      dragZoom.x1 - dragZoom.x0,
      dragZoom.y1 - dragZoom.y0,
    );
  }

  const handleMouseUp = (e) => {
    if (!dragZoom.dragging) {
      dragZoom = {
        dragging: false,
        down: false,
      }
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
      down: false,
    };

    const ctx = interactionRef.current.getContext("2d");
    ctx.clearRect(
      0,
      0,
      interactionRef.current.width,
      interactionRef.current.height,
    );

    renderMandelbrot();
  }


  return (
    <canvas
      id="interaction"
      className="fullscreen-overlay"
      ref={interactionRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default memo(InteractionLayer);
