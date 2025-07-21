const ProgressBar: React.FC<{ percentage: number }> = ({ percentage }) => {
  return (
    <div
      className="h-full bg_logo rounded-xl transition-all duration-300"
      style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
    />
  );
};

export default ProgressBar;
