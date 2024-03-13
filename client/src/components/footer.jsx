import React from "react";
//import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "./footer_style.css";

export default function Footer() {
  return (
    <div id="footer-style">
      <footer class="footer">
        <div class="footer__addr">
          <h1 class="footer__logo">Edificio '24</h1>

          <h2>Dept. of Civil And Infrastructure Engineering</h2>

          <address className="address">
            Indian Institute of Technology Jodhpur
            <br />
            NH 62 Nagaur Road Karwar 342030,
            <br /> Jodhpur District, Rajasthan.
            <br />
            <a class="footer__btn" href="mailto:edificio_cie@iitj.ac.in">
              Email Us
            </a>
            <a class="footer__btn" href="tel:+91 8769014447">
              Phone Number
            </a>
          </address>
        </div>

        <ul class="footer__nav">
          <li class="nav__item">
            <h2 class="nav__title">Socials</h2>
            <ul class="nav__ul">
              <li>
                <big>
                  <a
                    href="https://www.instagram.com/edificio_cie.iitj/"
                    target={"_blank"}
                  >
                    <FaIcons.FaInstagram /> instagram
                  </a>
                </big>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/company/edificio-iit-jodhpur/"
                  target={"_blank"}
                >
                  <FaIcons.FaLinkedin /> linkedin
                </a>
              </li>

              <li>
                <a href="#"></a>
              </li>
            </ul>
          </li>
        </ul>

        <div class="legal">
          <p>Innovate Collaborate Transform</p>

          <div class="legal__links">
            <span>Made with &#9829; by the Web Dev Team of Edificio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
