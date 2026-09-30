import { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const MODELS_URL = `${import.meta.env.BASE_URL}models`;

let loading = null;

function loadModels() {
  loading ??= Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(MODELS_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_URL),
    faceapi.nets.ageGenderNet.loadFromUri(MODELS_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODELS_URL),
  ]);
  return loading;
}

export function useFaceModels() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadModels()
      .then(() => setReady(true))
      .catch((err) => setError(err.message));
  }, []);

  return { ready, error };
}
