import qs from "qs";
import { mapValues } from "lodash";

const query = () => {
  const obj = qs.parse(atob(window.location.search.substring(1)));

  if (obj.wind0w) {
    obj.wind0w = mapValues(obj.wind0w, parseFloat);
  }

  if (obj.palette) {
    obj.palette = parseFloat(obj.palette);
  }

  if (obj.iterations) {
    obj.iterations = parseFloat(obj.iterations);
  }

  return obj;
}

const update = (parameters) => {
  const search = btoa(qs.stringify(parameters));
  window.history.pushState(null, null, `?${search}`);
}

export { query, update };
