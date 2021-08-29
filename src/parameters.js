import { rescale } from "math";
import { palettes } from "mandelbrot";
import { update } from "query";

const parameters = ({ wind0w, palette, iterations }) => ({
  wind0w: wind0w || { x0: -2.5, y0: 1.5, x1: 1, y1: -1.5 },
  iterations: iterations || 250,
  workers: 5,
  stack: [],
  palette: palette || 0,

  updateSearch() {
    update({
      wind0w: this.wind0w,
      palette: this.palette,
      iterations: this.iterations,
    });
  },

  zoomInto: function(width, height, wx0, hy0, wx1, hy1) {
    this.stack.push(this.wind0w);

    let x0 = rescale(wx0, 0, width, this.wind0w.x0, this.wind0w.x1);
    let y0 = rescale(hy0, 0, height, this.wind0w.y0, this.wind0w.y1);
    let x1 = rescale(wx1, 0, width, this.wind0w.x0, this.wind0w.x1);
    let y1 = rescale(hy1, 0, height, this.wind0w.y0, this.wind0w.y1);

    this.wind0w = {
      x0: x0,
      y0: y0,
      x1: x1,
      y1: y1,
    }

    this.updateSearch();
  },

  pan(ux, uy) {
    this.stack.push(this.wind0w);

    const panFactor = 10;
    const dx = ux * Math.abs(this.wind0w.x1 - this.wind0w.x0) / panFactor;
    const dy = uy * Math.abs(this.wind0w.y1 - this.wind0w.y0) / panFactor;

    this.wind0w = {
      x0: this.wind0w.x0 + dx,
      y0: this.wind0w.y0 + dy,
      x1: this.wind0w.x1 + dx,
      y1: this.wind0w.y1 + dy,
    }

    this.updateSearch();
  },

  undo: function() {
    if (this.stack.length > 0) {
      this.wind0w = this.stack.pop();
    }

    this.updateSearch();
  },

  zoom: function(ux, uy) {
    this.stack.push(this.wind0w);

    const zoomFactor = 10;
    const dx = ux * Math.abs(this.wind0w.x1 - this.wind0w.x0) / zoomFactor;
    const dy = uy * Math.abs(this.wind0w.y1 - this.wind0w.y0) / zoomFactor;

    this.wind0w = {
      x0: this.wind0w.x0 + dx,
      y0: this.wind0w.y0 - dy,
      x1: this.wind0w.x1 - dx,
      y1: this.wind0w.y1 + dy,
    }

    this.updateSearch();
  },

  reset: function() {
    this.stack.push(this.wind0w);

    this.wind0w = { x0: -2.5, y0: 1.5, x1: 1, y1: -1.5 };
    this.iterations = 255;
    this.workers = 5;

    this.updateSearch();
  },

  changeIterations: function(i) {
    if (this.iterations + i >= 0) {
      this.iterations += i;
    }

    this.updateSearch();
  },

  changeWorkers: function(i) {
    if (this.workers + i > 0) {
      this.workers += i;
    }
  },

  recolor: function(i) {
    this.palette += i;

    if (this.palette < 0) {
      this.palette = palettes.length - 1;
    } else if (this.palette >= palettes.length) {
      this.palette = 0;
    }

    this.updateSearch();
  },
});


export { parameters };
