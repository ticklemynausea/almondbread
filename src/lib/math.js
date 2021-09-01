const rescale = (x, in_min, in_max, out_min, out_max) => {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const xy2cpx = (x, y)  => `${x}${y < 0 ? '-' : '+'}${Math.abs(y)}i`

const depth = (x0, y0, x1, y1) => {
  const magx = Math.floor(Math.log10(Math.abs(x1 - x0)));
  const magy = Math.floor(Math.log10(Math.abs(y1 - y0)));

  return magx > magy ? magx : magy;
};

export { rescale, depth, xy2cpx };
