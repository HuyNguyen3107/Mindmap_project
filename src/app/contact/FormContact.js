"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/components/Toast/toast";

function FormContact() {
  const form = useRef();
  const msgRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const sendRef = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    if (
      nameRef.current.value &&
      emailRef.current.value &&
      phoneRef.current.value &&
      msgRef.current.value
    ) {
      sendRef.current.disabled = true;
      sendRef.current.value = "Loading...";
      emailjs
        .sendForm(
          "service_1rlj28b",
          "template_5ufe84f",
          form.current,
          "SiFGsIAwnytX5LwCC"
        )
        .then(
          (result) => {
            console.log(result.text);
            notifySuccess("Gửi Email thành công <3");
            sendRef.current.disabled = false;
            sendRef.current.value = "Send";
            msgRef.current.value = "";
          },
          (error) => {
            console.log(error.text);
            notifyError("Gửi Email không thành công :((");
            sendRef.current.disabled = false;
            sendRef.current.value = "Send";
            msgRef.current.value = "";
          }
        );
    } else {
      notifyWarning("Vui lòng nhập đủ các trường ");
    }
  };
  return (
    <form action="" className="form-contact" ref={form} onSubmit={sendEmail}>
      <input
        type="text"
        placeholder="Your Name"
        name="user_name"
        ref={nameRef}
      />
      <input
        type="email"
        placeholder="Email"
        name="user_email"
        ref={emailRef}
      />
      <input type="tel" placeholder="Phone" name="user_phone" ref={phoneRef} />
      <textarea
        placeholder="Write your message..."
        rows={10}
        name="message"
        ref={msgRef}
      ></textarea>
      <input type="submit" value="Send" className="send-email" ref={sendRef} />
    </form>
  );
}

export default FormContact;
