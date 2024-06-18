"use client";

import ToolTip from "../../Comment/ToolTip";
import WriteRating from "../../Comment/WriteRating";
import MyCommentProvider from "../../../_context/MyCommentProvider";
import WriteText from "../../Comment/WriteText";

function EditComment() {
  return (
    <>
      <div className="mb-8 flex items-center gap-1">
        <p className="text-xl font-semibold text-gray-900">프로젝트를 평가해주세요</p>
        <ToolTip />
      </div>
      <div className="flex flex-col gap-6">
        <MyCommentProvider>
          <WriteRating />
          <WriteText mode="edit" />
        </MyCommentProvider>
      </div>
    </>
  );
}

export default EditComment;
