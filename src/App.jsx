import { useState } from 'react';
import CameraMode from './components/CameraMode';
import PhotoMode from './components/PhotoMode';
import { useFaceModels } from './hooks/useFaceModels';
import './App.css';

export default function App() {
  const [mode, setMode] = useState('camera');
  const { ready, error } = useFaceModels();

  return (
    <div className="app">
      <header className="app__header">
        <h1>Face AI</h1>
        <p>Распознавание лица, эмоций, возраста и пола прямо в браузере</p>
      </header>

      <nav className="tabs">
        <button className={mode === 'camera' ? 'active' : ''} onClick={() => setMode('camera')}>
          Камера
        </button>
        <button className={mode === 'photo' ? 'active' : ''} onClick={() => setMode('photo')}>
          Фото
        </button>
      </nav>

      {error && <p className="status status--error">Не удалось загрузить модели: {error}</p>}
      {!ready && !error && <p className="status">Загружаю нейросети…</p>}
      {ready && (mode === 'camera' ? <CameraMode /> : <PhotoMode />)}
    </div>
  );
}
