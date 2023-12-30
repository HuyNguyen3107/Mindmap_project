"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const mindmapApi = "https://d3mq8y-8080.csb.app/users";

const getMindmaps = async (id) => {
  const response = await fetch(`${mindmapApi}/${id}`, {
    cache: "no-cache",
  });
  return response.json();
};

export const handleMetadata = async (formData) => {
  const cookieList = cookies();
  const userEmail = cookieList.get("userEmail");
  const user = await getMindmaps(userEmail.value);
  const mindmapList = user.mindmaps;
  const myMindmapId = cookieList.get("myMindmapId");
  const title = formData.get("title");
  const description = formData.get("desc");

  const newMindmaps = mindmapList?.map((mindmap) => {
    if (mindmap.mindmapId === myMindmapId.value) {
      return {
        ...mindmap,
        title,
        description,
      };
    }
    return mindmap;
  });
  const userUpdated = {
    id: userEmail.value,
    mindmaps: newMindmaps,
  };
  const response = await fetch(`${mindmapApi}/${userEmail.value}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userUpdated),
  });
  if (response.ok) {
    revalidateTag("users");
  }
};
