export const initialCourses = [
  {
    id: 1,
    title: "Complete React JS Development",
    category: "Development",
    instructor: "Sarah Johnson",
    level: "Beginner",
    duration: "12 Hours",
    lessons: 4,
    rating: 4.9,
    price: 0,
    description:
      "Learn React from fundamentals to advanced concepts. Build modern, responsive web applications using reusable components.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=900",
    lessonList: [
      {
        id: 101,
        title: "Introduction to React",
        duration: "20 min",
        content:
          "Understand React, its advantages, component architecture and how React helps build modern user interfaces."
      },
      {
        id: 102,
        title: "Components and Props",
        duration: "35 min",
        content:
          "Learn functional components, props, reusable UI elements and how to pass information between components."
      },
      {
        id: 103,
        title: "React State and Hooks",
        duration: "45 min",
        content:
          "Understand useState, useEffect and how to manage application state in React."
      },
      {
        id: 104,
        title: "React Router",
        duration: "30 min",
        content:
          "Learn client-side navigation and create multiple pages using React Router."
      }
    ],
    quiz: [
      {
        question: "What is React?",
        options: [
          "A database",
          "A JavaScript library",
          "An operating system",
          "A programming language"
        ],
        answer: 1
      },
      {
        question: "Which hook manages state?",
        options: ["useEffect", "useRef", "useState", "useMemo"],
        answer: 2
      },
      {
        question: "What is JSX?",
        options: [
          "JavaScript XML",
          "Java Syntax Extension",
          "JSON XML",
          "JavaScript Extra"
        ],
        answer: 0
      }
    ]
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    instructor: "Michael Smith",
    level: "Beginner",
    duration: "8 Hours",
    lessons: 3,
    rating: 4.8,
    price: 0,
    description:
      "Learn user interface design, user experience principles, wireframing and modern design systems.",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900",
    lessonList: [
      {
        id: 201,
        title: "Introduction to UI/UX",
        duration: "25 min",
        content: "Understand UI design and UX design principles."
      },
      {
        id: 202,
        title: "Wireframing Basics",
        duration: "40 min",
        content: "Learn layouts, wireframes and user journey planning."
      },
      {
        id: 203,
        title: "Design Systems",
        duration: "35 min",
        content: "Understand typography, colors and reusable design systems."
      }
    ],
    quiz: [
      {
        question: "What does UX stand for?",
        options: [
          "User Experience",
          "User Extension",
          "Universal Experience",
          "User Example"
        ],
        answer: 0
      },
      {
        question: "What is a wireframe?",
        options: [
          "A database",
          "A basic layout structure",
          "A programming language",
          "A hosting service"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 3,
    title: "Python Programming Masterclass",
    category: "Development",
    instructor: "David Wilson",
    level: "Intermediate",
    duration: "15 Hours",
    lessons: 4,
    rating: 4.7,
    price: 0,
    description:
      "Learn Python programming, variables, functions, loops and object-oriented programming.",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=900",
    lessonList: [
      {
        id: 301,
        title: "Python Introduction",
        duration: "20 min",
        content: "Understand Python syntax and development environment."
      },
      {
        id: 302,
        title: "Variables and Data Types",
        duration: "30 min",
        content: "Learn Python variables, strings, numbers and collections."
      },
      {
        id: 303,
        title: "Functions and Loops",
        duration: "45 min",
        content: "Create reusable functions and understand loops."
      },
      {
        id: 304,
        title: "Object Oriented Programming",
        duration: "50 min",
        content: "Learn classes, objects, inheritance and methods."
      }
    ],
    quiz: [
      {
        question: "Which keyword defines a function in Python?",
        options: ["function", "def", "func", "define"],
        answer: 1
      },
      {
        question: "Which data type stores multiple values?",
        options: ["int", "float", "list", "bool"],
        answer: 2
      }
    ]
  },
  {
    id: 4,
    title: "Digital Marketing Essentials",
    category: "Marketing",
    instructor: "Emily Brown",
    level: "Beginner",
    duration: "6 Hours",
    lessons: 3,
    rating: 4.6,
    price: 0,
    description:
      "Understand SEO, social media marketing, content marketing and digital marketing strategies.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900",
    lessonList: [
      {
        id: 401,
        title: "Digital Marketing Overview",
        duration: "25 min",
        content: "Understand digital marketing and online business promotion."
      },
      {
        id: 402,
        title: "SEO Fundamentals",
        duration: "35 min",
        content: "Learn keywords, search engines and SEO techniques."
      },
      {
        id: 403,
        title: "Social Media Marketing",
        duration: "40 min",
        content: "Understand social media campaigns and audience engagement."
      }
    ],
    quiz: [
      {
        question: "What does SEO stand for?",
        options: [
          "Search Engine Optimization",
          "Social Engine Operation",
          "Search Email Optimization",
          "System Engine Organization"
        ],
        answer: 0
      },
      {
        question: "Which is a social media platform?",
        options: ["Excel", "Instagram", "MySQL", "VS Code"],
        answer: 1
      }
    ]
  }
];