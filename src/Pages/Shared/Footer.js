import React from "react";
import footer from "../../assets/images/footer.png";

const Footer = () => {
  return (
    <footer style={{ background: `url(${footer})`, backgroundSize: "cover" }}>
      <div className="footer p-10 ">
        <div>
          <span className="footer-title">Services</span>
          <a href="#id" className="link link-hover">
            Branding
          </a>
          <a href="#id" className="link link-hover">
            Design
          </a>
          <a href="#id" className="link link-hover">
            Marketing
          </a>
          <a href="#id" className="link link-hover">
            Advertisement
          </a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a href="#id" className="link link-hover">
            About us
          </a>
          <a href="#id" className="link link-hover">
            Contact
          </a>
          <a href="#id" className="link link-hover">
            Jobs
          </a>
          <a href="#id" className="link link-hover">
            Press kit
          </a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a href="#id" className="link link-hover">
            Terms of use
          </a>
          <a href="#id" className="link link-hover">
            Privacy policy
          </a>
          <a href="#id" className="link link-hover">
            Cookie policy
          </a>
        </div>
      </div>
      <p className="py-5 text-center">
        Copyright &copy; 2022 - All right reserved
      </p>
    </footer>
  );
};

export default Footer;
