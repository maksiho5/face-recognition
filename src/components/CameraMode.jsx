import { useEffect, useRef, useState } from 'react';
import FaceInfo from './FaceInfo';
import { describeFace, detectFaces, drawFaces } from '../lib/faces';

const DETECT_INTERVAL_MS = 700;

export default function CameraMode() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const [active, setActive] = useState(false);
  const [faces, setFaces] = useState([]);
  const [error, setError] = useState(null);

  const stop = () => {
    clearInterval(timerRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setActive(false);
    setFaces([]);
  };

  useEffect(() => stop, []);

  const detect = async () => {
    const video = videoRef.current;
    if (!video?.videoWidth) return;

    const detections = await detectFaces(video);
    const size = { width: video.videoWidth, height: video.videoHeight };
    drawFaces(canvasRef.current, size, detections);
    setFaces(detections.map(describeFace));
  };

  const start = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setActive(true);
      timerRef.current = setInterval(detect, DETECT_INTERVAL_MS);
    } catch {
      setError('Нет доступа к камере');
    }
  };

  return (
    <section className="panel">
      <div className="viewport">
        <video ref={videoRef} autoPlay muted playsInline />
        <canvas ref={canvasRef} />
        {active ? null : <div className="viewport__placeholder">Камера выключена</div>}
      </div>

      {active ? (
        <button className="button button--danger" onClick={stop}>
          Выключить камеру
        </button>
      ) : (
        <button className="button" onClick={start}>
          Включить камеру
        </button>
      )}

      {error && <p className="status status--error">{error}</p>}
      {active && <FaceInfo faces={faces} />}
    </section>
  );
}
