export const metadata = {
  title: "Liên hệ - Mindmap Flow",
  description: "Mindmap Flow - Công cụ xây dựng sơ đồ tư duy mạnh mẽ",
};

import React from "react";
import "../../../public/assets/scss/contact.scss";
import FormContact from "./FormContact";

function ContactPage() {
  return (
    <section id="contact">
      <div>
        <h3>Contact Us</h3>
        <FormContact />
      </div>
    </section>
  );
}

export default ContactPage;
