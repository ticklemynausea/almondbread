import { rescale, depth } from "math";
import { palettes } from "colors";
import { update } from "query";

const defaultWind0w =  { x0: -2.85, y0: 1.5, x1: 1.35, y1: -1.5 };

const parameters = ({ wind0w, palette, coloringMethod, iterations }) => ({
  wind0w: wind0w || defaultWind0w,
  iterations: iterations || 250,
  workers: 5,
  palette: palette || 0,
  coloringMethod: coloringMethod || "lerp",
  stack: [],

  updateSearch() {
    update({
      wind0w: this.wind0w,
      palette: this.palette,
      iterations: this.iterations,
      coloringMethod: this.coloringMethod,
    });
  },

  zoomInto(width, height, wx0, hy0, wx1, hy1) {
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

  undo() {
    if (this.stack.length > 0) {
      this.wind0w = this.stack.pop();
    }

    this.updateSearch();
  },

  zoom(ux, uy) {
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

  refit(width, height) {
    this.stack.push(this.wind0w);

    const { x0, y0, x1, y1 } = this.wind0w;
    const cx =  (x0 + x1) / 2;
    const cy =  (y0 + y1) / 2;
    const dp = depth(x0, y0, x1, y1)

    const ratiox = width / height;
    const ratioy = height / width;

    const dx = ratiox * Math.pow(10, dp);
    const dy = ratioy * Math.pow(10, dp);

    const { xa, ya, xb, yb } = {
      xa: cx - dx,
      ya: cy - dy,
      xb: cx + dx,
      yb: cy + dy,
    };

    this.wind0w = {
      x0: xa < xb ? xa : xb,
      y0: ya > yb ? ya : yb,
      x1: xa > xb ? xa : xb,
      y1: ya < yb ? ya : yb,
    }

    this.updateSearch();
  },

  reset() {
    this.stack.push(this.wind0w);

    this.wind0w = { x0: -2.5, y0: 1.5, x1: 1, y1: -1.5 };
    this.iterations = 255;
    this.workers = 5;

    this.updateSearch();
  },

  changeIterations(i) {
    if (this.iterations + i > 0) {
      this.iterations += i;
    }

    this.updateSearch();
  },

  changeWorkers(i) {
    if (this.workers + i > 0) {
      this.workers += i;
    }
  },

  toggleColoringMethod() {
    const methods = ["lerp", "repeat"];
    this.coloringMethod = methods[(methods.indexOf(this.coloringMethod) + 1) % methods.length];

    this.updateSearch();
  },

  recolor(i) {
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
