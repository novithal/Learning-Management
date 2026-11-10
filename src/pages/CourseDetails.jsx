import { Link, useNavigate, useParams } from "react-router-dom";
import { useLMS } from "../context/LMSContext";
import LessonItem from "../components/LessonItem";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    courses,
    isEnrolled,
    enrollCourse,
    getProgress,
    completedLessons,
  } = useLMS();

  const course = courses.find(
    (item) => item.id === Number(id)
  );

  if (!course) {
    return (
      <div className="empty-state">
        <h2>Course not found</h2>
        <Link to="/catalogue">Back to Catalogue</Link>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const lessons = course.lessonList || [];
  const progress = getProgress(course);

  const handleEnroll = () => {
    enrollCourse(course.id);

    if (lessons.length) {
      navigate(`/courses/${course.id}/lesson/${lessons[0].id}`);
    }
  };

  return (
    <div className="page-content">
      <Link to="/catalogue" className="back-link">
        ← Back to Courses
      </Link>

      <div className="details-layout">
        <main>
          <img
            className="details-image"
            src={
              course.image ||
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
            }
            alt={course.title}
          />

          <span className="eyebrow">{course.category}</span>
          <h1>{course.title}</h1>

          <p className="details-description">
            {course.description}
          </p>

          <div className="details-meta">
            <span>★ {course.rating || "New"} Rating</span>
            <span>♙ {course.instructor}</span>
            <span>◷ {course.duration}</span>
            <span>▤ {lessons.length} Lessons</span>
          </div>

          <section className="content-section">
            <h2>About This Course</h2>
            <p>{course.description}</p>

            <h3>What You Will Learn</h3>

            {lessons.length ? (
              <ul className="learning-list">
                {lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <span>✓</span>
                    {lesson.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted-text">
                Course lessons will be added soon.
              </p>
            )}
          </section>

          <section className="content-section">
            <h2>Course Curriculum</h2>

            <div className="lesson-list">
              {lessons.map((lesson, index) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  courseId={course.id}
                  completed={completedLessons.includes(
                    Number(lesson.id)
                  )}
                  locked={!enrolled}
                />
              ))}

              {!lessons.length && (
                <p className="muted-text">
                  No lessons available yet.
                </p>
              )}
            </div>
          </section>

          <section className="content-section">
            <h2>Course Assessment</h2>
            <p>
              {course.quiz?.length || 0} quiz questions available.
            </p>

            {enrolled && course.quiz?.length > 0 && (
              <Link
                to={`/courses/${course.id}/quiz`}
                className="btn btn-outline"
              >
                Open Course Quiz
              </Link>
            )}
          </section>
        </main>

        <aside className="enroll-card">
          <div className="enroll-price">FREE</div>

          <h3>Course Information</h3>

          <div className="enroll-info">
            <p>
              <span>Level</span>
              <strong>{course.level}</strong>
            </p>

            <p>
              <span>Duration</span>
              <strong>{course.duration}</strong>
            </p>

            <p>
              <span>Lessons</span>
              <strong>{lessons.length}</strong>
            </p>

            <p>
              <span>Instructor</span>
              <strong>{course.instructor}</strong>
            </p>
          </div>

          {enrolled ? (
            <>
              <p className="enrolled-label">
                ✓ You are enrolled
              </p>

              <p className="progress-label">
                Course progress: {progress}%
              </p>

              {lessons.length > 0 ? (
                <Link
                  to={`/courses/${course.id}/lesson/${lessons[0].id}`}
                  className="btn btn-primary full-width"
                >
                  Continue Learning
                </Link>
              ) : (
                <p className="muted-text">
                  Lessons will be available soon.
                </p>
              )}
            </>
          ) : (
            <button
              onClick={handleEnroll}
              className="btn btn-primary full-width"
            >
              Enroll Now
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}