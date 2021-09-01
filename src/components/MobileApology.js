import "MobileApology.css";

const MobileApology = () => (
  <div id="mobile-apology">
    <h1>Almondbread</h1>

    <h2>...is not usable on mobile devices. For now...</h2>

    <p>
      Almondbread was started as a quick exercise to render the Mandelbrot
      set with html5. I added mouse and keyboard controls for the features
      I wanted when I wanted them. This was not started as a serious project,
      so I dropped some fundamental practices like mobile-first design.
    </p>

    <p>
      Creating a mobile experience as functional as the desktop experience will
      be some work. I cannot just make something up and hope that it works well.
      I do plan on making it work well though. But until then I've decided to hide
      the whole app behind this screen.
    </p>

    <p>
      If you have the chance, please check this site out when you are at a computer.
      If you do not have access to computer, please accept my apologies. I will make
      it work work on your mobile device eventually.
    </p>

    <p>Thanks for checking this out.</p>

    <ul>
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
);

export default MobileApology;
