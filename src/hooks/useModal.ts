import { modalChildrenState, modalOpenState } from "@/store/modal";
import { useSetRecoilState } from "recoil";

export const useModal = () => {
  const setOpenModal = useSetRecoilState(modalOpenState);
  const setModalChildren = useSetRecoilState(modalChildrenState);

  const openModal = (children: React.ReactNode) => {
    setOpenModal(true);
    setModalChildren(children);
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalChildren(null);
  };

  return { openModal, closeModal };
};
