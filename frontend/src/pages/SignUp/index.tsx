import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hook";
import { isMobile, isTablet, osName } from "react-device-detect";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import logo from "../../assets/img/1724181984017.jpg";
import asyncWrapper from "../../common/AsyncWrapper";
import { registerUser } from "../../services/dotNet";

const SignUpForm: FC = () => {
  const [operatingSystem, setOperatingSystem] = useState<string | null>(null);
  const [inputs, setInputs] = useState<any>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      setOperatingSystem(osName);
    } else if (isTablet) {
      setOperatingSystem("Tablet");
    } else {
      setOperatingSystem(window.navigator.platform);
    }
  }, []);

  const handleSignUp = asyncWrapper(async () => {
    const postData = {
      UserName: "test",
      Password: "123",
      Email: "test@yahoo.com",
    };
    const res = await registerUser(postData);
    console.log(res);
    const { data, status } = res?.data;
    if (status === 0) {
      navigate("/");
    } else {
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg_tusi">
      <div className="  rounded-lg mx-auto p-8 w-full max-w-md">
        <form className="space-y-6">
          <h1 className="text-2xl font-semibold text-center mb-4">
            Create an Account
          </h1>
          <div className="flex justify-center mb-4">
            <Link to="/">
              <img
                width={100}
                height={100}
                alt="Logo"
                className="rounded-full cursor-pointer"
                src={String(logo)}
              />
            </Link>
          </div>
          <h1 className="logoFont font40 font-bold  text-center mb-4">
            Star of talent
          </h1>
          <Input
            className="w-full bg-gray-100 border border-gray-300 rounded p-2"
            placeholder="username"
            onChange={(e: any) =>
              setInputs((prev: any) => ({ ...prev, username: e.target.value }))
            }
            aria-label="Username input"
          />
          <Input
            className="w-full bg-gray-100 border border-gray-300 rounded p-2"
            type="email"
            onChange={(e: any) =>
              setInputs((prev: any) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Email"
            aria-label="Email input"
          />
          <Input
            className="w-full bg-gray-100 border border-gray-300 rounded p-2"
            type="password"
            onChange={(e: any) =>
              setInputs((prev: any) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Password"
            aria-label="Password input"
          />
          <Input
            className="w-full bg-gray-100 border border-gray-300 rounded p-2"
            type="password"
            onChange={(e: any) =>
              setInputs((prev: any) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            placeholder="Confirm Password"
            aria-label="Confirm Password input"
          />
          <Button
            onClick={handleSignUp}
            type="button"
            variant="green"
            label="Sign Up"
            className="w-full"
          />
          <div className="text-center">
            <p className="text-sm">
              <Link className="text-primary hover:underline" to="/">
                Already have an account? Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
