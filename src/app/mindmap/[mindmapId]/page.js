import React from "react";
import "../../../../public/assets/scss/mindmapDetail.scss";
import InputMetadata from "./components/InputMetadata/InputMetadata";
import ControlButton from "./components/ControlButton/ControlButton";
import MindmapFlowContainer from "./components/MindmapFlowContainer/MindmapFlowContainer";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const mindmapApi = "https://d3mq8y-8080.csb.app/users";

const getUsers = async () => {
  const response = await fetch(mindmapApi, {
    cache: "no-cache",
    next: {
      tags: ["users"],
    },
  });
  return response.json();
};

export const generateMetadata = async ({ params }) => {
  const { mindmapId } = params;
  const users = await getUsers();
  const user = users?.find((user) => {
    const checkMindmap = user?.mindmaps?.find(
      (mindmap) => mindmap?.mindmapId === mindmapId
    );
    if (checkMindmap) {
      return true;
    }
    return false;
  });
  const mindmap = user?.mindmaps?.find(
    (mindmap) => mindmap?.mindmapId === mindmapId
  );
  return {
    title: mindmap?.title ? mindmap?.title : "Mindmap không có tên",
    description: mindmap?.description
      ? mindmap?.description
      : "Mindmap Flow - Công cụ xây dựng sơ đồ tư duy mạnh mẽ",
    openGraph: {
      title: mindmap?.title ? mindmap?.title : "Mindmap không có tên",
      images: [
        mindmap?.shareImg
          ? mindmap?.shareImg
          : "https://images2.thanhnien.vn/zoom/600_315/528068263637045248/2023/6/6/onepiece-1686048581557705028090-14-0-852-1600-crop-16860486106902104191106.jpg",
      ],
    },
  };
};

async function MindmapDetailPage({ params }) {
  const { mindmapId } = params;
  const users = await getUsers();
  const cookieList = cookies();
  const userEmail = cookieList.get("email");
  let checkAuthUser = true;
  const user = users?.find((user) => {
    const checkMindmap = user?.mindmaps?.find(
      (mindmap) => mindmap?.mindmapId === mindmapId
    );
    if (checkMindmap) {
      return true;
    }
    return false;
  });
  if (user) {
    const mindmap = user?.mindmaps?.find(
      (mindmap) => mindmap?.mindmapId === mindmapId
    );
    if (userEmail) {
      if (mindmap.shareMode === "private" && user.id !== userEmail.value) {
        notFound();
      } else if (mindmap.shareMode === "public") {
        if (user.id !== userEmail.value) {
          checkAuthUser = false;
        }
      }
    } else {
      if (mindmap.shareMode === "private") {
        notFound();
      }
    }
  }
  return (
    <section id="mindmap-detail">
      <div>
        <div className="mindmap-control">
          <InputMetadata />
          {userEmail && checkAuthUser ? <ControlButton /> : null}
        </div>
        <div className="mindmap-flow">
          <MindmapFlowContainer />
        </div>
      </div>
    </section>
  );
}

export default MindmapDetailPage;
