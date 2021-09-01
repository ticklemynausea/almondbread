import { xy2cpx } from "math";

const download = (filename) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = document.getElementById('mandelbrot').toDataURL();
  link.click();
}

const filename = ({ x0, y0, x1, y1 }) =>
  `${xy2cpx(x0, y0)}_to_${xy2cpx(x1, y1)}.png`;

export { download, filename };
