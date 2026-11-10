import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { useLMS } from "../context/LMSContext";

function Header({ onMenuClick, sidebarOpen }) {
  const location = useLocation();
  const { profile } = useLMS();

  const initials = (profile.name || "NL")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="topbar-heading">
          <span className="topbar-subtitle">
            LEARNING MANAGEMENT SYSTEM
          </span>
          <h2>Welcome Back!</h2>
        </div>
      </div>

      <div className="topbar-right">
        <Link
          to="/notifications"
          className={`notification-btn ${
            location.pathname === "/notifications" ? "selected" : ""
          }`}
          title="Notifications"
          aria-label="Open notifications"
        >
          <Bell size={21} />
          <span className="notification-dot" />
        </Link>

        <Link
          to="/profile"
          className="topbar-profile"
          title={`${profile.name} - ${profile.email}`}
          aria-label="Go to profile"
        >
          <span className="topbar-avatar">{initials}</span>

          <span className="topbar-profile-info">
            <strong>{profile.name}</strong>
            <small>{profile.email}</small>
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Header;