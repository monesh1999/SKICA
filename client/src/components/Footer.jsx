import React from "react";


// style={{ background: "linear-gradient(135deg, #6a11cb, #2575fc)" }}
const Footer = () => {
  return (
    <footer className="text-white pt-5 pb-4" style={{
        background: "linear-gradient(30deg,rgba(12, 0, 107, 1) 0%,rgba(9, 9, 121, 1) 50%,rgba(0, 212, 255, 1) 100%)",
  color: "white"          
      }}> 
      <div className="container text-md-left">
        <div className="row text-md-left">

          {/* Column 1: About */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Our World</h5>
            <p>Explore our collections, philosophy, and collaborations with artists worldwide.</p>
          </div>

          {/* Column 2: Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Links</h5>
            <p><a href="#!" className="text-white text-decoration-none">About Us</a></p>
            <p><a href="#!" className="text-white text-decoration-none">Collections</a></p>
            <p><a href="#!" className="text-white text-decoration-none">Contact</a></p>
            <p><a href="#!" className="text-white text-decoration-none">FAQ</a></p>
          </div>

          {/* Column 3: Assistance */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Assistance</h5>
            <p><a href="#!" className="text-white text-decoration-none">Career</a></p>
            <p><a href="#!" className="text-white text-decoration-none">Info</a></p>
            
          </div>

          {/* Column 4: Newsletter */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Newsletter</h5>
            <p>Subscribe to get the latest updates and offers:</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Email address" />
              <button className="btn btn-warning text-dark">Subscribe</button>
            </div>
          </div>

        </div>

        <hr className="mb-4" style={{ borderColor: "rgba(255,255,255,0.3)" }} />

        {/* Bottom row */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p>
              © {new Date().getFullYear()} Skyca. All Rights Reserved.
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-right">
              <a href="#!" className="text-white me-4"><i className="fab fa-facebook-f"></i></a>
              <a href="#!" className="text-white me-4"><i className="fab fa-twitter"></i></a>
              <a href="#!" className="text-white me-4"><i className="fab fa-instagram"></i></a>
              <a href="#!" className="text-white"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
