"use client";
import React, { useRef, forwardRef } from "react";
import "./PublicShare.scss";
import { usePathname } from "next/navigation";

const PublicShare = forwardRef(function PublicShare(
  { mindmaps, getValueForm },
  ref
) {
  const pathname = usePathname();
  const mindmapId = pathname.slice(9);
  const myMindmap = mindmaps?.find(
    (mindmap) => mindmapId === mindmap.mindmapId
  );
  const titleRef = useRef();
  const descRef = useRef();
  const imgRef = useRef();

  const handleFormValue = () => {
    const formValue = {
      title: titleRef.current.value,
      description: descRef.current.value,
      shareImg: imgRef.current.value,
    };
    getValueForm(formValue);
  };

  return (
    <form
      action=""
      className="public-share"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        handleFormValue();
      }}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor="">Liên kết chia sẻ</label>
        <input
          type="text"
          placeholder="Liên kết chia sẻ..."
          defaultValue={window.location.href}
        />
      </div>
      <div>
        <label htmlFor="">Tiêu đề</label>
        <input
          type="text"
          placeholder="Tiêu đề..."
          defaultValue={
            myMindmap?.title ? myMindmap?.title : "Mindmap chưa có tên"
          }
          ref={titleRef}
        />
      </div>
      <div>
        <label htmlFor="">Mô tả</label>
        <textarea
          rows="5"
          placeholder="Mô tả..."
          defaultValue={
            myMindmap?.description ? myMindmap?.description : "Chưa có mô tả"
          }
          ref={descRef}
        ></textarea>
      </div>
      <div>
        <label htmlFor="">Ảnh chia sẻ</label>
        <input
          type="text"
          placeholder="Ảnh chia sẻ..."
          defaultValue={
            myMindmap?.shareImg
              ? myMindmap?.shareImg
              : "https://images2.thanhnien.vn/zoom/600_315/528068263637045248/2023/6/6/onepiece-1686048581557705028090-14-0-852-1600-crop-16860486106902104191106.jpg"
          }
          ref={imgRef}
        />
      </div>
    </form>
  );
});

export default PublicShare;
