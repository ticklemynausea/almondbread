import { memo, useEffect } from "react";

import { render } from "mandelbrot";
import { parameters } from "parameters";
import { query } from "query";

import "MandelbrotLayer.scss";

const MandelbrotLayer = ({
  mandelbrotRef,
  parametersRef,
}) => {
  const renderMandelbrot = () => render(mandelbrotRef.current, parametersRef.current);

  useEffect(() => {
    mandelbrotRef.current.width = mandelbrotRef.current.clientWidth;
    mandelbrotRef.current.height = mandelbrotRef.current.clientHeight;

    if (parametersRef.current == null) {
      parametersRef.current = parameters(query());
    }

    renderMandelbrot();
  });

  return (
    <div id="mandelbrot-layer" className="fullscreen-overlay">
      <canvas
        id="mandelbrot"
        ref={mandelbrotRef}
      />
    </div>
  );
}

export default memo(MandelbrotLayer);
