import React, { useState } from "react";

const SlideRange: React.FC = () => {
  const [value, setValue] = useState(0); // مقدار پیش‌فرض اسلایدر

  // تابع برای محدود کردن مقادیر به ۰، ۲۰، ۴۰، ۶۰، ۸۰، ۱۰۰
  const handleChange = (e) => {
    const newValue = Math.round(e.target.value / 20) * 20;
    setValue(newValue);
  };

  return (
    <div className="mt-4">
      <div className="mb-4">
        <label
          htmlFor="range"
          className="block text-lg font-medium text-gray-700"
        >
          <span className="mb-1 mt-4">Rate: </span>
          <span className="mb-1 mt-4">{value}</span>
        </label>
        <input
          type="range"
          id="range"
          min="0"
          max="100"
          step="20"
          value={value}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-gray-900 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg
                     [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gray-400 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-lg
                     [&::-ms-thumb]:w-6 [&::-ms-thumb]:h-6 [&::-ms-thumb]:bg-white [&::-ms-thumb]:border-2 [&::-ms-thumb]:border-gray-400 [&::-ms-thumb]:rounded-full [&::-ms-thumb]:shadow-lg"
        />
      </div>
    </div>
  );
};

export default SlideRange;
