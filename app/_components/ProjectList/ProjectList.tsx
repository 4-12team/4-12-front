"use client";

import Link from "next/link";
import { RefObject } from "react";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import formatViewCount from "@/app/_utils/formViewCount";
import { ProjectResponseType } from "@/app/_apis/schema/projectResponse";
import LoadingSpinerIcon from "@/public/icons/loadingSpiner.png";
import ProjectCardInfo from "./ProjectCardInfo";
import ProjectCard from "./ProjectCard/ProjectCard";
import EmptyCard from "./ProjectCard/EmptyCard";

interface ProjectListProp {
  projectList: ProjectResponseType[] | undefined;
  lastRef?: RefObject<HTMLDivElement>;
  isLoading?: boolean;
}

function ProjectList({ projectList, lastRef, isLoading }: ProjectListProp) {
  return (
    <div className="relative grid grid-cols-4 gap-4">
      {projectList && projectList[0].content.length > 0 ? (
        projectList.map(project =>
          project.content.map(project => (
            <Link
              href={`/project/${project.projectId}`}
              className="flex cursor-pointer flex-col gap-2.5"
              key={project.projectId}>
              <ProjectCard project={project} />
              <ProjectCardInfo
                projectTitle={project.projectTitle}
                projectSubDescription={project.introduction}
                viewCount={formatViewCount(project.viewCount, 9999)}
              />
            </Link>
          ))
        )
      ) : (
        <EmptyCard />
      )}
      <div className="absolute bottom-0" ref={lastRef} />
      {isLoading && (
        <ClipLoader color="rgba(0,0,0,0)" className="absolute bottom-[-50px] left-1/2">
          <Image width={45} height={45} src={LoadingSpinerIcon} alt={"로딩 스피너"} />
        </ClipLoader>
      )}
    </div>
  );
}

export default ProjectList;
