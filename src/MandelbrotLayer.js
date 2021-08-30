import { useEffect } from "react";

const MandelbrotLayer = ({
  mandelbrotRef,
}) => {

  useEffect(() => {
    mandelbrotRef.current.width = mandelbrotRef.current.clientWidth;
    mandelbrotRef.current.height = mandelbrotRef.current.clientHeight;
  });

  return (
    <canvas
      id="mandelbrot"
      className="fullscreen-overlay"
      ref={mandelbrotRef}
    />
  );
}

export default MandelbrotLayer;
