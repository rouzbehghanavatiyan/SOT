import React from "react";

const LoadingChild = React.forwardRef<HTMLDivElement, { isLoading: boolean }>(
  ({ isLoading }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className="w-full h-24 flex justify-center items-center"
      >
        {isLoading && (
          <div className="mb-10 loader-userFinding w-12 h-12"></div>
        )}
      </div>
    );
  }
);

export default LoadingChild;
