import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const UserDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      await logout();
      setShowConfirmation(false);
      navigate("/"); // Redirect to homepage after logout
    } catch (error: any) {
      console.error("Logout failed:", error);
      setLogoutError(
        error.response?.data?.error || "Logout failed. Please try again."
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogoutClick}
        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Logout
      </button>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-80"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg font-medium mb-4">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to log out?
              </p>

              {logoutError && (
                <div className="p-3 mb-4 bg-red-50 text-red-600 text-sm rounded">
                  {logoutError}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelLogout}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  disabled={isLoggingOut}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Logging out...
                    </>
                  ) : (
                    "Yes, Logout"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDashboard;
