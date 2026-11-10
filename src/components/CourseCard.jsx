import { Link } from "react-router-dom";
import { useLMS } from "../context/LMSContext";
import ProgressBar from "./ProgressBar";

export default function CourseCard({ course }) {
  const { isEnrolled, getProgress } = useLMS();

  const enrolled = isEnrolled(course.id);
  const progress = getProgress(course);
  const lessons = course.lessonList || [];

  return (
    <article className="course-card">
      <Link
        to={`/courses/${course.id}`}
        className="course-image"
      >
        <img src={course.image} alt={course.title} />
        <span className="image-category">{course.category}</span>
      </Link>

      <div className="course-card-body">
        <div className="course-meta">
          <span>{course.level}</span>
          <span>★ {course.rating}</span>
        </div>

        <h3>{course.title}</h3>

        <p className="instructor">
          By {course.instructor}
        </p>

        <div className="course-info">
          <span>◷ {course.duration}</span>
          <span>▤ {lessons.length} Lessons</span>
        </div>

        {enrolled && (
          <div className="card-progress">
            <div className="progress-label">
              <span>Your progress</span>
              <strong>{progress}%</strong>
            </div>

            <ProgressBar progress={progress} />
          </div>
        )}

        <Link
          to={`/courses/${course.id}`}
          className="btn btn-primary course-action"
        >
          {enrolled ? "Continue Learning" : "View Course"}
        </Link>
      </div>
    </article>
  );
}