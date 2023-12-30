"use client";
import React, { useEffect, useState } from "react";
import "./MindmapTable.scss";
import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";
import Loading from "@/components/Loading/Loading";
import { usePathname, useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "@/components/Toast/toast";
import { mutate } from "swr";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const mindmapApi = "https://d3mq8y-8080.csb.app/users";

function MindmapTable() {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const fetcher = (url) => fetch(url).then((response) => response.json());
  const {
    data: userMindmap,
    isLoading,
    error,
  } = useSWR(`${mindmapApi}/${user?.email}`, fetcher);

  const [newUser, setNewUser] = useState({});

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleEdit = async (e) => {
    if (
      !e.target.className.includes("pi-trash") &&
      !e.target.className.includes("pi-file-edit")
    ) {
      const mindmaps = userMindmap?.mindmaps;
      const mindmap = mindmaps?.find(
        (mindmap) => mindmap.mindmapId === e.target.className
      );

      localStorage.setItem("shareMode", mindmap.shareMode);
      localStorage.setItem("title", mindmap.title);
      localStorage.setItem("description", mindmap.description);
      localStorage.setItem("shareImg", mindmap.shareImg);
      localStorage.setItem("mindmaps", JSON.stringify(mindmaps));
      router.push(`${pathname}/${e.target.className}`);
    } else if (e.target.className.includes("pi-file-edit")) {
      const mindmaps = userMindmap?.mindmaps;
      const mindmap = mindmaps?.find(
        (mindmap) => mindmap.mindmapId === e.target.id
      );
      localStorage.setItem("shareMode", mindmap.shareMode);
      localStorage.setItem("title", mindmap.title);
      localStorage.setItem("description", mindmap.description);
      localStorage.setItem("shareImg", mindmap.shareImg);
      localStorage.setItem("mindmaps", JSON.stringify(mindmaps));
      router.push(`${pathname}/${e.target.id}`);
    } else if (e.target.className.includes("pi-trash")) {
      const newMindmaps = userMindmap.mindmaps?.filter((mindmap) => {
        if (mindmap.mindmapId === e.target.getAttribute("data-id")) {
          return false;
        }
        return true;
      });
      const userUpdated = {
        ...userMindmap,
        mindmaps: newMindmaps,
      };
      setNewUser(userUpdated);
    }
  };

  const handleDelete = async () => {
    if (newUser.mindmaps.length === 0) {
      const response = await fetch(`${mindmapApi}/${userMindmap.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        notifySuccess("Xóa thành công");
        localStorage.removeItem("userExist");
        mutate(`${mindmapApi}/${user?.email}`);
      }
    } else {
      const response = await fetch(`${mindmapApi}/${userMindmap.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        notifySuccess("Xóa thành công");
        mutate(`${mindmapApi}/${user?.email}`);
      }
    }
  };
  // userMindmap?.id

  if (isLoading) {
    return (
      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="mindmap-table">
      <table width="100%" border="0" cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th width="10%">
              <input type="checkbox" />
            </th>
            <th width="40%">TÊN</th>
            <th>TẠO LÚC</th>
            <th>HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          {userMindmap
            ? userMindmap?.mindmaps?.map((mindmap) => {
                return (
                  <tr key={mindmap.mindmapId} onClick={handleEdit}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <p className={mindmap.mindmapId}>{mindmap.title}</p>
                      <p className={mindmap.mindmapId}>{mindmap.description}</p>
                    </td>
                    <td className={mindmap.mindmapId}>{mindmap.createdAt}</td>
                    <td>
                      <i className="pi pi-file-edit" id={mindmap.mindmapId}></i>
                      <i
                        className="pi pi-trash"
                        data-id={mindmap.mindmapId}
                        onClick={onOpen}
                      ></i>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure?
              </ModalHeader>
              <ModalBody>
                <p>Hãy nhớ rằng mọi sai lầm đều sẽ phải trả giá!!!</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default MindmapTable;
