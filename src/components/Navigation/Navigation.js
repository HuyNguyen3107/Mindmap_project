"use client";
import React from "react";
import "./Navigation.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import AuthButton from "../AuthButton/AuthButton";
import Logged from "../Logged/Logged";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";

import { useUser } from "@auth0/nextjs-auth0/client";

function Navigation() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  const isActive = (path) => {
    return path === pathname;
  };
  if (isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          inset: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          zIndex: "1000",
          fontSize: "40px",
          fontWeight: "800",
        }}
      >
        Loading...
      </div>
    );
  }
  return (
    <nav id="navigation">
      <ul className="nav-list">
        <li className={clsx(isActive("/") && "active")}>
          <Link href={"/"}>Home</Link>
        </li>
        <li className={clsx(isActive("/about") && "active")}>
          <Link href={"/about"}>About</Link>
        </li>
        <li className={clsx(isActive("/feature") && "active")}>
          <Link href={"/feature"}>Feature</Link>
        </li>
        <li className={clsx(isActive("/price") && "active")}>
          <Link href={"/price"}>Price</Link>
        </li>
        <li className={clsx(isActive("/contact") && "active")}>
          <Link href={"/contact"}>Contact</Link>
        </li>
      </ul>
      <ThemeSwitcher />
      {user ? (
        <Logged name={user.given_name} email={user.email} />
      ) : (
        <AuthButton />
      )}
    </nav>
  );
}

export default Navigation;
