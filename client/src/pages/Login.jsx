import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState, useContext } from "react";   
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);  
  const { backendUrl,setIsLoggedIn,getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;
    setLoading(true);

    try {
      if (isCreateAccount) {
        // Register
        const response = await axios.post(`${backendUrl}/register`, {
          name,
          email,
          password,
        });

        if (response.status === 201) {
          toast.success("Account created successfully.");
          navigate("/");
        } else {
          toast.error("Email already exists!");
        }
      } else {
        // Login
        const response = await axios.post(`${backendUrl}/login`, {
          email,
          password,
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
          getUserData(); 
          toast.success("Login successful.");
          navigate("/");
        } else {
          toast.error("Invalid credentials!");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
      style={{ 
        background: "linear-gradient(60deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)",
        border: "none",
      }}
    >
      {/* Logo top-left */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            alignItems: "center",
            gap: 5,
            display: "flex",
            fontWeight: "bold",
            fontSize: "24px",
            textDecoration: "none",
          }}
        >
           <img className='rounded-pill' src={assets.logo} alt="logo" width={180} height={100} />
          <span className="fw-bold fs-1 text-light ms-2"></span>
        </Link>
      </div>

      {/* Card */}
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4 text-info ">
          {isCreateAccount ? "Create Account" : "Login"}
        </h2>
        <form onSubmit={onSubmitHandler}>
          {isCreateAccount && (
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="form-control"
                placeholder="Enter the FullName"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Id
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="*********"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <Link to="/reset-password" className="text-decoration">
              Forgot Password
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill"
            disabled={loading}
          >
            {loading
              ? "Loading...."
              : isCreateAccount
              ? "Sign Up"
              : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0">
            {isCreateAccount ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setIsCreateAccount(false)}
                  className="text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <span
                  onClick={() => setIsCreateAccount(true)}
                  className="text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
