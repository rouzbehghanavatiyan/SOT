// Timer.tsx
import React, { useState, useEffect } from "react";

interface TimerProps {
  startTime: string; // زمان شروع از سرور به صورت ISO string
  duration: number; // مدت زمان کل تایمر به ثانیه (60 دقیقه = 3600 ثانیه)
  active: boolean;
  className?: string;
  onComplete?: () => void; // callback هنگام اتمام تایمر
}

const Timer: React.FC<TimerProps> = ({
  startTime,
  duration = 3600,
  active,
  className,
  onComplete,
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(duration);

  useEffect(() => {
    if (!active || !startTime) return;

    // محاسبه زمان باقیمانده
    const calculateRemainingTime = () => {
      const start = new Date(startTime).getTime();
      const now = new Date().getTime();
      const elapsed = Math.floor((now - start) / 1000); // زمان سپری شده به ثانیه
      const remaining = Math.max(duration - elapsed, 0); // زمان باقیمانده (حداقل صفر)

      return remaining;
    };

    // مقداردهی اولیه
    const initialRemaining = calculateRemainingTime();
    setRemainingSeconds(initialRemaining);

    // اگر تایمر تمام شده باشد
    if (initialRemaining <= 0 && onComplete) {
      onComplete();
      return;
    }

    // آپدیت هر ثانیه
    const interval = setInterval(() => {
      const newRemaining = calculateRemainingTime();
      setRemainingSeconds(newRemaining);

      // اگر تایمر به صفر رسید
      if (newRemaining <= 0) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, active, duration, onComplete]);

  // تبدیل ثانیه به فرمت MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // محاسبه درصد پیشرفت برای progress bar
  const progressPercent = (remainingSeconds / duration) * 100;

  return (
    <div className="flex items-center">
      <span className={className}>{formatTime(remainingSeconds)}</span>
      <div className="w-48 h-1 bg-gray-700 rounded-full ml-4 relative bg-gray-900">
        <div
          className="flex h-1 bg-white rounded-full transition-all duration-1000 text-gray"
          style={{
            width: `${progressPercent}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;

// import React, { useState, useEffect } from "react";

// interface TimerProps {
//   startTime: string; // زمان شروع به صورت ISO string از سرور
//   duration?: number; // مدت زمان کل تایمر به ثانیه (پیش‌فرض یک ساعت)
//   active: boolean; // وضعیت تایمر (فعال یا غیرفعال)
//   className?: string; // کلاس‌های CSS برای نمایش زمان
//   onComplete?: () => void; // callback هنگام اتمام تایمر
// }

// const Timer: React.FC<TimerProps> = ({
//   startTime,
//   duration = 3600, // مدت زمان تایمر به ثانیه (پیش‌فرض یک ساعت)
//   active,
//   className,
//   onComplete,
// }) => {
//   const [remainingSeconds, setRemainingSeconds] = useState<number>(0); // زمان باقی‌مانده

//   useEffect(() => {
//     if (!active || !startTime) return; // اگر تایمر فعال نیست یا زمان شروع وجود ندارد، هیچ کاری انجام ندهید

//     // اصلاح زمان دریافتی از سرور
//     const fixedStartTime = startTime.split(".")[0] + "Z"; // حذف میلی‌ثانیه‌های اضافی و اضافه کردن Z
//     const startTimestamp = new Date(fixedStartTime).getTime(); // تبدیل زمان شروع به میلی‌ثانیه

//     const calculateRemainingTime = () => {
//       const nowTimestamp = Date.now();
//       const elapsed = Math.floor((nowTimestamp - startTimestamp) / 1000); // مدت زمان سپری شده
//       const remaining = Math.max(duration - elapsed, 0); // محاسبه زمان باقی‌مانده
//       return remaining;
//     };

//     // مقدار اولیه زمان باقی‌مانده
//     setRemainingSeconds(calculateRemainingTime());

//     // ایجاد تایمر برای کاهش زمان باقی‌مانده
//     const interval = setInterval(() => {
//       const newRemaining = calculateRemainingTime();
//       setRemainingSeconds(newRemaining);

//       if (newRemaining <= 0) {
//         clearInterval(interval); // پاکسازی تایمر
//         if (onComplete) onComplete(); // اجرای callback هنگام اتمام تایمر
//       }
//     }, 1000);

//     return () => clearInterval(interval); // پاکسازی تایمر هنگام خروج کامپوننت
//   }, [startTime, active, duration, onComplete]);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   const progressPercent = (remainingSeconds / duration) * 100;

//   return (
//     <div className="flex items-center">
//       <span className={className}>{formatTime(remainingSeconds)}</span>
//       <div className="w-48 h-1 bg-gray-700 rounded-full ml-4 relative bg-gray-900">
//         <div
//           className="flex h-1 bg-white rounded-full transition-all duration-1000 text-gray"
//           style={{
//             width: `${progressPercent}%`,
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default Timer;
