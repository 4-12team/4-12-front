"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import Resizer from "react-image-file-resizer";
import whitePlusIcon from "@/public/icons/whitePlus.svg";
import EmptyProjectImage from "@/app/addproject/_components/ProjectImageBox/EmptyProjectImage";
import ProjectImageCard from "@/app/addproject/_components/ProjectImageBox/ProjectImageCard";
import RadioButton from "@/app/addproject/_components/RadioButton";

interface ImageType {
  id: string;
  url: string;
  file?: File;
}

interface ProjectImageBoxProps {
  setImageType: (image: string) => void;
  handleImageFile: (fileList: File[]) => void;
  initialImageType?: string;
  initialUrlList?: string[];
}

function ProjectImageBox({
  setImageType,
  handleImageFile,
  initialImageType = "",
  initialUrlList = [],
}: ProjectImageBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedSize, setSelectedSize] = useState((initialImageType && initialImageType) || "웹");
  const [showImageUrlList, setShowImageUrlList] = useState<ImageType[]>([]);

  useEffect(() => {
    if (initialUrlList.length > 0) {
      const urlList = initialUrlList.map(url => ({
        id: url,
        url: url,
      }));
      setShowImageUrlList(urlList);
    }
  }, [initialUrlList]);

  const resizeFile = (file: Blob): Promise<File> =>
    new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        uri => {
          if (typeof uri === "string") {
            fetch(uri)
              .then(res => res.blob())
              .then(blob => {
                const resizedFile = new File([blob], (file as File).name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(resizedFile);
              })
              .catch(reject);
          } else if (uri instanceof Blob) {
            const resizedFile = new File([uri], (file as File).name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            reject(new Error("Unexpected type of uri"));
          }
        },
        "blob"
      );
    });

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSize(event.target.value);
    setImageType(event.target.value);
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList) {
      const resizedImageList = await Promise.all(
        Array.from(fileList).map(async file => {
          const resizedFile = await resizeFile(file);
          return {
            id: `${file.name}-${file.lastModified}-${Math.random()}`,
            url: URL.createObjectURL(resizedFile),
            file: resizedFile, // 리사이징된 파일을 저장
          };
        })
      );

      setShowImageUrlList(prevImages => {
        const newImageList = [...prevImages, ...resizedImageList];
        return newImageList.slice(0, 5); // 이미지는 최대 5개까지만 허용
      });

      // 파일 입력 값을 리셋
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageDelete = (indexToDelete: number) => {
    setShowImageUrlList(prevImages => prevImages.filter((_, index) => index !== indexToDelete));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(showImageUrlList);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);

    setShowImageUrlList(reorderedImages);
  };

  useEffect(() => {
    const filesArray: File[] = showImageUrlList.filter(image => image.file).map(image => image.file as File);
    handleImageFile(filesArray);
  }, [showImageUrlList, handleImageFile]);

  return (
    <>
      <div className="flex gap-3">
        <RadioButton value="웹" checked={selectedSize === "웹"} onChange={handleSizeChange} />
        <RadioButton value="모바일" checked={selectedSize === "모바일"} onChange={handleSizeChange} />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="cardLists" direction="horizontal">
          {provided => (
            <div className="cardLists" {...provided.droppableProps} ref={provided.innerRef}>
              <div
                className={`flex h-[252px] ${showImageUrlList.length > 0 ? "w-full" : "w-[690px]"} items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-100 p-4`}>
                {showImageUrlList.length > 0 ? (
                  <div className="flex h-full w-full flex-row items-start gap-4">
                    {showImageUrlList.map((image, index) => (
                      <Draggable draggableId={image.id} index={index} key={image.id}>
                        {provided => (
                          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <ProjectImageCard
                              key={image.id}
                              index={index}
                              imageUrl={image.url}
                              handleImageDelete={handleImageDelete}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {showImageUrlList.length < 5 && (
                      <div
                        className="flex h-[220px] w-[220px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-blue-500 hover:bg-blue-50"
                        onClick={handleUploadButtonClick}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                          <Image src={whitePlusIcon} width={18} alt="이미지 추가 버튼" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <EmptyProjectImage onButtonClick={handleUploadButtonClick} />
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <input type="file" id="fileInput" ref={fileInputRef} className="hidden" multiple onChange={handleImageChange} />
    </>
  );
}

export default ProjectImageBox;
