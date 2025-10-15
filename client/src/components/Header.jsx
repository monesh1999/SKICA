import { useContext } from "react";
// import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header =() =>{
  const {userData} = useContext(AppContext);
   const navigate = useNavigate();
    return(
       <div
  className="text-center d-flex flex-column align-items-center justify-content-center py-5 px-3"
   style={{ minHeight: "40vh"
    }}
>
  {/* <img src={assets.frontlogo} alt="header" width={320} className="mb-4" /> */}

  <h5 className="fw-semibold">
    Hey {userData ? userData.name :'Developer'} <span role="img" aria-label="wave">👋</span>
  </h5>

  <h1 className="fw-bold display-5 mb-3">Welcome to our product</h1>

  <p className="text-muted fs-5 mb-4" style={{ maxWidth: "500px" }}>
    Let's start with a quick product tour and set up authentication in no time!
  </p>

  <button className="btn btn-outline-primary rounded-pill px-4 py-2" onClick={() => navigate("/explore")}>
    Explore
  </button>
</div>

    )
}

export default Header;