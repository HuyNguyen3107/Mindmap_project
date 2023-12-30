"use client";
import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import PrivateShare from "../PrivateShare/PrivateShare";
import PublicShare from "../PublicShare/PublicShare";
import { usePathname } from "next/navigation";
import { notifyWarning, notifySuccess } from "@/components/Toast/toast";

const mindmapApi = "https://d3mq8y-8080.csb.app/users";

function ShareButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shareMode, setShareMode] = useState("private");
  const [mindmaps, setMindmaps] = useState([]);
  const pathname = usePathname();
  const myMindmapId = pathname.slice(9);
  const formRef = useRef();
  const myMindmap = mindmaps?.find(
    (mindmap) => myMindmapId === mindmap.mindmapId
  );

  const getValueForm = async (formValue) => {
    const { title, description, shareImg } = formValue;
    const mindmapList = JSON.parse(localStorage.getItem("mindmaps"));
    const userEmail = localStorage.getItem("userEmail");
    const newMindmaps = mindmapList?.map((mindmap) => {
      if (mindmap.mindmapId === myMindmapId) {
        return {
          ...mindmap,
          title,
          description,
          shareImg,
        };
      }
      return mindmap;
    });
    const userUpdated = {
      id: userEmail,
      mindmaps: newMindmaps,
    };
    const response = await fetch(`${mindmapApi}/${userEmail}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userUpdated),
    });
    if (response.ok) {
      localStorage.setItem("title", title);
      localStorage.setItem("description", description);
      localStorage.setItem("shareImg", shareImg);
      notifySuccess("Lưu chia sẻ thành công");
    }
  };

  const handleShare = async () => {
    const checkSaved = mindmaps.find(
      (mindmap) => mindmap.mindmapId === myMindmapId
    );
    if (!checkSaved) {
      notifyWarning("Vui lòng lưu dữ liệu trước khi chia sẻ :V");
    } else {
      if (localStorage.getItem("shareMode") === "public") {
        formRef.current.click();
      } else if (localStorage.getItem("shareMode") === "private") {
        const mindmapList = JSON.parse(localStorage.getItem("mindmaps"));
        const userEmail = localStorage.getItem("userEmail");
        const newMindmaps = mindmapList?.map((mindmap) => {
          if (mindmap.mindmapId === myMindmapId) {
            return {
              ...mindmap,
              shareMode: "private",
            };
          }
          return mindmap;
        });
        const userUpdated = {
          id: userEmail,
          mindmaps: newMindmaps,
        };
        const response = await fetch(`${mindmapApi}/${userEmail}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userUpdated),
        });
        if (response.ok) {
          notifySuccess("Lưu chia sẻ thành công");
        }
      }
      // console.log(formRef.current);
    }
  };
  return (
    <>
      <Button
        color="primary"
        onClick={() => {
          localStorage.setItem("shareMode", shareMode);
          const mindmaps = JSON.parse(localStorage.getItem("mindmaps"));
          setMindmaps(mindmaps);
          onOpen();
        }}
      >
        <i className="pi pi-share-alt"></i>
        Share
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Có chắc là bạn muốn chia sẻ ko?
              </ModalHeader>
              <ModalBody>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      columnGap: "20px",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                  >
                    <div
                      style={{
                        color: `${shareMode === "private" ? "green" : ""}`,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        localStorage.setItem("shareMode", "private");
                        setShareMode("private");
                      }}
                    >
                      Private
                    </div>
                    <div
                      style={{
                        color: `${shareMode === "public" ? "green" : ""}`,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        localStorage.setItem("shareMode", "public");
                        setShareMode("public");
                      }}
                    >
                      Public
                    </div>
                  </div>
                  <div>
                    {shareMode === "private" ? (
                      <PrivateShare />
                    ) : (
                      <PublicShare
                        mindmaps={mindmaps}
                        getValueForm={getValueForm}
                        ref={formRef}
                      />
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={(e) => {
                    e.preventDefault();
                    handleShare();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShareButton;
