import { atom } from "recoil";

export const filterState = atom<"all" | "done" | "notDone">({
  key: "filterState",
  default: "all",
});
