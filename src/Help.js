import "Help.scss";

const handleClick = (e) => {
  document.getElementById("help").style.display = "none";
  document.getElementById("interaction").focus();
};

const Help = () => (
  <div id="help" className="help-overlay fullscreen-overlay" onClick={handleClick}>
    <div className="help-overlay__inside">
      <div className="help-overlay__inside__top">
        <h1>Almondbread</h1>
        <p>Yet another mandelbrot fractal explorer.</p>
      </div>


      <div className="help-overlay__inside__mid-left">
        <h1>Keyboard controls</h1>
        <dl>
          <dt>Arrows</dt>
          <dd>Pan around</dd>

          <dt>Q / W</dt>
          <dd>Zoom in/out</dd>

          <dt>A / S</dt>
          <dd>Max iterations - / +</dd>

          <dt>Z / X</dt>
          <dd>Web workers - / +</dd>

          <dt>E</dt>
          <dd>Undo last action</dd>

          <dt>R</dt>
          <dd>Reset to initial state</dd>

          <dt>D / F</dt>
          <dd>Horizontal scale - / +</dd>

          <dt>C / V</dt>
          <dd>Vertical scale - / +</dd>

          <dt>T / Y</dt>
          <dd>Palette selection</dd>

          <dt>U</dt>
          <dd>Toggle coloring method</dd>
        </dl>
      </div>

      <div className="help-overlay__inside__mid-right">
        <h1>Mouse controls</h1>
        <dl>
          <dt>Selection</dt>
          <dd>Zoom on selected area</dd>
        </dl>
      </div>

      <p>Press <span className="key">H</span> to toggle this overlay</p>

      <div className="help-overlay__inside__bottom">
        <span>
          <a href="http://github.com/ticklemynausea/almondbread">source code</a>
        </span>
        <span>
          <a href="http://mariocarneiro.info">mariocarneiro.info</a>
        </span>
        <span>
          mandelbrot is german for almond bread
        </span>
      </div>
    </div>
  </div>
);

export default Help;
