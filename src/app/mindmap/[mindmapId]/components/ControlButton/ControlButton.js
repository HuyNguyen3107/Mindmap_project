"use client";
import { Button } from "@nextui-org/react";
import { notifySuccess } from "@/components/Toast/toast";
const mindmapApi = "https://d3mq8y-8080.csb.app/users";
import { useUser } from "@auth0/nextjs-auth0/client";
import ShareButton from "../ShareButton/ShareButton";
import { useEffect } from "react";
function ControlButton() {
  const { user } = useUser();
  const handleSave = async () => {
    const isUserExist = localStorage.getItem("userExist");
    if (isUserExist) {
      const mindmaps = JSON.parse(localStorage.getItem("mindmaps"));
      const mindmapId = localStorage.getItem("mindmapId");
      const checkMindmap = mindmaps?.find((mindmap) => {
        return mindmapId + "" === mindmap.mindmapId + "";
      });
      let newMindmaps;
      if (checkMindmap) {
        newMindmaps = Array.from(mindmaps)?.map((mindmap) => {
          if (mindmapId + "" === mindmap.mindmapId + "") {
            return {
              ...mindmap,
              nodes: JSON.parse(localStorage.getItem("nodes")),
              edges: JSON.parse(localStorage.getItem("edges")),
              nodeId: localStorage.getItem("nodeId"),
              shareMode: localStorage.getItem("shareMode")
                ? localStorage.getItem("shareMode")
                : "private",
              title: localStorage.getItem("title")
                ? localStorage.getItem("title")
                : "Mindmap không có tên",
              description: localStorage.getItem("description")
                ? localStorage.getItem("description")
                : "Chưa có mô tả",
              shareImg: localStorage.getItem("shareImg")
                ? localStorage.getItem("shareImg")
                : "https://images2.thanhnien.vn/zoom/600_315/528068263637045248/2023/6/6/onepiece-1686048581557705028090-14-0-852-1600-crop-16860486106902104191106.jpg",
            };
          }
          return mindmap;
        });
      } else {
        const newMindmap = {
          mindmapId: localStorage.getItem("mindmapId"),
          createdAt: localStorage.getItem("createdAt"),
          nodes: JSON.parse(localStorage.getItem("nodes")),
          edges: JSON.parse(localStorage.getItem("edges")),
          nodeId: localStorage.getItem("nodeId"),
          shareMode: "private",
          title: "Mindmap không có tên",
          description: "Chưa có mô tả",
          shareImg:
            "https://images2.thanhnien.vn/zoom/600_315/528068263637045248/2023/6/6/onepiece-1686048581557705028090-14-0-852-1600-crop-16860486106902104191106.jpg",
        };
        newMindmaps = [...mindmaps, newMindmap];
      }
      const updatedUser = {
        id: user?.email,
        mindmaps: newMindmaps,
      };
      const response = await fetch(`${mindmapApi}/${user?.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        notifySuccess("Lưu thành công");
        localStorage.setItem("mindmaps", JSON.stringify(newMindmaps));
      }
    } else {
      const mindmapData = {
        id: user?.email,
        mindmaps: [
          {
            mindmapId: localStorage.getItem("mindmapId"),
            createdAt: localStorage.getItem("createdAt"),
            nodes: JSON.parse(localStorage.getItem("nodes")),
            edges: JSON.parse(localStorage.getItem("edges")),
            nodeId: localStorage.getItem("nodeId"),
            shareMode: "private",
            title: "Mindmap không có tên",
            description: "Chưa có mô tả",
            shareImg:
              "https://images2.thanhnien.vn/zoom/600_315/528068263637045248/2023/6/6/onepiece-1686048581557705028090-14-0-852-1600-crop-16860486106902104191106.jpg",
          },
        ],
      };

      const response = await fetch(mindmapApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mindmapData),
      });
      if (response.ok) {
        notifySuccess("Lưu thành công");
        localStorage.setItem("userExist", "exist");
        localStorage.setItem("mindmaps", JSON.stringify(mindmapData.mindmaps));
      }
    }
  };

  return (
    <div>
      <Button color="success" onClick={handleSave}>
        <i className="pi pi-save"></i>
        Save
      </Button>
      <ShareButton />
    </div>
  );
}

export default ControlButton;
