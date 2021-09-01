import "InfoLayer.scss"
import { xy2cpx, depth } from "math";

const InfoLayer = ({ wind0w, action, status }) => {
  const { x0, y0, x1, y1 } = wind0w;
  const dp = depth(x0, y0, x1, y1);

  return (
    <div id="info-layer" className="fullscreen-overlay">
      <div className="coordinates">
        <span>{xy2cpx(x0, y0)} to {xy2cpx(x1, y1)} (depth 10</span>
        <span className="depth">{dp}</span>
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
