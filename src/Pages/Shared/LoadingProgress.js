import React, { useEffect, useState } from "react";

const LoadingProgress = ({ children, loading }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let id;
    if (loading) {
      id = setInterval(() => {
        setProgress((p) => {
          return p + 1;
        });
      }, 200);
    } else {
      id = setInterval(() => {
        setProgress((p) => {
          if (p < 95) return 95;
          return p + 1;
        });
      }, 200);
    }
    if (progress > 102) {
      clearInterval(id);
    }
    if (progress === 10 && loading) {
      clearInterval(id);
    }

    return () => clearInterval(id);
  }, [progress, loading]);

  if (progress < 101) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <div className="w-4/5 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-purple-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-lg duration-1000"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </div>
    );
  }
  return children;
};

export default LoadingProgress;
