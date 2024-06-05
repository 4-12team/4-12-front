import Image from "next/image";
import { useState } from "react";
import JOB_CATEGORIES from "@/app/_constants/JobCategoryData";
import checkIcon from "@/public/icons/check.svg";
import secondStepBarIcon from "@/public/icons/secondStepBar.svg";
import backArrowIcon from "@/public/icons/backArrow.svg";
import Button from "../../../_components/Button/Button";

interface SecondStepProps {
  prevStep: () => void;
}

function Step2({ prevStep }: SecondStepProps) {
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  const handleClick = (key: string) => {
    setChecked({ [key]: !checked[key] });
  };

  return (
    <div className="mx-[auto] mt-[117px] flex max-w-[420px] flex-col items-center">
      <Image src={secondStepBarIcon} alt="두번째회원가입스텝바" />

      <div className="mb-[123px] mt-[48px] text-[#3A3A3A]">현재 직무를 선택해주세요</div>

      <div className="mb-[201px] grid grid-cols-2 gap-x-3 gap-y-2">
        {Object.entries(JOB_CATEGORIES).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleClick(key)}
            // style={{
            //   border: `1px solid ${checked[key] ? "#0066DA" : "#d6d6d6"}`,
            // }}
            className={`flex w-[176px] justify-between rounded-lg ${checked[key] ? "border border-[#0066DA]" : "border border-[#d6d6d6]"} px-4 py-4 text-[#757575]`}>
            {value}
            {checked[key] && <Image src={checkIcon} alt="체크아이콘" />}
          </button>
        ))}
      </div>

      <div className="flex gap-32">
        <Button className="flex justify-center" buttonSize="small" bgColor="secondBlue" onClick={prevStep}>
          <Image src={backArrowIcon} alt="뒤로가기아이콘" />
          <span>이전으로</span>
        </Button>
        <Button buttonSize="small" bgColor="mainBlue">
          다음으로
        </Button>
      </div>
    </div>
  );
}

export default Step2;
