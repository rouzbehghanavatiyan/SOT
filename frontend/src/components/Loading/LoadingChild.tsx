import React from "react";

const LoadingChild = React.forwardRef<HTMLDivElement, { isLoading: boolean }>(
  ({ isLoading }, forwardedRef) => {
    return (
      <div 
        className="flex items-center justify-center min-h-[100px] w-full" 
        ref={forwardedRef}
      >
        {isLoading && (
          <div className="loader-userFinding w-12 h-12"></div>
        )}
      </div>
    );
  }
);

export default LoadingChild;