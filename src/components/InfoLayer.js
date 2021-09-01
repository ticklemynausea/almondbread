import "InfoLayer.scss"
import { xy2cpx } from "math";

const InfoLayer = ({ wind0w, action, status }) => {
  const { x0, y0, x1, y1 } = wind0w;
  const magx = Math.floor(Math.log10(Math.abs(x1 - x0)));
  const magy = Math.floor(Math.log10(Math.abs(y1 - y0)));
  const mag = magx > magy ? magx : magy;

  return (
    <div id="info-layer" className="fullscreen-overlay">
      <div className="coordinates">
        <span>{xy2cpx(x0, y0)} to {xy2cpx(x1, y1)} (magnitude 10</span>
        <span className="magnitude">{mag}</span>
        <span>)</span>
      </div>
      <div className="action">
        <span>{action}</span>
      </div>
      <div className="status">
        <span>{status}</span>
      </div>
    </div>
  );
};

export default InfoLayer;
