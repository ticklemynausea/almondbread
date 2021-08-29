import "Help.scss";

const handleClick = (e) => {
  document.getElementById("help").style.display = "none";
};

const Help = () => (
  <div id="help" onClick={handleClick}>
    <div id="help-panel">
      <header>
        <h1>Almondbread: yet another mandelbrot explorer</h1>
        <h2>press H to hide/show this window</h2>
      </header>

      <h1>Mouse controls</h1>
      <dl>
        <dt>Selection</dt>
        <dd>Zooms in on the selected area</dd>
      </dl>

      <h1>Keyboard controls</h1>
      <dl>
        <dt>Arrows</dt>
        <dd>Pan around</dd>

        <dt>Q / W</dt>
        <dd>Zoom in/out</dd>

        <dt>A / S</dt>
        <dd>Max iterations increase/decrease</dd>

        <dt>Z / X</dt>
        <dd>Web workers increase/decrease</dd>

        <dt>E</dt>
        <dd>Undo last action</dd>

        <dt>R</dt>
        <dd>Reset to initial state</dd>

        <dt>D / F</dt>
        <dd>Horizontal scale increase/decrease</dd>

        <dt>C / V</dt>
        <dd>Vertical scale increase/decrease</dd>
      </dl>

      <footer>
        <span>mandelbrot is german for almond bread</span>
        <span>
          <a href="http://github.com/ticklemynausea/almondbread">github</a>
        </span>
        <span>
          <a href="http://mariocarneiro.info">mariocarneiro.info</a>
        </span>
      </footer>
    </div>
  </div>
);

export default Help;
