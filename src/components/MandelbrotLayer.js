import { memo, useEffect } from "react";

import { render } from "mandelbrot";
import { parameters } from "parameters";
import { query } from "query";

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
    <canvas
      id="mandelbrot"
      className="fullscreen-overlay"
      ref={mandelbrotRef}
    />
  );
}

export default memo(MandelbrotLayer);