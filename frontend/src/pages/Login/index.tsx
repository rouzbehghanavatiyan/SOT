import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hook";
import { isMobile, isTablet, osName } from "react-device-detect";
import { Button } from "../../components/Button";
import logo from "../../assets/img/1724181984017.jpg";
import Input from "../../components/Input";
import { login } from "../../services/dotNet";
import { jwtDecode } from "jwt-decode";

const LogInForm: FC = () => {
  const [operatingSystem, setOperatingSystem] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<any>({});
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);

  useEffect(() => {
    if (isMobile) {
      setOperatingSystem(osName);
    } else if (isTablet) {
      setOperatingSystem("Tablet");
    } else {
      setOperatingSystem(window.navigator.platform);
    }
  }, []);

  const handleAccept = async () => {
    const postData = {
      userName: inputs?.userName,
      password: inputs?.password,
    };
    setIsLoadingBtn(true);
    const res = await login(postData);
    const { status, data } = res?.data;
    if (status === 0) {
      navigate("/home");
      // navigate("/learningSot");
      const fixUser: any = jwtDecode(data?.token);
      const userId =
        fixUser[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      let Vals = Object.values(fixUser);
      sessionStorage.setItem("token", data?.token);
      sessionStorage.setItem("userId", userId);
    } else {
      alert("User has been not register");
      setIsLoadingBtn(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // جلوگیری از رفتار پیش‌فرض فرم
      handleAccept();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg_tusi">
      <div className="  rounded-lg mx-auto p-8 w-full max-w-md">
        <form className="space-y-6" onKeyDown={handleKeyDown}>
          <div className="flex justify-center">
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
          <Input
            onKeyDown={(e: any) => e.key === "Enter" && handleAccept()}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-5 p-2"
            onChange={(e: any) =>
              setInputs((prev: any) => ({ ...prev, userName: e.target.value }))
            }
            placeholder="Username"
            aria-label="Room name input"
          />
          <Input
            onKeyDown={(e: any) => e.key === "Enter" && handleAccept()}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-5 p-2"
            onChange={(e: any) =>
              setInputs((prev: any) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Password"
            type="text"
            aria-label="Room name input"
          />
          <Button
            loading={isLoadingBtn}
            onClick={handleAccept}
            type="button"
            variant="dark_primary"
            label="login"
            className="w-full"
            aria-label="Login button"
            tabIndex={0}
          />
          <div className="text-center">
            <p className="text-sm">
              <Link className="text-blue-500 hover:underline" to="#">
                Forgot your password?
              </Link>
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm flex items-center justify-center">
              Don't have an account?
              <Link className="text-blue-500 hover:underline ml-1" to="/signUp">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInForm;
