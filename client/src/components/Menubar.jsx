import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Menubar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setIsLoggedIn, setUserData } =
    useContext(AppContext);

  const [sendingOtp, setSendingOtp] = useState(false);

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${backendUrl}/logout`);
      if (response.status === 200) {
        setIsLoggedIn(false);
        setUserData(null);
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      toast.error("Logout failed");
    }
  };

  const sendVerificationOTP = async () => {
    if (!backendUrl) {
      toast.error("Backend URL not configured");
      return;
    }

    try {
      setSendingOtp(true);
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${backendUrl}/send-otp`);
      if (response.status === 200) {
        toast.success("OTP sent — check your email");
        navigate("/email-verify");
        // NOTE: do NOT mark user verified here. Wait for verification flow to complete.
        // Optionally, if your send-otp response contains updated user info, you can update it:
        // setUserData(prev => ({ ...prev, isAccountVerified: trueOrFalseFromResponse }));
      } else {
        toast.error("Unable to send OTP");
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      toast.error("Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  return (
    <nav
      className="navbar bg-white px-5 py-0 d-flex justify-content-between align-items-center shadow-sm"
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
    >
      {/* Left Side - Logo */}
      <div className="d-flex align-items-center gap-2">
        <img src={assets.logo} alt="logo" width={190} height={100} />
        <span className="fw-bold fs-1 text-primary"></span>
      </div>

      {/* Center: (kept empty to keep layout centered) */}
      <div />

      {/* Right Side - User Info & Actions */}
      {userData ? (
        <div className="d-flex align-items-center gap-3">
          {/* User Name */}
          <span
            className="fw-semibold text-dark"
            style={{
              fontSize: "1.1rem",
              textTransform: "capitalize",
            }}
          > Welcome -
            {userData.name} 
          </span>

          {/* Explore Button */}
          <button
            className="btn text-white fw-bold px-4 py-2 rounded-pill shadow-sm"
            style={{
              background:
                "linear-gradient(90deg, rgba(12,0,107,1) 0%, rgba(9,9,121,1) 50%, rgba(0,212,255,1) 100%)",
            }}
            onClick={() => navigate("/explore")}
          >
            Explore <i className="bi bi-compass ms-2"></i>
          </button>

          {/* Verify Button - show only if user is NOT verified */}
          {!userData.isAccountVerified && (
            <button
              className="btn text-dark fw-bold px-3 py-2 rounded-pill border shadow-sm"
              style={{
                background: "linear-gradient(180deg,#fff,#f3f6ff)",
                borderColor: "#cfe0ff",
              }}
              onClick={sendVerificationOTP}
              disabled={sendingOtp}
            >
              {sendingOtp ? "Sending..." : "Verify"}
              <i className="bi bi-check2-circle ms-2"></i>
            </button>
          )}

          {/* Logout Button */}
          <button
            className="btn text-white fw-bold px-4 py-2 rounded-pill shadow-sm"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,90,90,1) 100%)",
            }}
            onClick={handleLogout}
          >
            Logout <i className="bi bi-box-arrow-right ms-2"></i>
          </button>
        </div>
      ) : (
        // Before Login - Only Login Button
        <div
          className="btn text-white rounded-pill px-4 py-2 fw-bold"
          style={{
            background:
              "linear-gradient(180deg,rgba(12,0,107,1) 0%,rgba(9,9,121,1) 50%,rgba(0,212,255,1) 100%)",
            fontSize: "1.1rem",
          }}
          onClick={() => navigate("/login")}
        >
          Login <i className="bi bi-arrow-right ms-2"></i>
        </div>
      )}
    </nav>
  );
};

export default Menubar;
