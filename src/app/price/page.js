export const metadata = {
  title: "Bảng giá - Mindmap Flow",
  description: "Mindmap Flow - Công cụ xây dựng sơ đồ tư duy mạnh m",
};

import React from "react";
import "../../../public/assets/scss/price.scss";
import price1Img from "../../../public/assets/images/price1.jpg";
import price2Img from "../../../public/assets/images/price2.jpg";
import price3Img from "../../../public/assets/images/price3.jpg";
import Image from "next/image";
import { Button, Divider } from "@nextui-org/react";

function PricePage() {
  return (
    <section id="price">
      <div>
        <h3>Flexible Plans</h3>
        <p>Choose a plan that works best for you and your team.</p>
        <div className="price-detail">
          <div>
            <div>
              <div>
                <Image src={price1Img} alt="price1" />
              </div>
              <div>
                <span>Basic</span>
                <span>
                  <sup>$</sup>10/user
                </span>
              </div>
            </div>
            <Divider />
            <div>
              <p>
                <i className="pi pi-check"></i>
                Get started with messaging
              </p>
              <p>
                <i className="pi pi-check"></i>
                Flexible team meetings
              </p>
              <p>
                <i className="pi pi-check"></i>5 TB cloud storage
              </p>
            </div>
            <Button color="secondary">
              Choose Plan
              <i className="pi pi-arrow-right"></i>
            </Button>
          </div>
          <div>
            <div>
              <div>
                <Image src={price2Img} alt="price2" />
              </div>
              <div>
                <span>Startup</span>
                <span>
                  <sup>$</sup>24/user
                </span>
              </div>
            </div>
            <Divider />
            <div>
              <p>
                <i className="pi pi-check"></i>
                GAll features in Basic
              </p>
              <p>
                <i className="pi pi-check"></i>
                Flexible call scheduling
              </p>
              <p>
                <i className="pi pi-check"></i>15 TB cloud storage
              </p>
            </div>
            <Button color="secondary">
              Choose Plan
              <i className="pi pi-arrow-right"></i>
            </Button>
          </div>
          <div>
            <div>
              <div>
                <Image src={price3Img} alt="price3" />
              </div>
              <div>
                <span>Enterprise</span>
                <span>
                  <sup>$</sup>35 /user
                </span>
              </div>
            </div>
            <Divider />
            <div>
              <p>
                <i className="pi pi-check"></i>
                All features in Startup
              </p>
              <p>
                <i className="pi pi-check"></i>
                Growth oriented
              </p>
              <p>
                <i className="pi pi-check"></i>Unlimited cloud storage
              </p>
            </div>
            <Button color="secondary">
              Choose Plan
              <i className="pi pi-arrow-right"></i>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricePage;
