const LoadingIndicator = ({ fullScreen = true, className = "" }) => {
  const containerClass = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white z-[9999]"
    : "w-full flex items-center justify-center py-10";

  return (
    <div className={`${containerClass} ${className}`.trim()}>
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
    </div>
  );
};

export default LoadingIndicator;