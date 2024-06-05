"use client";

import React, { InputHTMLAttributes, useState } from "react";
import Image from "next/image";
import deleteIcon from "@/public/icons/delete.svg";
import notDeleteIcon from "@/public/icons/notDelete.svg";
import DropDownBox from "@/app/addproject/_components/DropDown/DropDownBox";
import UseStack from "@/app/_components/Stack/UseStack";

interface DropDownSectionProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  inputWidth?: string;
  dropDownType: string;
  dropDownWidth?: string;
}

interface InputBox {
  id: number;
  value: string;
}

function DropDownSection({
  title,
  type,
  placeholder,
  name,
  inputWidth,
  dropDownType,
  dropDownWidth,
}: DropDownSectionProps) {
  const [additionalInput, setAdditionalInput] = useState<InputBox[]>([{ id: 0, value: "" }]);
  const [nextId, setNextId] = useState(1);

  const handleAddButtonClick = () => {
    setAdditionalInput([...additionalInput, { id: nextId, value: "" }]);
    setNextId(nextId + 1);
  };

  const handleDeleteButtonClick = (id: number) => {
    if (additionalInput.length > 1) {
      setAdditionalInput(additionalInput.filter(item => item.id !== id));
    }
  };

  return (
    <section>
      <label htmlFor={name} className="mb-4 mt-6 flex text-base font-bold text-[#4D5256]">
        {title}
      </label>
      {dropDownType !== "stack" ? (
        <>
          {additionalInput.map(item => (
            <div key={item.id} className="mb-2 flex gap-1">
              <DropDownBox dataType={dropDownType} dropDownWidth={dropDownWidth} />
              <input
                type={type}
                placeholder={placeholder}
                className={`${inputWidth} h-12 rounded-sm border border-solid border-[#EBEBEB] px-4 py-3`}
                name={name}
                id={name}
              />
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded border border-solid border-[#EBEBEB] p-2"
                onClick={() => handleDeleteButtonClick(item.id)}>
                <Image
                  width={20}
                  src={additionalInput.length > 1 ? deleteIcon : notDeleteIcon}
                  alt="삭제 버튼"
                  priority
                />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddButtonClick}
            className="mt-4 rounded-md border border-solid border-[#1852FD] bg-[#1852FD] px-4 py-2 text-white">
            추가하기
          </button>
        </>
      ) : (
        <>
          <DropDownBox dataType={dropDownType} dropDownWidth={dropDownWidth} />
          <UseStack stackList={["Javascript"]} /> {/* mock data 작성 */}
        </>
      )}
    </section>
  );
}

export default DropDownSection;
