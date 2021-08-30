import { memo, useEffect } from "react";

const download = (wind0w) => {
  const { x0, y0, x1, y1 } = wind0w;
  const filename = `${x0}${y0 < 0 ? '-' : '+'}${Math.abs(y0)}i to ${x1}${y1 < 0 ? '-' : '+'}${Math.abs(y1)}i.png`

  const link = document.createElement('a');
  link.download = filename;
  link.href = document.getElementById('mandelbrot').toDataURL();
  link.click();
}

const InteractionLayer = ({
  interactionRef,
  parametersRef,
  mandelbrotRef,
  renderMandelbrot,
  toggleHelp,
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

    switch (event.code) {
      case "ArrowUp":
        parameters.pan(0, 1);
        break;

      case "ArrowDown":
        parameters.pan(0, -1);
        break;

      case "ArrowLeft":
        parameters.pan(-1, 0);
        break;

      case "ArrowRight":
        parameters.pan(1, 0);
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
        parameters.changeIterations(50);
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

      case "KeyT":
        parameters.recolor(-1);
        break;

      case "KeyY":
        parameters.recolor(1);
        break;

      case "KeyU":
        parameters.toggleColoringMethod();
        break;

      case "KeyH":
        toggleHelp();
        return;

      case "KeyG":
        download(parameters.wind0w);
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
