import { expose } from "comlink";

import { rescale } from "math";
import { timing } from "timing";

const escapeTime = (x0, y0, iterations) => {
  let x = 0;
  let y = 0;
  let x2 = 0;
  let y2 = 0;
  let iteration = 0;

  while (x2 + y2 <= 4 && iteration < iterations) {
    y = 2 * x * y + y0;
    x = x2 - y2 + x0;
    x2 = x * x;
    y2 = y * y;
    iteration++;
  }

  return iteration;
}

const workerObj = {
  data: null,
  calculate: function(width, height, wind0w, partition, iterations) {
    timing("worker doing mandelmath", () => {
      this.data = new Array(partition.end - partition.start);

      for (let i = partition.start; i < partition.end; i++) {
        const xPixel = i % width;
        const yPixel = ~~(i / width);

        const rPart = rescale(xPixel, 0, width, wind0w.x0, wind0w.x1);
        const iPart = rescale(yPixel, 0, height, wind0w.y0, wind0w.y1);

        this.data[i - partition.start] = escapeTime(rPart, iPart, iterations);
      }
    });
  },
}

expose(workerObj);
