import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ServerError = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user already submitted email
    const submitted = localStorage.getItem("emailSubmitted");
    if (submitted) {
      setIsSubmitted(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      console.log("User email for contact:", email);
      localStorage.setItem("userContactEmail", email);
      localStorage.setItem("emailSubmitted", "true");
      setIsSubmitted(true);
    }
  };

  const handleRetry = () => {
    sessionStorage.removeItem("serverError");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Icon */}
        <div className="w-20   mx-auto  bg-red-100 rounded-full flex items-center  text-orange justify-center">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Title & Message */}
        <h1 className="text-2xl font-bold text-orange mb-4">
          Server Issue Detected
        </h1>

        <p className="text-gray-800 mb-2">
          Dear user, unfortunately we are experiencing server issues.
        </p>

        <p className="text-gray-800 mb-6">
          We will contact you as soon as possible!
        </p>

        {/* Email Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Please enter your email so we can stay in touch
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-hover text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            >
              Submit Email & Get Notified
            </button>
          </form>
        ) : (
          <div className="mb-6 p-4 bg-white rounded-lg border border-green">
            <div className="flex items-center justify-center mb-2">
              <svg
                className="w-6 h-6 text-green-dark mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-green-700 font-medium">Thank You!</span>
            </div>
            <p className="text-green-dark text-sm">
              Your email has been registered. We will contact you once the issue
              is resolved.
            </p>
          </div>
        )}

        <div className="flex justify-center  gap-3">
          <button
            onClick={handleRetry}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition duration-200 font-medium"
          >
            Try Again
          </button>
          {/* <button
            onClick={() => (window.location.href = "/login")}
            className="flex-1   text-orange py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
          >
            Back to Login
          </button> */}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-800 mb-2">
            For immediate assistance:
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="mailto:support@gmail.com"
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              clashtalent.support@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
