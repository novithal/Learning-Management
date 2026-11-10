import { useMemo, useState } from "react";
import { useLMS } from "../context/LMSContext";

const emptyLesson = {
  title: "",
  duration: "20 min",
  content: "",
};

const emptyQuestion = {
  question: "",
  options: ["", "", "", ""],
  answer: 0,
};

const emptyForm = {
  title: "",
  category: "Development",
  instructor: "",
  level: "Beginner",
  duration: "5 Hours",
  rating: 4.5,
  image: "",
  description: "",
  lessonList: [],
  quiz: [],
};

export default function AdminCourses() {
  const {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
  } = useLMS();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      `${course.title} ${course.instructor} ${course.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [courses, search]);

  const openAddForm = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      lessonList: [],
      quiz: [],
    });
    setShowForm(true);
  };

  const openEditForm = (course) => {
    setEditingId(course.id);

    setForm({
      ...emptyForm,
      ...course,
      lessonList: course.lessonList || [],
      quiz: course.quiz || [],
    });

    setShowForm(true);
  };

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // LESSON EDITING

  const addLessonField = () => {
    updateField("lessonList", [
      ...form.lessonList,
      { ...emptyLesson },
    ]);
  };

  const updateLessonField = (index, field, value) => {
    const updated = [...form.lessonList];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    updateField("lessonList", updated);
  };

  const removeLessonField = (index) => {
    updateField(
      "lessonList",
      form.lessonList.filter((_, i) => i !== index)
    );
  };

  // QUIZ EDITING

  const addQuestionField = () => {
    updateField("quiz", [
      ...form.quiz,
      {
        ...emptyQuestion,
        options: [...emptyQuestion.options],
      },
    ]);
  };

  const updateQuestionField = (index, field, value) => {
    const updated = [...form.quiz];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    updateField("quiz", updated);
  };

  const updateOptionField = (questionIndex, optionIndex, value) => {
    const updated = [...form.quiz];
    const options = [...updated[questionIndex].options];

    options[optionIndex] = value;

    updated[questionIndex] = {
      ...updated[questionIndex],
      options,
    };

    updateField("quiz", updated);
  };

  const removeQuestionField = (index) => {
    updateField(
      "quiz",
      form.quiz.filter((_, i) => i !== index)
    );
  };

  // SAVE COURSE

  const handleSubmit = (e) => {
    e.preventDefault();

    const invalidLesson = form.lessonList.some(
      (lesson) =>
        !lesson.title.trim() || !lesson.content.trim()
    );

    if (invalidLesson) {
      alert("Please complete all lesson titles and contents.");
      return;
    }

    const invalidQuestion = form.quiz.some(
      (question) =>
        !question.question.trim() ||
        question.options.some((option) => !option.trim())
    );

    if (invalidQuestion) {
      alert("Please complete all quiz questions and options.");
      return;
    }

    const courseData = {
      ...form,
      rating: Number(form.rating),
      lessons: form.lessonList.length,
      lessonList: form.lessonList,
      quiz: form.quiz,
    };

    if (editingId !== null) {
      updateCourse(editingId, courseData);
    } else {
      addCourse(courseData);
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      deleteCourse(id);
    }
  };

  return (
    <div className="page-content">
      <div className="page-intro admin-intro">
        <div>
          <span className="eyebrow">ADMINISTRATION</span>
          <h1>Course Management</h1>
          <p>Manage courses, lessons and assessments.</p>
        </div>

        <button className="btn btn-primary" onClick={openAddForm}>
          + Add New Course
        </button>
      </div>

      <div className="stats-grid admin-stats">
        <div className="stat-card">
          <div className="stat-icon purple">▤</div>
          <p>Total Courses</p>
          <h2>{courses.length}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">▦</div>
          <p>Total Lessons</p>
          <h2>
            {courses.reduce(
              (total, course) =>
                total + (course.lessonList?.length || 0),
              0
            )}
          </h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">?</div>
          <p>Quiz Questions</p>
          <h2>
            {courses.reduce(
              (total, course) =>
                total + (course.quiz?.length || 0),
              0
            )}
          </h2>
        </div>
      </div>

      <div className="admin-table-card">
        <div className="table-toolbar">
          <h2>All Courses</h2>

          <input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Category</th>
                <th>Instructor</th>
                <th>Lessons</th>
                <th>Quiz</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <div className="table-course">
                      <img src={course.image} alt="" />
                      <strong>{course.title}</strong>
                    </div>
                  </td>

                  <td>{course.category}</td>
                  <td>{course.instructor}</td>
                  <td>{course.lessonList?.length || 0}</td>
                  <td>{course.quiz?.length || 0}</td>

                  <td>
                    <div className="table-actions">
                      <button
                        className="edit-btn"
                        onClick={() => openEditForm(course)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(course.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!filteredCourses.length && (
                <tr>
                  <td colSpan="6" className="table-empty">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div
          className="modal-backdrop"
          onClick={() => setShowForm(false)}
        >
          <div
            className="course-modal admin-course-editor"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>
                  {editingId ? "Edit Course" : "Create New Course"}
                </h2>
                <p>Add course details, lessons and quiz questions.</p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <h3 className="editor-section-title">Course Information</h3>

              <label>Course Title *</label>
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
              />

              <label>Category</label>
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
              >
                <option>Development</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Business</option>
                <option>Data Science</option>
              </select>

              <label>Instructor *</label>
              <input
                value={form.instructor}
                onChange={(e) => updateField("instructor", e.target.value)}
                required
              />

              <label>Level</label>
              <select
                value={form.level}
                onChange={(e) => updateField("level", e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              <label>Duration</label>
              <input
                value={form.duration}
                onChange={(e) => updateField("duration", e.target.value)}
                required
              />

              <label>Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={(e) => updateField("rating", e.target.value)}
              />

              <label>Image URL</label>
              <input
                value={form.image}
                onChange={(e) => updateField("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />

              <label>Description *</label>
              <textarea
                rows="4"
                value={form.description}
                onChange={(e) =>
                  updateField("description", e.target.value)
                }
                required
              />

              <div className="editor-divider" />

              <div className="editor-heading-row">
                <div>
                  <h3 className="editor-section-title">Course Lessons</h3>
                  <p>Add the learning content for this course.</p>
                </div>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={addLessonField}
                >
                  + Add Lesson
                </button>
              </div>

              {form.lessonList.map((lesson, index) => (
                <div className="editor-item-card" key={lesson.id || index}>
                  <div className="editor-item-heading">
                    <strong>Lesson {index + 1}</strong>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => removeLessonField(index)}
                    >
                      Remove
                    </button>
                  </div>

                  <label>Lesson Title *</label>
                  <input
                    value={lesson.title}
                    onChange={(e) =>
                      updateLessonField(index, "title", e.target.value)
                    }
                    required
                  />

                  <label>Duration</label>
                  <input
                    value={lesson.duration}
                    onChange={(e) =>
                      updateLessonField(index, "duration", e.target.value)
                    }
                    placeholder="20 min"
                  />

                  <label>Lesson Content *</label>
                  <textarea
                    rows="3"
                    value={lesson.content}
                    onChange={(e) =>
                      updateLessonField(index, "content", e.target.value)
                    }
                    required
                  />
                </div>
              ))}

              {!form.lessonList.length && (
                <p className="editor-empty">
                  No lessons added. Click Add Lesson to create one.
                </p>
              )}

              <div className="editor-divider" />

              <div className="editor-heading-row">
                <div>
                  <h3 className="editor-section-title">Course Quiz</h3>
                  <p>Create multiple-choice assessment questions.</p>
                </div>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={addQuestionField}
                >
                  + Add Question
                </button>
              </div>

              {form.quiz.map((question, index) => (
                <div className="editor-item-card" key={index}>
                  <div className="editor-item-heading">
                    <strong>Question {index + 1}</strong>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => removeQuestionField(index)}
                    >
                      Remove
                    </button>
                  </div>

                  <label>Question *</label>
                  <textarea
                    rows="2"
                    value={question.question}
                    onChange={(e) =>
                      updateQuestionField(
                        index,
                        "question",
                        e.target.value
                      )
                    }
                    required
                  />

                  <label>Answer Options *</label>

                  {question.options.map((option, optionIndex) => (
                    <div className="quiz-option-editor" key={optionIndex}>
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={Number(question.answer) === optionIndex}
                        onChange={() =>
                          updateQuestionField(index, "answer", optionIndex)
                        }
                        title="Mark as correct answer"
                      />

                      <input
                        value={option}
                        placeholder={`Option ${optionIndex + 1}`}
                        onChange={(e) =>
                          updateOptionField(
                            index,
                            optionIndex,
                            e.target.value
                          )
                        }
                        required
                      />

                      <span>
                        {Number(question.answer) === optionIndex
                          ? "Correct answer"
                          : ""}
                      </span>
                    </div>
                  ))}

                  <p className="editor-hint">
                    Select the radio button beside the correct option.
                  </p>
                </div>
              ))}

              {!form.quiz.length && (
                <p className="editor-empty">
                  No quiz questions added.
                </p>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  {editingId ? "Save Course Changes" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}