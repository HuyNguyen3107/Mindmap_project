"use client";
import React from "react";
import MindmapFlow from "../MindmapFlow/MindmapFlow";
import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";
import { usePathname } from "next/navigation";

const mindmapApi = "https://d3mq8y-8080.csb.app/users";

function MindmapFlowContainer() {
  const { user } = useUser();
  const fetcher = (url) => fetch(url).then((response) => response.json());
  const {
    data: userMindmap,
    isLoading,
    error,
  } = useSWR(`${mindmapApi}/${user?.email}`, fetcher);
  const pathname = usePathname();
  let nodes;
  let edges;
  let nodeId;
  if (!isLoading) {
    const mindmap = userMindmap?.mindmaps?.find((mindmap) => {
      if (mindmap.mindmapId === pathname.slice(9)) {
        return true;
      }
    });
    nodes = mindmap?.nodes;
    edges = mindmap?.edges;
    nodeId = mindmap?.nodeId;
  }
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <MindmapFlow nodes={nodes} edges={edges} nodeId={nodeId} />
      )}
    </>
  );
}

export default MindmapFlowContainer;
