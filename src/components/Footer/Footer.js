import React from "react";
import "./Footer.scss";
import Link from "next/link";
import { Button, Divider } from "@nextui-org/react";

function Footer() {
  return (
    <footer id="footer">
      <div>
        <div className="footer-detail">
          <div className="footer-feature">
            <span>Features</span>
            <ul>
              <li>
                <Link href={"#"}>Cool stuff</Link>
              </li>
              <li>
                <Link href={"#"}>Random feature</Link>
              </li>
              <li>
                <Link href={"#"}>Team feature</Link>
              </li>
              <li>
                <Link href={"#"}>Stuff for developers</Link>
              </li>
              <li>
                <Link href={"#"}>Another one</Link>
              </li>
              <li>
                <Link href={"#"}>Last time</Link>
              </li>
            </ul>
          </div>
          <div className="footer-resources">
            <span>Resources</span>
            <ul>
              <li>
                <Link href={"#"}>Resource</Link>
              </li>
              <li>
                <Link href={"#"}>Resource name</Link>
              </li>
              <li>
                <Link href={"#"}>Another resource</Link>
              </li>
              <li>
                <Link href={"#"}>Final resource</Link>
              </li>
            </ul>
          </div>
          <div className="footer-about">
            <span>About</span>
            <ul>
              <li>
                <Link href={"#"}>Team</Link>
              </li>
              <li>
                <Link href={"#"}>Locations</Link>
              </li>
              <li>
                <Link href={"#"}>Privacy</Link>
              </li>
              <li>
                <Link href={"#"}>Terms</Link>
              </li>
            </ul>
          </div>
          <div className="footer-help">
            <span>Help</span>
            <ul>
              <li>
                <Link href={"#"}>Support</Link>
              </li>
              <li>
                <Link href={"#"}>Help Center</Link>
              </li>
              <li>
                <Link href={"#"}>Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-connect">
          <span>Stay connected</span>
          <div>
            <i className="pi pi-facebook"></i>
            <i className="pi pi-google"></i>
            <i className="pi pi-twitter"></i>
          </div>
        </div>
      </div>
      <Divider />
      <div className="footer-more">
        <div>
          <span>FWR</span>
          <div>
            <span>Address</span>
            <div>
              <span>123 6th St.</span>
              <span>Melbourne, FL 32904</span>
            </div>
          </div>
          <div>
            <span>Free Resources</span>
            <div>
              <span>Use our HTML blocks for FREE.</span>
              <span>All are MIT License</span>
            </div>
          </div>
        </div>
        <Button color="secondary">Get Started</Button>
      </div>
    </footer>
  );
}

export default Footer;
