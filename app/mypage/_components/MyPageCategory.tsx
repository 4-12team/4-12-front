"use client";
import Image from "next/image";
import { MouseEvent } from "react";
import { myProjectList, wishProjectList } from "@/app/_components/ProjectList/mockDataCardList";
import selectProfileIcon from "@/public/icons/blackProfile.svg";
import defaultProfileIcon from "@/public/icons/defaultProfile.svg";
import selectHeartIcon from "@/public/icons/fullHeart.svg";
import defaultHeartIcon from "@/public/icons/grayHeart.svg";
import ProjectCategoryButton from "./ProjectCategoryButton";

interface MyPageCategory {
  selectCategory: string;
  handleSelectCategory: (event: MouseEvent<HTMLButtonElement>) => void;
}

function MyPageCategory({ selectCategory, handleSelectCategory }: MyPageCategory) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-bold text-gray-900">마이페이지</div>
      <ProjectCategoryButton onClick={handleSelectCategory} id={"myProject"} isSelect={selectCategory === "myProject"}>
        <div className="flex items-center gap-2.5">
          <Image
            width={24}
            height={24}
            src={selectCategory === "myProject" ? selectProfileIcon : defaultProfileIcon}
            alt="내 프로젝트 보기"
          />
          <div
            className={`text-sm font-semibold ${selectCategory === "myProject" ? defaultHeartIcon : selectHeartIcon}`}>
            내 프로젝트
          </div>
        </div>
        <div>{`(${myProjectList.count})`}</div>
      </ProjectCategoryButton>
      <ProjectCategoryButton
        onClick={handleSelectCategory}
        id={"wishProject"}
        isSelect={selectCategory === "wishProject"}>
        <div className="flex items-center gap-2.5">
          <Image
            width={24}
            height={24}
            src={selectCategory === "wishProject" ? selectHeartIcon : defaultHeartIcon}
            alt="찜한 프로젝트 보기"
          />
          <div
            className={`text-sm font-semibold ${selectCategory === "wishProject" ? defaultHeartIcon : selectHeartIcon}`}>
            내 프로젝트
          </div>
        </div>
        <div>{`(${wishProjectList.count})`}</div>
      </ProjectCategoryButton>
    </div>
  );
}

export default MyPageCategory;