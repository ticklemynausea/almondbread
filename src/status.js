let timeout = null;
let timer = null;

const message = (str, wind0w) => {
  const { x0, y0, x1, y1 } = wind0w;
  const rnd = `rendering area ${x0}${y0 < 0 ? '-' : '+'}${Math.abs(y0)}i to ${x1}${y1 < 0 ? '-' : '+'}${Math.abs(y1)}i`;
  const msg =`${str} - ${rnd}`

  if (!timer) {
    timer = window.performance.now();
  }

  console.log(msg);
  addmsg(msg);
};

const clear = () => {
  clearTimeout(timeout);
  let result = window.performance.now() - timer;
  addmsg(`rendered in ${Math.round(result)}ms`);
  timer = null;

  timeout = setTimeout(() => {
    document.getElementById("status").replaceChildren([]);
    document.getElementById("status").style.display = "none";
  }, 4000);
}

const addmsg = (msg) => {
  document.getElementById("status").style.display = "table-cell";
  const p = document.createElement("p")
  p.innerText = msg;
  document.getElementById("status").append(p);
}

export { message, clear };