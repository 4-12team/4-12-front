"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import shareIcon from "@/public/icons/share.svg";
import { commentQueryKeys } from "@/app/_queryFactory/commentQuery";
import useToggleHook from "@/app/_hooks/useToggleHook";
import { projectQueryKeys } from "@/app/_queryFactory/projectQuery";
import CommentProfile from "../../../_components/Comment/CommentProfile";
import EnterRating from "../../../_components/Comment/EnterRating";
import EnterCommentProvider from "../../../_context/EnterCommentProvider";
import EnterText from "../../../_components/Comment/EnterText";
import EnterButton from "../../../_components/Comment/EnterButton";
import RatingBox from "./RatingBox";
import CommentDropbox from "./CommentDropbox";
import DetailLoading from "./DetailLoading";

interface CommentSectionProps {
  projectId: number;
  commentId: number;
}

function CommentSection({ projectId, commentId }: CommentSectionProps) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const { isOpen: commentEditOpen, toggleState } = useToggleHook();
  const { data: commentDetailData } = useQuery(commentQueryKeys.detail(projectId, commentId));
  const { data: ratingsData } = useQuery(projectQueryKeys.ratings(projectId, Number(userId)));

  if (!commentDetailData || !ratingsData) {
    return <DetailLoading />;
  }

  const transformedData = [
    ratingsData.ideaRank,
    ratingsData.designRank,
    ratingsData.functionRank,
    ratingsData.completionRank,
  ];

  return (
    <>
      <section className="mt-10 w-full p-4">
        <div className="flex items-center justify-between">
          <CommentProfile
            userId={commentDetailData?.authorId}
            userName={commentDetailData.authorName}
            userJob={commentDetailData.job}
          />
          <div className="relative flex items-center gap-2">
            <Image className="cursor-pointer" src={shareIcon} alt="공유하기." width={24} />
            <CommentDropbox toggleState={toggleState} commentId={commentId} projectId={projectId} />
          </div>
        </div>
      </section>
      {commentEditOpen ? (
        <section className=" mt-4 flex min-h-[300px] flex-col gap-10">
          <EnterCommentProvider>
            <EnterText commentValue={commentDetailData.comment} />
            <EnterRating ratingValue={transformedData} />
            <EnterButton onClick={() => console.log()} mode="edit" projectId={projectId} />
          </EnterCommentProvider>
        </section>
      ) : (
        <section className="mt-4">
          <p className="mt-4 min-h-[230px] w-full p-4 text-sm font-normal text-gray-900">
            {commentDetailData?.comment}
          </p>
          <RatingBox {...ratingsData} />
        </section>
      )}
    </>
  );
}

export default CommentSection;
