import "HelpLayer.scss";

const HelpLayer = ({ toggleHelp }) => (
  <div id="help" className="help-overlay fullscreen-overlay" onClick={toggleHelp}>
    <div className="help-overlay__inside">
      <div className="help-overlay__inside__top">
        <h1>Almondbread</h1>
        <p>Yet another mandelbrot fractal explorer, with pretty colors and nifty features.</p>
        <p>No touch controls available yet, a computer with keyboard and mouse is needed for now.</p>
      </div>


      <h1>Controls</h1>
      <div className="help-overlay__inside__mid-left">
        <dl>
          <dt>Arrows</dt>
          <dd>Pan around</dd>

          <dt>Q / W</dt>
          <dd>Zoom in/out</dd>

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
        <dl>
          <dt>Selection</dt>
          <dd>Zoom on selected area</dd>

          <dt>A / S</dt>
          <dd>Max iterations - / +</dd>

          <dt>Z / X</dt>
          <dd>Web workers - / +</dd>

          <dt>E</dt>
          <dd>Undo last action</dd>

          <dt>R</dt>
          <dd>Reset to initial state</dd>

          <dt>F</dt>
          <dd>Download image</dd>
        </dl>
      </div>

      <p className="center">Press <span className="key">H</span> to toggle this overlay</p>

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

export default HelpLayer;
