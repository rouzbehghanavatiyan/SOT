import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHookType";
import { Button } from "../../components/Button";
import logo from "../../assets/img/1724181984017.jpg";
import Input from "../../components/Input";
import { login } from "../../services/dotNet";
import { RsetUserLogin } from "../../common/Slices/main";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { jwtDecode } from "jwt-decode";

interface LoginFormState {
  username: string;
  password: string;
}
interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

const LogInForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<LoginFormState>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formState.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formState.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formState.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    // if (loginAttempts >= 3) {
    //   setErrors({
    //     general: "Too many failed attempts. Please try again later.",
    //   });
    //   return;
    // }
    setIsLoading(true);
    try {
      const response = await login({
        userName: formState.username,
        password: formState.password,
      });
      const { status, data } = response.data;
      if (status === 0) {
        const userData = jwtDecode(data.token);
        let Vals = Object.values(userData);
        const userId = Vals?.[1];
        sessionStorage.setItem("token", data.token);
        dispatch(RsetUserLogin({ token: data.token, userId }));
        // setLoginAttempts(0);
        navigate("/home");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      // setLoginAttempts((prev) => prev + 1);
      setErrors({
        general: "Invalid username or password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg_tusi">
      <div className=" rounded-xl p-8 w-full max-w-md mx-4">
        <div className="flex flex-col items-center mb-6">
          <Link to="/">
            <img
              width={100}
              height={100}
              alt="Logo"
              className="rounded-full cursor-pointer"
              src={logo}
            />
          </Link>
          <h1 className="font25 logoFont font-bold mt-4 text-gray-800">
            Clash Talent
          </h1>
          <p className="text-gray-800 mt-2">Sign in to your account</p>
        </div>

        {errors.general && (
          <div className="mb-4 p-3 text-red rounded-lg">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <Input
              name="username"
              value={formState.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              aria-label="Username input"
              className={`w-full py-3 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <div className="text-red font12 mt-1">*{errors.username}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formState.password || ""}
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:text-soft_blue border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-soft_blue hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            disabled={isLoading || loginAttempts >= 3}
            type="submit"
            className="w-full text-white mt-2"
            aria-label="Login button"
            label={"Sign in"}
            loading={isLoading}
          />
          <div className="text-center mt-4">
            <p className="text-sm text-gray-800">
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className="text-soft_blue font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInForm;
