import { modalChildrenState, modalOpenState } from "@/store/modal";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const Modal = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalOpenState);
  const modalChildren = useRecoilValue(modalChildrenState);

  const onClose = () => {
    setIsOpen(false);
  }

  // 모달 열리면 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="relative w-5/6 sm:w-4/5 lg:w-1/2 min-w-[300px] max-w-[500px] bg-white rounded-[15px] p-6" 
        onClick={(e) => e.stopPropagation()}
      >
        <button
          title="닫기"
          aria-label="닫기"
          className="absolute top-2.5 right-2.5 p-2.5 rounded-full hover:bg-neutral-100" 
          onClick={onClose}
        >
          <img src="https://www.svgrepo.com/show/510921/close-lg.svg" alt="close" className="w-4 h-4" />
        </button>
        {modalChildren}
      </div>
    </div>
  );
};

export default Modal;