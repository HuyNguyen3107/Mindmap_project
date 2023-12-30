import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import mindmapImg from "../../public/assets/images/mindmap.webp";
import "../../public/assets/scss/home.scss";

function Home() {
  return (
    <section id="home">
      <div>
        <h2>Study effectively with mind maps</h2>
        <Button color="secondary">Free to use</Button>
        <div className="home-img">
          <Image src={mindmapImg} alt="mind map images" />
        </div>
        <div className="home-desc">
          <div>
            <span>EASY TO USE</span>
            <p>
              FWR blocks bring in an air of fresh design with their creative
              layouts and blocks, which are easily customizable.
            </p>
          </div>
          <div>
            <span>UNLIMITED</span>
            <p>
              FWR blocks are the cleanest pieces of HTML blocks, which are built
              with utmost care to quality and usability.
            </p>
          </div>
          <div>
            <span>MANAGE AND SHARE</span>
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

export default Home;
