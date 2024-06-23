"use client";
import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import emptyProjectListIcon from "@/public/icons/emptyWhitePot.svg";
import fullProjectListIcon from "@/public/icons/fullDarkPot.svg";
import emptyProjectIcon from "@/public/icons/emptyBlackPot.svg";
import fullProjectIcon from "@/public/icons/fullBrightPot.svg";
import { handleLikeProject } from "@/app/_apis/handleLikeProject";

interface WishButtonAndCountProps {
  isFavorite: boolean;
  wishCount: number;
  colorMode?: "bright" | "dark";
  projectId: number;
}

function WishButtonAndCount({ isFavorite = false, wishCount, colorMode = "dark", projectId }: WishButtonAndCountProps) {
  const isDarkMode = colorMode === "dark";

  const full = {
    icon: isDarkMode ? fullProjectListIcon : fullProjectIcon,
    text: isDarkMode ? "text-yellow-500 font-bold" : "text-yellow-600 font-bold",
  };

  const empty = {
    icon: isDarkMode ? emptyProjectListIcon : emptyProjectIcon,
    text: isDarkMode ? "text-white" : "text-gray-900",
  };

  const [favoriteState, setFavoriteState] = useState({
    isFavorite: false,
    wishCountState: 0,
  });

  useEffect(() => {
    setFavoriteState({
      isFavorite: isFavorite,
      wishCountState: wishCount,
    });
  }, []);

  const likeMutation = useMutation({
    mutationFn: (projectId: number) => {
      return handleLikeProject.postLikeProject({ projectId });
    },
  });
  const unLikeMutatioin = useMutation({
    mutationFn: (projectId: number) => {
      return handleLikeProject.deleteLikeProject({ projectId });
    },
  });

  const handleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (favoriteState.isFavorite) {
      unLikeMutatioin.mutate(projectId);
      setFavoriteState(prevState => ({
        isFavorite: false,
        wishCountState: prevState.wishCountState - 1,
      }));
    } else {
      likeMutation.mutate(projectId);
      setFavoriteState(prevState => ({
        isFavorite: true,
        wishCountState: prevState.wishCountState + 1,
      }));
    }
  };

  return (
    <div className="flex items-center justify-center gap-0.5">
      <button type="button" className="relative h-6 w-6" onClick={handleFavorite}>
        <Image fill src={favoriteState.isFavorite ? full.icon : empty.icon} alt="프로젝트 찜하기." />
      </button>
      <p className={`min-w-5 text-center text-sm ${favoriteState.isFavorite ? full.text : empty.text}`}>
        {favoriteState.wishCountState}
      </p>
    </div>
  );
}

export default WishButtonAndCount;
