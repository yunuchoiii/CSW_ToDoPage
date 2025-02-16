import { LOCAL_STORAGE_KEY } from "@/constants";
import { defaultData } from "@/data/data";
import { Board, Data, Todo } from "@/types/data";

export const dataService = {
  readData: () => {
    if (typeof window === "undefined") return null;
    if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultData));
    }
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!) as Data;
  },
  writeData: (data: Data) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  },
  addData: ({type, formData}: {type: "board" | "todo", formData: Board | Todo}) => {
    const data = dataService.readData();
    if (!data) {
      throw new Error("데이터가 존재하지 않습니다.");
    }
    if (type === "board") {
      data.board.push(formData as Board);
    } else {
      data.todo.push(formData as Todo);
    }
    dataService.writeData(data);
  },
  deleteData: ({type, id}: {type: "board" | "todo", id: number}) => {
    const data = dataService.readData();
    if (!data) {
      throw new Error("데이터가 존재하지 않습니다.");
    }
    if (type === "board") {
      data.board = data.board.filter((board) => board.id !== id);
      data.todo = data.todo.filter((todo) => todo.boardId !== id);
    } else {
      data.todo = data.todo.filter((todo) => todo.id !== id);
    }
    dataService.writeData(data);
  },
  updateData: ({type, id, formData}: {type: "board" | "todo", id: number, formData: Board | Todo}) => {
    const data = dataService.readData();
    if (!data) {
      throw new Error("데이터가 존재하지 않습니다.");
    }
    if (type === "board") {
      data.board = data.board.map((board) => board.id === id ? formData as Board : board);
    } else {
      data.todo = data.todo.map((todo) => todo.id === id ? formData as Todo : todo);
    }
    dataService.writeData(data);
  },
};
