import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <script>{year}</script> © Developed by xyz Developer.
          </div>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              Crafted with <i className="mdi mdi-heart text-danger"></i> by{" "}
              <Link>xyz Developer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
