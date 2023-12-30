"use client";
import React, { useEffect } from "react";
import "./Logged.scss";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";

function Logged({ name, email }) {
  useEffect(() => {
    document.cookie = `email=${email}`;
  }, []);
  return (
    <div className="logged">
      <span>Hi, {name}</span>
      <Link href={"/mindmap"}>Mindmap</Link>
      {/* <Button color="secondary">Logout</Button> */}
      <Link
        href={"/api/auth/logout"}
        className="btn-logout"
        onClick={() => {
          document.cookie = `email=${email};expires=${new Date().toUTCString()}`;
        }}
      >
        Logout
      </Link>
    </div>
  );
}

export default Logged;
