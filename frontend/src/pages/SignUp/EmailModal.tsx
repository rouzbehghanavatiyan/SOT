import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHookType";
import { RsetMessageModal } from "../../common/Slices/main";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DoneIcon from "@mui/icons-material/Done";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Modal from "../../components/Modal";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import LoadingChild from "../../components/Loading/LoadingChild";

type VerificationStep = "emailSent" | "enterCode";

const EmailModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const main = useAppSelector((state) => state?.main);

  const [currentStep, setCurrentStep] = useState<VerificationStep>("emailSent");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  // Reset states when modal closes
  useEffect(() => {
    if (!main?.messageModal?.show) {
      setCurrentStep("emailSent");
      setVerificationCode("");
      setIsVerifying(false);
      setError("");
    }
  }, [main?.messageModal?.show]);

  const handleAcceptFirstStep = () => {
    setCurrentStep("enterCode");
  };

  const handleBackToEmailStep = () => {
    setCurrentStep("emailSent");
    setVerificationCode("");
    setError("");
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      setError("Please enter the verification code");
      return;
    }

    if (verificationCode.length < 6) {
      setError("Code must be at least 6 characters");
      return;
    }

    try {
      setIsVerifying(true);
      setError("");

      // فرض می‌کنیم یک سرویس برای تأیید کد داریم
      //   const result = await verifyEmailCode({
      //     code: verificationCode,
      //     email: main?.messageModal?.userEmail || "", // نیاز است email در state ذخیره شود
      //   });

      //   if (result.success) {
      //     // بستن مودال و رفتن به صفحه خانه
      //     dispatch(RsetMessageModal({ show: false }));
      //     navigate("/home");

      //     // می‌توانید یک پیام موفقیت هم نشان دهید
      //     dispatch(RsetMessageModal({
      //       show: true,
      //       title: "Your email has been verified successfully!",
      //       icon: "success"
      //     }));
      //   } else {
      //     setError(result.message || "Invalid verification code");
      //   }
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCloseModal = () => {
    dispatch(RsetMessageModal({ show: false }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentStep === "enterCode") {
      handleVerifyCode();
    }
  };

  // const renderEmailSentStep = () => (
  //   <div className="container text-center">
  //     <div className="flex mb-6 justify-center">
  //       <AlternateEmailIcon className="font50 text-green" />
  //     </div>
  //     <h3 className="text-xl font-semibold">Check Your Email</h3>
  //     <p className="text-gray-600 mb-6">
  //       Dear user, please check your email to verify your account.
  //     </p>
  //     <div className="flex justify-center gap-3">
  //       <Button
  //         variant="outline"
  //         onClick={handleCloseModal}
  //         label="Cancel"
  //       />
  //       <Button
  //         variant="green"
  //         onClick={handleAcceptFirstStep}
  //         label="Ok"
  //       />
  //     </div>
  //   </div>
  // );

  // const renderEnterCodeStep = () => (
  //   <div className="text-center">
  //     <div className="flex items-center justify-between mb-6">
  //       <button
  //         onClick={handleBackToEmailStep}
  //         className="p-2 hover:bg-gray-100 rounded-full transition-colors"
  //         aria-label="Back"
  //       >
  //         <ArrowBackIcon className="text-gray-600  font20" />
  //       </button>
  //       <h3 className="text-xl font-semibold">Enter Verification Code</h3>
  //       <div className="w-10"></div>
  //     </div>
  //     <div className="mb-6">
  //       <p className="text-gray-600 mb-4">
  //         Please enter the 6-digit code sent to your email:
  //       </p>
  //       <div className="relative">
  //         <input
  //           type="text"
  //           value={verificationCode}
  //           onChange={(e) =>
  //             setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))
  //           }
  //           onKeyPress={handleKeyPress}
  //           placeholder="123456"
  //           className="w-full text-center text-xl tracking-widest border border-gray-300
  //           rounded-lg focus:outline-none focus:ring-1 focus:ring-green focus:border-transparent"
  //           maxLength={6}
  //           autoFocus
  //         />
  //         {verificationCode.length === 6 && (
  //           <DoneIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
  //         )}
  //       </div>
  //       {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
  //     </div>
  //     <div className="text-sm text-gray-500 mb-6">
  //       Didn't receive the code?
  //       <button
  //         onClick={() => {
  //           // تابع ارسال مجدد ایمیل
  //           // resendVerificationEmail()
  //         }}
  //         className="text-gray-600 ms-2 border-b-[1px] border-b-gray-text-gray-600 font-bold hover:text-green-700"
  //       >
  //         Resend Code
  //       </button>
  //     </div>

  //     <div className="flex justify-center gap-3">
  //       <Button
  //         variant="outline"
  //         onClick={handleBackToEmailStep}
  //         label="Back"
  //         className="min-w-[100px]"
  //       />
  //       <Button
  //         variant="green"
  //         onClick={handleVerifyCode}
  //         label={isVerifying ? "Verifying..." : "Verify Code"}
  //         disabled={isVerifying || verificationCode.length < 6}
  //         className="min-w-[140px]"
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <Modal isOpen={main?.messageModal?.show} onClose={handleCloseModal}>
      {/* {currentStep === "emailSent" && renderEmailSentStep()}
        {currentStep === "enterCode" && renderEnterCodeStep()} */}
      <LoadingChild isLoading />
      <p className="flex text-center justify-center text-gray-600">Please check your email</p>
    </Modal>
  );
};

export default EmailModal;
