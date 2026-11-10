
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Library,
  User,
  Settings,
  GraduationCap,
  X
} from "lucide-react";

function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard
    },
    {
      name: "Course Catalogue",
      path: "/catalogue",
      icon: BookOpen
    },
    {
      name: "My Courses",
      path: "/my-courses",
      icon: Library
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User
    },
    {
      name: "Admin Courses",
      path: "/admin/courses",
      icon: Settings
    }
  ];

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <GraduationCap size={25} />
          </div>

          <span>LearnHub</span>

          <button
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>
        </div>

        <nav className="sidebar-menu">
          <p className="sidebar-label">MAIN MENU</p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-icon">
            <GraduationCap size={22} />
          </div>

          <div>
            <h4>Keep Learning!</h4>
            <p>Build your skills every day.</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
