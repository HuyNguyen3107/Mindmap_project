"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import useSWR from "swr";
import { handleMetadata } from "./action";

const mindmapApi = "https://d3mq8y-8080.csb.app/users";

function InputMetadata() {
  const { user } = useUser();
  const fetcher = (url) => fetch(url).then((response) => response.json());
  const {
    data: userMindmap,
    isLoading,
    error,
  } = useSWR(`${mindmapApi}/${user?.email}`, fetcher);
  const pathname = usePathname();
  const formRef = useRef();
  const buttonRef = useRef();
  let title;
  let description;
  if (!isLoading) {
    const mindmap = userMindmap?.mindmaps?.find((mindmap) => {
      if (mindmap.mindmapId === pathname.slice(9)) {
        return true;
      }
    });
    title = mindmap?.title;
    description = mindmap?.description;
  } else {
    return <div>Loading...</div>;
  }
  const handleChange = async (e) => {
    document.cookie = `mindmapList=${localStorage.getItem("mindmaps")}`;
    document.cookie = `userEmail=${localStorage.getItem("userEmail")}`;
    document.cookie = `myMindmapId=${pathname.slice(9)}`;
    buttonRef.current.click();
  };
  return (
    <form action={handleMetadata} ref={formRef}>
      <input
        type="text"
        defaultValue={title ? title : "Mindmap chưa có tên"}
        name="title"
        className="meta-title"
        onChange={handleChange}
      />
      <input
        type="text"
        defaultValue={description ? description : "Chưa có mô tả"}
        name="desc"
        className="meta-desc"
        onChange={handleChange}
      />
      <button ref={buttonRef}></button>
    </form>
  );
}

export default InputMetadata;
