import { newtonsCradle } from "ldrs";

newtonsCradle.register();

const LoadingIndicator = ({ fullScreen = true, className = "" }) => {
  const containerClass = fullScreen
    ? "min-h-screen w-full flex items-center justify-center"
    : "w-full flex items-center justify-center py-10";

  return (
    <div className={`${containerClass} ${className}`.trim()}>
      <l-newtons-cradle size="78" speed="1.4" color="black"></l-newtons-cradle>
    </div>
  );
};

export default LoadingIndicator;
