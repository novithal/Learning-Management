import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { LMSProvider } from "./context/LMSContext";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Catalogue from "./pages/Catalogue";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import LessonViewer from "./pages/LessonViewer";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import AdminCourses from "./pages/AdminCourses";
import Notifications from "./pages/Notifications";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-section">
        <Header
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
          sidebarOpen={sidebarOpen}
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/notifications" element={<Notifications />} />

            <Route path="/courses/:id" element={<CourseDetails />} />

            <Route path="/my-courses" element={<MyCourses />} />

            <Route
              path="/courses/:courseId/lesson/:lessonId"
              element={<LessonViewer />}
            />

            <Route
              path="/courses/:courseId/quiz"
              element={<Quiz />}
            />

            <Route path="/profile" element={<Profile />} />

            <Route
              path="/admin/courses"
              element={<AdminCourses />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LMSProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </LMSProvider>
  );
}