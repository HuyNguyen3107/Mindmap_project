"use client";
import React from "react";
import "./AuthButton.scss";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";

function AuthButton() {
  return (
    <div className="auth-button">
      <Link href={"/api/auth/login"} className="btn-login">
        Login
      </Link>
      <Link href={"/api/auth/login"} className="btn-register">
        Register
      </Link>
    </div>
  );
}

export default AuthButton;
