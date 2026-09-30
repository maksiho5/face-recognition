import * as faceapi from 'face-api.js';

const EMOTIONS = {
  angry: 'Злость',
  disgusted: 'Отвращение',
  fearful: 'Страх',
  happy: 'Радость',
  neutral: 'Нейтральное',
  sad: 'Грусть',
  surprised: 'Удивление',
};

const GENDERS = { male: 'Мужчина', female: 'Женщина' };

export function detectFaces(input) {
  return faceapi.detectAllFaces(input).withFaceLandmarks().withFaceExpressions().withAgeAndGender();
}

export function describeFace({ age, gender, expressions }) {
  const [emotion] = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0];
  return {
    age: Math.round(age),
    gender: GENDERS[gender] ?? gender,
    emotion: EMOTIONS[emotion] ?? emotion,
  };
}

export function drawFaces(canvas, size, detections) {
  faceapi.matchDimensions(canvas, size);
  const resized = faceapi.resizeResults(detections, size);
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  faceapi.draw.drawDetections(canvas, resized);
  faceapi.draw.drawFaceLandmarks(canvas, resized);
}
