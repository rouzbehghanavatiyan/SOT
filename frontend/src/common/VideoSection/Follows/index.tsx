// در کامپوننت Follows
const Follows: React.FC<any> = ({
  title,
  onFollowClick,
  bgColor,
  isLoading = false,
}) => {
  return (
    <button
      onClick={onFollowClick}
      disabled={isLoading}
      className={`px-4 py-2 rounded-full text-white font-semibold ${
        bgColor || "bg-blue-500 hover:bg-blue-600"
      } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? "Loading..." : title}
    </button>
  );
};
