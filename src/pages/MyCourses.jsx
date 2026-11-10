import { useState } from "react";
import { useLMS } from "../context/LMSContext";
import CourseCard from "../components/CourseCard";

export default function MyCourses() {
  const { courses, enrolled, getProgress } = useLMS();
  const [filter, setFilter] = useState("All");

  const myCourses = courses.filter((course) =>
    enrolled.includes(course.id)
  );

  const filtered = myCourses.filter((course) => {
    const progress = getProgress(course);

    if (filter === "In Progress") {
      return progress > 0 && progress < 100;
    }

    if (filter === "Not Started") {
      return progress === 0;
    }

    if (filter === "Completed") {
      return progress === 100;
    }

    return true;
  });

  return (
    <div className="page-content">
      <div className="page-intro">
        <span className="eyebrow">YOUR PERSONAL LIBRARY</span>
        <h1>My Courses</h1>
        <p>Manage and track all your enrolled courses.</p>
      </div>

      <div className="filter-tabs">
        {["All", "Not Started", "In Progress", "Completed"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={filter === item ? "tab active-tab" : "tab"}
            >
              {item}
            </button>
          )
        )}
      </div>

      <div className="catalogue-heading">
        <h2>My Learning Library</h2>
        <span>{filtered.length} courses</span>
      </div>

      {filtered.length ? (
        <div className="course-grid">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>📖</span>
          <h3>No courses in this category</h3>
          <p>Enroll in a course or choose another filter.</p>
        </div>
      )}
    </div>
  );
}