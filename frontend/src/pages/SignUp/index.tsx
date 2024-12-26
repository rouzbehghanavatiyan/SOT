import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hook";
import { isMobile, isTablet, osName } from "react-device-detect";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import logo from "../../assets/img/1724181984017.jpg";

const SignUpForm: FC = () => {
    const [operatingSystem, setOperatingSystem] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isMobile) {
            setOperatingSystem(osName);
        } else if (isTablet) {
            setOperatingSystem("Tablet");
        } else {
            setOperatingSystem(window.navigator.platform);
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg mx-auto p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-4">Create an Account</h1>
                <form className="space-y-6">
                    <div className="flex justify-center mb-4">
                        <Link to="/">
                            <img
                                width={100}
                                height={100}
                                alt="Logo"
                                className="cursor-pointer"
                                src={String(logo)}
                            />
                        </Link>
                    </div>

                    <Input
                        className="w-full bg-gray-100 border border-gray-300 rounded p-2"
                        onChange={(e: any) => { }}
                        placeholder="Username"
                        aria-label="Username input"
                    />
                    <Input
                        className="w-full bg-gray-100 border border-gray-300 rounded p-2"
                        type="email"
                        onChange={(e: any) => { }}
                        placeholder="Email"
                        aria-label="Email input"
                    />
                    <Input
                        className="w-full bg-gray-100 border border-gray-300 rounded p-2"
                        type="password"
                        onChange={(e: any) => { }}
                        placeholder="Password"
                        aria-label="Password input"
                    />
                    <Input
                        className="w-full bg-gray-100 border border-gray-300 rounded p-2"
                        type="password"
                        onChange={(e: any) => { }}
                        placeholder="Confirm Password"
                        aria-label="Confirm Password input"
                    />

                    <Button type="button" variant="secondary" label="Sign Up" className="w-full" />

                    <div className="text-center">
                        <p className="text-sm">
                            <Link className="text-blue-500 hover:underline" to="/">
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