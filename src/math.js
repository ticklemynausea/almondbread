const rescale = (x, in_min, in_max, out_min, out_max) => {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const xy2cpx = (x, y)  => `${x}${y < 0 ? '-' : '+'}${Math.abs(y)}i`

export { rescale, xy2cpx };
