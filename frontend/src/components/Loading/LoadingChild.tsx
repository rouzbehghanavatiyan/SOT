import React from "react";

const LoadingChild = React.forwardRef<HTMLDivElement, { isLoading: boolean }>(
  ({ isLoading }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
      >
        {isLoading && (
          <div className="mb-10 loader-userFinding w-12 h-12"></div>
        )}
      </div>
    );
  }
);

export default LoadingChild;
