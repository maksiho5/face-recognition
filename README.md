# Face AI

Веб-приложение, которое находит лица на видео с камеры или на фото и определяет эмоцию, примерный возраст и пол. Нейросети работают прямо в браузере: фото и видео никуда не отправляются.

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![TensorFlow.js](https://img.shields.io/badge/face--api.js-FF6F00?logo=tensorflow&logoColor=white)

## Возможности

- **Камера**: распознавание в реальном времени, рамка и 68 точек лица поверх видео
- **Фото**: загрузка снимка и анализ всех лиц на нём
- Эмоция (7 классов), возраст и пол для каждого найденного лица
- Модели загружаются один раз и переиспользуются между режимами

## Как это работает

```mermaid
flowchart LR
    Src[Камера / фото] --> Detect[SSD MobileNet v1<br/>поиск лиц]
    Detect --> Landmarks[Face Landmark 68<br/>ключевые точки]
    Landmarks --> Expr[Face Expression<br/>эмоция]
    Landmarks --> AgeGender[Age & Gender<br/>возраст и пол]
    Expr --> UI[Карточки + рисунок на canvas]
    AgeGender --> UI
```

## Карта проекта

```
face-recognition/
├── public/models/            # Веса нейросетей face-api.js
└── src/
    ├── App.jsx               # Переключение режимов, статус загрузки моделей
    ├── hooks/
    │   └── useFaceModels.js  # Однократная загрузка моделей
    ├── lib/
    │   └── faces.js          # Детекция, перевод результатов, отрисовка на canvas
    └── components/
        ├── CameraMode.jsx    # Видео с веб-камеры, анализ каждые 700 мс
        ├── PhotoMode.jsx     # Загрузка и анализ фото
        └── FaceInfo.jsx      # Карточки с результатами
```

## Запуск

```bash
npm install
npm run dev
```

Камера работает только на `localhost` или по HTTPS.
