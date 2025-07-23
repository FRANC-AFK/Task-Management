import { useState } from "react";
import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal";

const Homepage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="w-screen h-screen bg-black">
      {/* Auth Buttons */}
      <div className="absolute top-6 right-8 flex items-center gap-4">
        <button
          className="px-6 py-2 text-black bg-white rounded-full hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 font-medium text-sm uppercase tracking-wider"
          onClick={openLoginModal}
        >
          Login
        </button>
        <button
          className="px-6 py-2 text-white bg-transparent border border-white rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 font-medium text-sm uppercase tracking-wider"
          onClick={openRegisterModal}
        >
          Register
        </button>
      </div>

      {/* Centered Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg
          className="w-48 h-48 text-white animate-[float_6s_ease-in-out_infinite]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="animate-[pulse_4s_ease-in-out_infinite]">
            {/* Outer circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-20"
            />
            {/* Inner design - abstract task/checklist representation */}
            <path
              d="M30 50L45 65L70 35"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            />
            {/* Decorative elements */}
            <path
              d="M50 20V30M50 70V80M20 50H30M70 50H80"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-40"
            />
          </g>
        </svg>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
      />
    </div>
  );
};

export default Homepage;
