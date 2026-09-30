import { useRef, useState } from 'react';
import FaceInfo from './FaceInfo';
import { describeFace, detectFaces, drawFaces } from '../lib/faces';

export default function PhotoMode() {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [faces, setFaces] = useState(null);
  const [busy, setBusy] = useState(false);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (src) URL.revokeObjectURL(src);
    setFaces(null);
    setSrc(URL.createObjectURL(file));
  };

  const analyze = async () => {
    const img = imageRef.current;
    setBusy(true);
    const detections = await detectFaces(img);
    drawFaces(canvasRef.current, { width: img.width, height: img.height }, detections);
    setFaces(detections.map(describeFace));
    setBusy(false);
  };

  return (
    <section className="panel">
      <label className="button button--ghost">
        Выбрать фото
        <input type="file" accept="image/*" hidden onChange={onFile} />
      </label>

      {src && (
        <div className="viewport viewport--photo">
          <img ref={imageRef} src={src} alt="Загруженное фото" onLoad={analyze} />
          <canvas ref={canvasRef} />
        </div>
      )}

      {busy && <p className="status">Анализирую…</p>}
      {faces && !busy && <FaceInfo faces={faces} />}
    </section>
  );
}
