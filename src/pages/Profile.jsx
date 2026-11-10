import { useEffect, useState } from "react";
import { useLMS } from "../context/LMSContext";

export default function Profile() {
  const {
    profile,
    setProfile,
    enrolled,
    completedLessons,
  } = useLMS();

  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const initials = (form.name || "NL")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      alert("Name and email are required.");
      return;
    }

    setProfile(form);
    setSaved(true);
  };

  return (
    <div className="page-content">
      <div className="page-intro">
        <span className="eyebrow">ACCOUNT SETTINGS</span>
        <h1>My Profile</h1>
        <p>Manage your personal information and learning account.</p>
      </div>

      <div className="profile-layout">
        <div className="profile-summary">
          <div className="profile-avatar">{initials}</div>

          <h2>{form.name}</h2>
          <p>{form.email}</p>
          <span className="profile-role">{form.role}</span>

          <div className="profile-stat">
            <div>
              <strong>{enrolled.length}</strong>
              <span>Enrolled Courses</span>
            </div>

            <div>
              <strong>{completedLessons.length}</strong>
              <span>Lessons Completed</span>
            </div>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <h2>Personal Information</h2>
            <p>Update your profile details below.</p>
          </div>

          <label>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Role</label>
          <input value={form.role} disabled />

          <label>About Me</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows="4"
          />

          {saved && (
            <p className="success-message">
              ✓ Profile updated successfully!
            </p>
          )}

          <button className="btn btn-primary" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}