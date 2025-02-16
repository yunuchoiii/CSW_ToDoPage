import { atom } from "recoil";

export const modalOpenState = atom<boolean>({
  key: "isModalOpen",
  default: false,
});

export const modalChildrenState = atom<React.ReactNode>({
  key: "modalChildren",
  default: null,
});
