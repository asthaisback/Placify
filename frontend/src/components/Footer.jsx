import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaLinkedin,
  FaCode,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <footer>
        <div>
          <img src="/logo.png" alt="logo" />
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>KIET, Ghaziabad, India</li>
            <li>
              <a href="mailto:guptaastha627@gmail.com">
                guptaastha627@gmail.com
              </a>
            </li>
            <li>+91 7417083434</li>
          </ul>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/in/astha-gupta-55b208220/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <FaLinkedin />
                </span>
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="https://leetcode.com/u/_asthagupta23/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <FaCode />
                </span>
                <span>LeetCode</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/asthaisback"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <FaGithub />
                </span>
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/_asthagupta23/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <FaInstagram />
                </span>
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="copyright">
        &copy; Copyright 2024. All Rights Reserved by Placify
      </div>
    </>
  );
};

export default Footer;
