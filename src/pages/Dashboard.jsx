import { Link } from "react-router-dom";
import { useLMS } from "../context/LMSContext";
import CourseCard from "../components/CourseCard";

export default function Dashboard() {
  const {
    courses,
    enrolled,
    completedLessons,
    quizScores,
    getProgress
  } = useLMS();

  const myCourses = courses.filter((course) =>
    enrolled.includes(course.id)
  );

  const completedCourses = myCourses.filter(
    (course) => getProgress(course) === 100
  ).length;

  const averageProgress = myCourses.length
    ? Math.round(
        myCourses.reduce(
          (sum, course) => sum + getProgress(course),
          0
        ) / myCourses.length
      )
    : 0;

  return (
    <div className="page-content">
      <section className="welcome-banner">
        <div>
          <span className="eyebrow">YOUR LEARNING JOURNEY</span>
          <h1>Learn something new every day.</h1>
          <p>
            Keep growing your skills. Your next achievement
            starts with one lesson.
          </p>
          <Link to="/catalogue" className="btn banner-btn">
            Explore Courses →
          </Link>
        </div>

        <div className="banner-decoration">✦</div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">▤</div>
          <p>Enrolled Courses</p>
          <h2>{myCourses.length}</h2>
          <span>Courses in your library</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <p>Completed Courses</p>
          <h2>{completedCourses}</h2>
          <span>Successfully completed</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">◷</div>
          <p>Lessons Completed</p>
          <h2>{completedLessons.length}</h2>
          <span>Lessons finished</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">%</div>
          <p>Average Progress</p>
          <h2>{averageProgress}%</h2>
          <span>Across enrolled courses</span>
        </div>
      </section>

      <section className="section-header">
        <div>
          <h2>Continue Learning</h2>
          <p>Pick up where you left off.</p>
        </div>
        <Link to="/my-courses" className="text-link">
          View All →
        </Link>
      </section>

      {myCourses.length ? (
        <div className="course-grid">
          {myCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>📚</span>
          <h3>No courses enrolled yet</h3>
          <p>Explore our catalogue to start learning.</p>
          <Link to="/catalogue" className="btn btn-primary">
            Browse Courses
          </Link>
        </div>
      )}

      <section className="section-header">
        <div>
          <h2>Quiz Results</h2>
          <p>Your latest assessment scores.</p>
        </div>
      </section>

      <div className="results-list">
        {Object.keys(quizScores).length ? (
          Object.entries(quizScores).map(([id, result]) => {
            const course = courses.find(
              (item) => item.id === Number(id)
            );

            if (!course) return null;

            return (
              <div className="result-item" key={id}>
                <div>
                  <strong>{course.title}</strong>
                  <p>{new Date(result.date).toLocaleDateString()}</p>
                </div>
                <span className="result-score">
                  {result.score}/{result.total} ({result.percentage}%)
                </span>
              </div>
            );
          })
        ) : (
          <p className="muted-text">No quiz attempts yet.</p>
        )}
      </div>
    </div>
  );
}