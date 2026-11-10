import { useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import { useLMS } from "../context/LMSContext";

export default function Catalogue() {
  const { courses } = useLMS();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = [
    "All",
    ...new Set(courses.map((course) => course.category))
  ];

  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || course.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "duration") {
      result.sort(
        (a, b) => parseInt(a.duration) - parseInt(b.duration)
      );
    }

    return result;
  }, [courses, search, category, sort]);

  return (
    <div className="page-content">
      <div className="page-intro">
        <span className="eyebrow">DISCOVER YOUR POTENTIAL</span>
        <h1>Explore Courses</h1>
        <p>
          Find the right course and develop skills for your future.
        </p>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <span>⌕</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses or instructors..."
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By: Default</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Course Name</option>
          <option value="duration">Duration</option>
        </select>
      </div>

      <div className="catalogue-heading">
        <h2>Available Courses</h2>
        <span>{filteredCourses.length} courses found</span>
      </div>

      {filteredCourses.length ? (
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>🔍</span>
          <h3>No courses found</h3>
          <p>Try another search or category.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSort("default");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}