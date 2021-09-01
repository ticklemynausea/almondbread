import "HelpLayer.scss";

const README_URL = "https://github.com/ticklemynausea/almondbread/blob/master/README.md";
const BLOGPOST_URL = "https://mariocarneiro.info/2021/08/30/almondbread-another-mandelbrot-fractal-renderer.html";

const HelpLayer = ({ toggleHelp }) => (
  <div id="help-layer" className="help-overlay fullscreen-overlay" onClick={toggleHelp}>
    <div className="help-overlay__inside">
      <div className="help-overlay__inside__top">
        <h1 className="center">Almondbread</h1>
        <p>
          A mandelbrot fractal explorer, with pretty colors and nifty features.
          It is also a work in progress.
        </p>
        <p>
          Read more about it in the project's <a href={README_URL}>README</a>, and also <a href={BLOGPOST_URL}>this blog post</a>.
        </p>
      </div>

      <div className="help-overlay__inside__mid">
        <h2 className="center">Controls</h2>
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
      </div>

      <div className="help-overlay__inside__bottom">
        <ul className="center">
          <li>
            <a href="http://github.com/ticklemynausea/almondbread">source code</a>
          </li>
          <li>
            <a href="http://mariocarneiro.info/blog.html">tech blog</a>
          </li>
          <li>
            <a href="http://mariocarneiro.info">mariocarneiro.info</a>
        </li>
        </ul>
      </div>
    </div>
  </div>
);

export default HelpLayer;
