import { Link } from "react-router-dom";

export default function LessonItem({
  lesson,
  index,
  courseId,
  active = false,
  completed = false,
  locked = false,
}) {
  return (
    <div className={`lesson-row ${active ? "active-lesson-row" : ""}`}>
      <span className="lesson-number">
        {completed ? "✓" : String(index + 1).padStart(2, "0")}
      </span>

      <div className="lesson-item-info">
        <strong>{lesson.title}</strong>
        <p>{lesson.duration || "20 min"}</p>
      </div>

      {locked ? (
        <span className="muted-text">Locked</span>
      ) : (
        <Link
          to={`/courses/${courseId}/lesson/${lesson.id}`}
          className="text-link"
        >
          {completed ? "Review" : "Open"} →
        </Link>
      )}
    </div>
  );
}