import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isMobile, isTablet, osName } from "react-device-detect";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import logo from "../../assets/img/1724181984017.jpg";
import asyncWrapper from "../../common/AsyncWrapper";
import { registerUser } from "../../services/dotNet";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHookType";
import { RsetMessageModal } from "../../common/Slices/main";
import MessageModal from "../../components/MessageModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  general?: string;
  passwordConfirmation?: string;
}

interface FormValues {
  username?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

const SignUpForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const main = useAppSelector((state) => state.main);
  const [operatingSystem, setOperatingSystem] = useState<string | null>(null);
  const [inputs, setInputs] = useState<FormValues>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  useEffect(() => {
    setOperatingSystem(
      isMobile ? osName : isTablet ? "Tablet" : window.navigator.platform
    );
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!inputs.username?.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!inputs.email?.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!inputs.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (inputs.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!inputs.passwordConfirmation) {
      newErrors.passwordConfirmation = "Password confirmation is required";
      isValid = false;
    } else if (inputs.passwordConfirmation !== inputs.password) {
      newErrors.passwordConfirmation = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = asyncWrapper(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const postData = {
        UserName: inputs.username,
        Password: inputs.password,
        Email: inputs.email,
        DeviceType: operatingSystem,
      };

      const res = await registerUser(postData);
      const { status, message } = res?.data;

      if (status === 0) {
        dispatch(
          RsetMessageModal({
            title: "Dear user, please check your email to verify your account.",
            show: true,
            icon: "email",
          })
        );
        setIsLoading(true);
      } else {
        setErrors({
          general: message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br bg_tusi">
      <div className="rounded-xl p-8 w-full max-w-md mx-4">
        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="flex flex-col items-center mb-6">
            <Link to="/" className="mb-4">
              <img
                width={100}
                height={100}
                alt="Logo"
                className="rounded-full cursor-pointer"
                src={logo}
              />
            </Link>
            <h1 className="font25 logoFont font-bold mt-4 text-gray-800">
              Star of Talent
            </h1>
            <p className="text-gray-600 mt-1">Create an Account</p>
          </div>

          {errors.general && (
            <div className="text-red p-3 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <Input
              name="username"
              value={inputs.username || ""}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className={`w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red font12 mt-1">*{errors.username}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              name="email"
              type="email"
              value={inputs.email || ""}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={`w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red font12 mt-1">*{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={inputs.password || ""}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={`w-full py-2 px-4 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <VisibilityIcon className="font20 text-gray-800" />
                ) : (
                  <VisibilityOffIcon className="font20 text-gray-800" />
                )}
              </span>
            </div>
            {errors.password && (
              <p className="text-red font12 mt-1">*{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                name="passwordConfirmation"
                type={showConfirmPassword ? "text" : "password"}
                value={inputs.passwordConfirmation || ""}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={`w-full py-2 px-4 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.passwordConfirmation
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {!showConfirmPassword ? (
                  <VisibilityIcon className="font20 text-gray-800" />
                ) : (
                  <VisibilityOffIcon className="font20 text-gray-800" />
                )}
              </button>
            </div>
            {errors.passwordConfirmation && (
              <p className="text-red font12 mt-1">
                *{errors.passwordConfirmation}
              </p>
            )}
          </div>
          <Button
            type="submit"
            loading={isLoading}
            variant="green"
            label="Sign Up"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          />
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
      {main?.messageModal?.show && <MessageModal />}
    </div>
  );
};

export default SignUpForm;
