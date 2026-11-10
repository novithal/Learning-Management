import { Link, useParams } from "react-router-dom";
import { useLMS } from "../context/LMSContext";
import ProgressBar from "../components/ProgressBar";
import LessonItem from "../components/LessonItem";

export default function LessonViewer() {
  const { courseId, lessonId } = useParams();

  const {
    courses,
    isEnrolled,
    completedLessons,
    completeLesson,
    getProgress,
  } = useLMS();

  const course = courses.find(
    (item) => item.id === Number(courseId)
  );

  if (!course || !isEnrolled(courseId)) {
    return (
      <div className="empty-state">
        <h2>Course unavailable</h2>
        <Link to="/catalogue">Explore Courses</Link>
      </div>
    );
  }

  const lessons = course.lessonList || [];

  const index = lessons.findIndex(
    (lesson) => Number(lesson.id) === Number(lessonId)
  );

  if (index === -1) {
    return (
      <div className="empty-state">
        <h2>Lesson not found</h2>
        <Link to={`/courses/${course.id}`}>
          Back to Course
        </Link>
      </div>
    );
  }

  const currentLesson = lessons[index];
  const previous = lessons[index - 1];
  const next = lessons[index + 1];

  const completed = completedLessons.includes(
    Number(currentLesson.id)
  );

  const progress = getProgress(course);

  return (
    <div className="page-content lesson-page">
      <Link to={`/courses/${course.id}`} className="back-link">
        ← Back to Course
      </Link>

      <div className="lesson-layout">
        <main className="lesson-main">
          <div className="lesson-heading">
            <span className="eyebrow">{course.title}</span>
            <h1>{currentLesson.title}</h1>
            <p>
              Lesson {index + 1} of {lessons.length}
              {" · "}
              {currentLesson.duration}
            </p>
          </div>

          <div className="video-placeholder">
            <div className="play-circle">▶</div>
            <h3>Learning Session</h3>
            <p>{currentLesson.title}</p>
            <span>Lesson content</span>
          </div>

          <section className="lesson-content">
            <h2>Lesson Overview</h2>
            <p>{currentLesson.content}</p>

            <div className="lesson-completion">
              <div>
                <h3>Lesson Completion</h3>
                <p>
                  {completed
                    ? "You have completed this lesson."
                    : "Finish this lesson to update your progress."}
                </p>
              </div>

              <button
                className={
                  completed ? "btn btn-success" : "btn btn-primary"
                }
                disabled={completed}
                onClick={() => completeLesson(currentLesson.id)}
              >
                {completed ? "✓ Completed" : "Mark as Completed"}
              </button>
            </div>
          </section>

          <div className="lesson-navigation">
            {previous ? (
              <Link
                to={`/courses/${course.id}/lesson/${previous.id}`}
                className="btn btn-outline"
              >
                ← Previous Lesson
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                to={`/courses/${course.id}/lesson/${next.id}`}
                className="btn btn-primary"
              >
                Next Lesson →
              </Link>
            ) : (
              <Link
                to={`/courses/${course.id}/quiz`}
                className="btn btn-primary"
              >
                Take Quiz →
              </Link>
            )}
          </div>
        </main>

        <aside className="lesson-sidebar">
          <h3>Course Content</h3>

          <div className="progress-label">
            <span>Overall Progress</span>
            <strong>{progress}%</strong>
          </div>

          <ProgressBar progress={progress} />

          <div className="lesson-sidebar-list">
            {lessons.map((lesson, i) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                index={i}
                courseId={course.id}
                active={lesson.id === currentLesson.id}
                completed={completedLessons.includes(
                  Number(lesson.id)
                )}
              />
            ))}
          </div>

          <Link
            to={`/courses/${course.id}/quiz`}
            className="btn btn-primary full-width"
          >
            Start Course Quiz
          </Link>
        </aside>
      </div>
    </div>
  );
}