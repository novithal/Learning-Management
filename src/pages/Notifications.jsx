
import { useState } from "react";
import {
  Bell,
  BookOpen,
  Trophy,
  CheckCircle,
  Clock,
  Trash2,
  CheckCheck,
  CalendarDays
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "Welcome to LearnHub!",
    message: "Start exploring courses and improve your skills.",
    time: "Just now",
    type: "welcome",
    unread: true
  },
  {
    id: 2,
    title: "Continue Your Learning",
    message: "You can continue learning from your enrolled courses.",
    time: "1 hour ago",
    type: "course",
    unread: true
  },
  {
    id: 3,
    title: "Learning Progress",
    message: "Keep completing lessons to improve your course progress.",
    time: "Yesterday",
    type: "progress",
    unread: false
  },
  {
    id: 4,
    title: "Quiz Reminder",
    message: "Check your course quizzes and test your knowledge.",
    time: "2 days ago",
    type: "quiz",
    unread: false
  }
];

function Notifications() {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem("lms_notifications");
      return saved ? JSON.parse(saved) : initialNotifications;
    } catch {
      return initialNotifications;
    }
  });

  const saveNotifications = (updated) => {
    setNotifications(updated);
    localStorage.setItem("lms_notifications", JSON.stringify(updated));
  };

  const markAllRead = () => {
    saveNotifications(
      notifications.map((item) => ({ ...item, unread: false }))
    );
  };

  const markRead = (id) => {
    saveNotifications(
      notifications.map((item) =>
        item.id === id ? { ...item, unread: false } : item
      )
    );
  };

  const deleteNotification = (id) => {
    saveNotifications(
      notifications.filter((item) => item.id !== id)
    );
  };

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;

  const getIcon = (type) => {
    switch (type) {
      case "course":
        return <BookOpen size={21} />;
      case "progress":
        return <CheckCircle size={21} />;
      case "quiz":
        return <Trophy size={21} />;
      default:
        return <Bell size={21} />;
    }
  };

  return (
    <div className="notifications-page">

      <div className="notifications-hero">
        <div className="notifications-hero-content">
          <span className="notifications-eyebrow">
            YOUR ACTIVITY CENTER
          </span>
          <h1>Notifications</h1>
          <p>
            Stay updated with your learning activities and important updates.
          </p>
        </div>

        <div className="notifications-hero-icon">
          <Bell size={38} />
        </div>
      </div>

      <div className="notification-summary">
        <div className="notification-summary-card">
          <div className="summary-icon purple">
            <Bell size={22} />
          </div>
          <div>
            <span>Total Notifications</span>
            <h2>{notifications.length}</h2>
          </div>
        </div>

        <div className="notification-summary-card">
          <div className="summary-icon orange">
            <Clock size={22} />
          </div>
          <div>
            <span>Unread Notifications</span>
            <h2>{unreadCount}</h2>
          </div>
        </div>

        <div className="notification-summary-card">
          <div className="summary-icon green">
            <CheckCheck size={22} />
          </div>
          <div>
            <span>Read Notifications</span>
            <h2>{notifications.length - unreadCount}</h2>
          </div>
        </div>
      </div>

      <div className="notifications-list-container">

        <div className="notifications-list-header">
          <div>
            <h2>Recent Activity</h2>
            <p>Your latest notifications</p>
          </div>

          {unreadCount > 0 && (
            <button
              className="mark-all-btn"
              onClick={markAllRead}
            >
              <CheckCheck size={17} />
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="notifications-empty">
            <div className="empty-notification-icon">
              <Bell size={35} />
            </div>
            <h3>You're all caught up!</h3>
            <p>You don't have any notifications right now.</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map((item, index) => (
              <div
                className={`notification-item ${
                  item.unread ? "unread" : ""
                }`}
                key={item.id}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className={`notification-icon ${item.type}`}>
                  {getIcon(item.type)}
                </div>

                <div className="notification-content">
                  <div className="notification-title-row">
                    <h3>{item.title}</h3>
                    {item.unread && (
                      <span className="unread-label">NEW</span>
                    )}
                  </div>

                  <p>{item.message}</p>

                  <span className="notification-time">
                    <CalendarDays size={13} />
                    {item.time}
                  </span>
                </div>

                <div className="notification-actions">
                  {item.unread && (
                    <button
                      className="read-action"
                      onClick={() => markRead(item.id)}
                      title="Mark as read"
                    >
                      <CheckCheck size={17} />
                    </button>
                  )}

                  <button
                    className="delete-action"
                    onClick={() => deleteNotification(item.id)}
                    title="Delete notification"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
