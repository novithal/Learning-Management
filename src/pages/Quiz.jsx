import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLMS } from "../context/LMSContext";

export default function Quiz() {
  const { courseId } = useParams();

  const {
    courses,
    isEnrolled,
    submitQuiz,
    quizScores,
  } = useLMS();

  const course = courses.find(
    (item) => item.id === Number(courseId)
  );

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!course || !isEnrolled(courseId)) {
    return (
      <div className="empty-state">
        <h2>Course unavailable</h2>
        <Link to="/catalogue">Explore Courses</Link>
      </div>
    );
  }

  const questions = course.quiz || [];

  if (!questions.length) {
    return (
      <div className="empty-state">
        <h2>No quiz questions available</h2>
        <p>Admin has not added quiz questions for this course.</p>
        <Link to={`/courses/${course.id}`}>Back to Course</Link>
      </div>
    );
  }

  const score = questions.reduce(
    (total, question, index) =>
      total + (
        Number(answers[index]) === Number(question.answer) ? 1 : 0
      ),
    0
  );

  const percentage = Math.round(
    (score / questions.length) * 100
  );

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    submitQuiz(course.id, score, questions.length);
    setSubmitted(true);
  };

  const previousResult = quizScores[course.id];

  if (submitted) {
    return (
      <div className="page-content">
        <div className="quiz-result">
          <div className="result-icon">
            {percentage >= 50 ? "🏆" : "📚"}
          </div>

          <span className="eyebrow">ASSESSMENT COMPLETED</span>

          <h1>
            {percentage >= 50
              ? "Congratulations!"
              : "Keep Practicing!"}
          </h1>

          <p>You have completed {course.title} assessment.</p>

          <div className="score-circle">
            <strong>{percentage}%</strong>
            <span>Your Score</span>
          </div>

          <div className="score-details">
            <div>
              <strong>{score}</strong>
              <span>Correct Answers</span>
            </div>

            <div>
              <strong>{questions.length - score}</strong>
              <span>Wrong Answers</span>
            </div>

            <div>
              <strong>{questions.length}</strong>
              <span>Total Questions</span>
            </div>
          </div>

          <span
            className={
              percentage >= 50
                ? "result-status pass"
                : "result-status fail"
            }
          >
            {percentage >= 50 ? "PASSED" : "NOT PASSED"}
          </span>

          <div className="result-actions">
            <button
              className="btn btn-outline"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
            >
              Retake Quiz
            </button>

            <Link
              to={`/courses/${course.id}`}
              className="btn btn-primary"
            >
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <Link
        to={`/courses/${course.id}`}
        className="back-link"
      >
        ← Back to Course
      </Link>

      <div className="quiz-container">
        <div className="quiz-header">
          <span className="eyebrow">COURSE ASSESSMENT</span>
          <h1>{course.title} Quiz</h1>
          <p>
            Answer all questions and submit to calculate your score.
          </p>

          <div className="quiz-progress">
            {Object.keys(answers).length} of {questions.length} answered
          </div>
        </div>

        {questions.map((question, index) => (
          <div className="question-card" key={index}>
            <div className="question-title">
              <span>Question {index + 1}</span>
              <span>{index + 1}/{questions.length}</span>
            </div>

            <h3>{question.question}</h3>

            <div className="answer-options">
              {question.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className={
                    Number(answers[index]) === optionIndex
                      ? "answer-option selected-answer"
                      : "answer-option"
                  }
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    checked={
                      Number(answers[index]) === optionIndex
                    }
                    onChange={() =>
                      setAnswers((previous) => ({
                        ...previous,
                        [index]: optionIndex,
                      }))
                    }
                  />

                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="quiz-footer">
          <span>
            {questions.length - Object.keys(answers).length}
            {" "}questions remaining
          </span>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== questions.length}
          >
            Submit Quiz →
          </button>
        </div>

        {previousResult && (
          <p className="muted-text">
            Previous attempt: {previousResult.percentage}%
          </p>
        )}
      </div>
    </div>
  );
}