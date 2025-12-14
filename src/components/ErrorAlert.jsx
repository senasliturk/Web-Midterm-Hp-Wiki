const ErrorAlert = ({ message, onRetry }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-red-900/20 backdrop-blur-md border border-red-500/30 rounded-xl p-8 max-w-lg w-full shadow-2xl">
        <div className="text-4xl mb-4 font-bold text-red-300">
          ERROR
        </div>
        <h3 className="text-2xl font-harry text-red-400 mb-2 tracking-widest">
          Dark Magic Detected!
        </h3>
        <p className="text-gray-300 font-sans mb-6 text-sm md:text-base">
          {message || "Something went wrong while loading the data."}
        </p>

        {onRetry && (
          <button type="button"onClick={onRetry}className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-all duration-300 shadow-md">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;
