export const metadata = {
  title: "Tính năng chính - Mindmap Flow",
  description: "Mindmap Flow - Công cụ xây dựng sơ đồ tư duy mạnh m",
};

import React from "react";
import "../../../public/assets/scss/feature.scss";
function FeaturePage() {
  return (
    <section id="feature">
      <div>
        <h3>Features</h3>
        <p>
          The main aim of creating FWR blocks is to help designers, developers
          and agencies create websites and web apps quickly and easily. Each and
          every block uses minimal custom styling and is based on the utility
          first Tailwind framework.
        </p>
        <button>Learn more</button>
        <div className="feature-detail">
          <div>
            <i className="pi pi-bolt"></i>
            <span>Fresh Design</span>
            <p>
              FWR blocks bring in an air of fresh design with their creative
              layouts and blocks, which are easily customizable.
            </p>
          </div>
          <div>
            <i className="pi pi-server"></i>
            <span>Clean Code</span>
            <p>
              FWR blocks are the cleanest pieces of HTML blocks, which are built
              with utmost care to quality and usability.
            </p>
          </div>
          <div>
            <i className="pi pi-wrench"></i>
            <span>Perfect Tool</span>
            <p>
              FWR blocks is a perfect tool for designers, developers and
              agencies looking to create stunning websites in no time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturePage;
