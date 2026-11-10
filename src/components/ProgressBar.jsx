export default function ProgressBar({ progress = 0 }) {
  const value = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-track">
      <div
        className="progress-fill"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}