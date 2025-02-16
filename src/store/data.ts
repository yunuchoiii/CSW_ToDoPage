import { Board, Data } from "@/types/data";
import { atom, selector } from "recoil";

export const dataState = atom<Data | null>({
  key: "data",
  default: null,
});

export const activeBoardIdState = atom<number>({
  key: "activeBoardId",
  default: 0,
});

export const activeBoardState = selector<Board | null>({
  key: "activeBoard",
  get: ({ get }) => {
    const activeBoardId = get(activeBoardIdState);
    const data = get(dataState);
    return data?.board.find(board => board.id === activeBoardId) || null;
  },
});