import { wrap } from "comlink";

import Worker from "mandelbrot.worker.js";
import { timing, timingAsync } from "timing";

const palette = [
  [66,  30,  15],
  [25,  7,  26],
  [9,   1,  47],
  [4,   4,  73],
  [0,   7, 100],
  [12,  44, 138],
  [24,  82, 177],
  [57,  125, 209],
  [134, 181, 229],
  [211, 236, 248],
  [241, 233, 191],
  [248, 201,  95],
  [255, 170,   0],
  [204, 128,   0],
  [153,  87,   0],
  [106,  52,   3],
];

const colorMap = (iterations, palette) => Array.from({ length: iterations + 1 }, (_, iteration) => {
  if (iteration === iterations) {
    return [0, 0, 0];
  }

  return palette[iteration % palette.length];
});

const parallelize = async (width, height, wind0w, workers, iterations) => {
  const imageLength = width * height;
  const sliceSize = Math.floor(imageLength / workers);
  const sliceRemainder = imageLength % workers;
  const partitions = Array.from({ length: workers }, (_, s) => {
    // the last partition handles the remaining pixels
    if (s + 1 === workers) {
      return [s*sliceSize, (s+1)*sliceSize + sliceRemainder];
    }

    return [s*sliceSize, (s+1)*sliceSize];
  });

  const results = await Promise.all(partitions.map(async ([start, end]) => {
    const workerObj = wrap(new Worker());

    await workerObj.calculate(
      width,
      height,
      wind0w,
      { start, end },
      iterations,
    );

    return await workerObj.data;
  }));

  return results;
}

const assemble = (parts, colors) => {
  const length = parts.reduce((a, part) => a + part.length, 0) * 4;
  const data = new Uint8ClampedArray(length);

  for (let j = 0; j < parts.length; j++) {
    for (let i = 0; i < parts[j].length; i++) {
      const escaped = parts[j][i];
      const val = colors[escaped];
      const idx = j * parts[0].length + i;

      data[idx*4 + 0] = val[0];
      data[idx*4 + 1] = val[1];
      data[idx*4 + 2] = val[2];
      data[idx*4 + 3] = 255;
    }
  }

  return data;
}

const imageData = async (width, height, wind0w, workers, iterations) => {
  const tag = `calculating ${width}x${height} values
top left ${wind0w.x0}+${wind0w.y0}i
bottom right ${wind0w.x1}+${wind0w.y1}i
with ${workers} workers up to ${iterations} iterations`;

  const parts = await timingAsync(tag, () => parallelize(width, height, wind0w, workers, iterations));
  const colors = colorMap(iterations, palette);
  const data = timing(`assembling ${parts.length} parts`, () => assemble(parts, colors));
  const imageData = new ImageData(data, width, height);

  return imageData;
}

const render = async (canvas, parameters) => {
  let data = await imageData(
    canvas.width,
    canvas.height,
    parameters.wind0w,
    parameters.workers,
    parameters.iterations,
  );

  let ctx = canvas.getContext("2d");

  ctx.putImageData(data, 0, 0);
}

export { render };
