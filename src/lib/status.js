let timeout = null;

const message = (msg) => {
  clearTimeout(timeout);

  addmsg(msg);

  timeout = setTimeout(() => {
    document.getElementById("status-layer").replaceChildren([]);
    document.getElementById("status-layer").style.display = "none";
  }, 4000);
};

const addmsg = (msg) => {
  console.log(msg);
  document.getElementById("status-layer").style.display = "table-cell";
  const p = document.createElement("p")
  p.innerText = msg;
  document.getElementById("status-layer").append(p);
}

export { message };
