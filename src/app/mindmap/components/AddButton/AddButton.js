"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import { usePathname, useRouter } from "next/navigation";

function AddButton() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Button
      color="secondary"
      onClick={() => {
        const date = new Date();
        const mindmapId = uuidv4();
        localStorage.setItem("createdAt", date);
        localStorage.setItem("mindmapId", mindmapId);
        if (localStorage.getItem("shareMode")) {
          localStorage.removeItem("shareMode");
        }
        if (localStorage.getItem("title")) {
          localStorage.removeItem("title");
        }
        if (localStorage.getItem("description")) {
          localStorage.removeItem("description");
        }
        if (localStorage.getItem("shareImg")) {
          localStorage.removeItem("shareImg");
        }
        const url = `${pathname}/${mindmapId}`;
        router.push(url);
      }}
    >
      Add New
    </Button>
  );
}

export default AddButton;
