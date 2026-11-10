import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { initialCourses } from "../data/courses";

const LMSContext = createContext(null);

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const defaultProfile = {
  name: "Novitha Parthiban",
  email: "novi@example.com",
  avatar: "NL",
  role: "Student",
  bio: "Passionate learner interested in technology and design.",
};

export function LMSProvider({ children }) {
  const [courses, setCourses] = useState(() =>
    readStorage("lms_courses", initialCourses)
  );

  const [enrolled, setEnrolled] = useState(() =>
    readStorage("lms_enrolled", [1, 2])
  );

  const [completedLessons, setCompletedLessons] = useState(() =>
    readStorage("lms_completed", [])
  );

  const [quizScores, setQuizScores] = useState(() =>
    readStorage("lms_scores", {})
  );

  const [profile, setProfile] = useState(() => {
    const saved = readStorage("lms_profile", defaultProfile);

    return {
      ...defaultProfile,
      ...saved,
      name: saved?.name === "Alex Johnson"
        ? defaultProfile.name
        : saved?.name || defaultProfile.name,
      email: saved?.email === "alex@example.com"
        ? defaultProfile.email
        : saved?.email || defaultProfile.email,
    };
  });

  useEffect(() => {
    localStorage.setItem("lms_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("lms_enrolled", JSON.stringify(enrolled));
  }, [enrolled]);

  useEffect(() => {
    localStorage.setItem(
      "lms_completed",
      JSON.stringify(completedLessons)
    );
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem("lms_scores", JSON.stringify(quizScores));
  }, [quizScores]);

  useEffect(() => {
    localStorage.setItem("lms_profile", JSON.stringify(profile));
  }, [profile]);

  // ENROLMENT

  const isEnrolled = (courseId) => {
    return enrolled.includes(Number(courseId));
  };

  const enrollCourse = (courseId) => {
    const id = Number(courseId);

    setEnrolled((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  };

  // LESSON COMPLETION

  const completeLesson = (lessonId) => {
    const id = Number(lessonId);

    setCompletedLessons((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  };

  // COURSE PROGRESS

  const getProgress = (course) => {
    if (!course?.lessonList?.length) return 0;

    const completed = course.lessonList.filter((lesson) =>
      completedLessons.includes(Number(lesson.id))
    ).length;

    return Math.round(
      (completed / course.lessonList.length) * 100
    );
  };

  // QUIZ RESULT

  const submitQuiz = (courseId, score, total) => {
    const percentage = total
      ? Math.round((score / total) * 100)
      : 0;

    setQuizScores((previous) => ({
      ...previous,
      [Number(courseId)]: {
        score,
        total,
        percentage,
        passed: percentage >= 50,
        date: new Date().toISOString(),
      },
    }));
  };

  // COURSE MANAGEMENT

  const addCourse = (course) => {
    const newCourse = {
      ...course,
      id: Date.now(),
      lessonList: (course.lessonList || []).map((lesson) => ({
        ...lesson,
        id: lesson.id || Date.now() + Math.random(),
      })),
      quiz: course.quiz || [],
      lessons: (course.lessonList || []).length,
    };

    setCourses((previous) => [...previous, newCourse]);

    return newCourse;
  };

  const updateCourse = (id, updatedCourse) => {
    setCourses((previous) =>
      previous.map((course) =>
        course.id === Number(id)
          ? {
              ...course,
              ...updatedCourse,
              id: course.id,
              lessons: (
                updatedCourse.lessonList ?? course.lessonList ?? []
              ).length,
            }
          : course
      )
    );
  };

  const deleteCourse = (id) => {
    const courseId = Number(id);

    setCourses((previous) =>
      previous.filter((course) => course.id !== courseId)
    );

    setEnrolled((previous) =>
      previous.filter((item) => item !== courseId)
    );

    setQuizScores((previous) => {
      const updated = { ...previous };
      delete updated[courseId];
      return updated;
    });
  };

  // LESSON MANAGEMENT

  const addLesson = (courseId, lesson) => {
    setCourses((previous) =>
      previous.map((course) => {
        if (course.id !== Number(courseId)) return course;

        const newLesson = {
          ...lesson,
          id: Date.now() + Math.floor(Math.random() * 1000),
        };

        const lessonList = [...(course.lessonList || []), newLesson];

        return {
          ...course,
          lessonList,
          lessons: lessonList.length,
        };
      })
    );
  };

  const updateLesson = (courseId, lessonId, updatedLesson) => {
    setCourses((previous) =>
      previous.map((course) => {
        if (course.id !== Number(courseId)) return course;

        return {
          ...course,
          lessonList: (course.lessonList || []).map((lesson) =>
            lesson.id === Number(lessonId)
              ? { ...lesson, ...updatedLesson, id: lesson.id }
              : lesson
          ),
        };
      })
    );
  };

  const deleteLesson = (courseId, lessonId) => {
    setCourses((previous) =>
      previous.map((course) => {
        if (course.id !== Number(courseId)) return course;

        const lessonList = (course.lessonList || []).filter(
          (lesson) => lesson.id !== Number(lessonId)
        );

        return {
          ...course,
          lessonList,
          lessons: lessonList.length,
        };
      })
    );

    setCompletedLessons((previous) =>
      previous.filter((id) => id !== Number(lessonId))
    );
  };

  // QUIZ QUESTION MANAGEMENT

  const addQuizQuestion = (courseId, question) => {
    setCourses((previous) =>
      previous.map((course) =>
        course.id === Number(courseId)
          ? {
              ...course,
              quiz: [...(course.quiz || []), question],
            }
          : course
      )
    );
  };

  const updateQuizQuestion = (courseId, questionIndex, updatedQuestion) => {
    setCourses((previous) =>
      previous.map((course) => {
        if (course.id !== Number(courseId)) return course;

        const quiz = [...(course.quiz || [])];

        if (quiz[questionIndex]) {
          quiz[questionIndex] = updatedQuestion;
        }

        return { ...course, quiz };
      })
    );
  };

  const deleteQuizQuestion = (courseId, questionIndex) => {
    setCourses((previous) =>
      previous.map((course) =>
        course.id === Number(courseId)
          ? {
              ...course,
              quiz: (course.quiz || []).filter(
                (_, index) => index !== questionIndex
              ),
            }
          : course
      )
    );
  };

  return (
    <LMSContext.Provider
      value={{
        courses,
        enrolled,
        completedLessons,
        quizScores,
        profile,
        setProfile,

        isEnrolled,
        enrollCourse,
        completeLesson,
        getProgress,
        submitQuiz,

        addCourse,
        updateCourse,
        deleteCourse,

        addLesson,
        updateLesson,
        deleteLesson,

        addQuizQuestion,
        updateQuizQuestion,
        deleteQuizQuestion,
      }}
    >
      {children}
    </LMSContext.Provider>
  );
}

export const useLMS = () => {
  const context = useContext(LMSContext);

  if (!context) {
    throw new Error("useLMS must be used inside LMSProvider");
  }

  return context;
};