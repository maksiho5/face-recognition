export default function FaceInfo({ faces }) {
  if (!faces.length) return <p className="status">Лицо не найдено</p>;

  return (
    <ul className="faces">
      {faces.map((face, i) => (
        <li key={i} className="face-card">
          {faces.length > 1 && <span className="face-card__index">#{i + 1}</span>}
          <span>
            Эмоция: <b>{face.emotion}</b>
          </span>
          <span>
            Возраст: <b>~{face.age}</b>
          </span>
          <span>
            Пол: <b>{face.gender}</b>
          </span>
        </li>
      ))}
    </ul>
  );
}
