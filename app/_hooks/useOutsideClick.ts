import { RefObject, useEffect } from "react";

const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T>,
  handleDropDownClose: () => void,
  exceptionRef?: RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 마우스다운 이벤트가 버튼에서 발생한 경우 드롭다운 열지 않음
      if (exceptionRef && exceptionRef.current && exceptionRef.current.contains(event.target as Node)) {
        return;
      }

      // 드롭다운 외부 클릭 시 닫기
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleDropDownClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handleDropDownClose, exceptionRef]);
};

export default useOutsideClick;
