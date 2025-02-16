export type Board = {
  id: number;
  sort: number;
  title: string;
  description: string;
  color: string;
};

export type Todo = {
  id: number;
  sort: number;
  boardId: number;
  title: string;
  description: string;
  isDone: boolean;
};

export type Data = {
  board: Board[];
  todo: Todo[];
};
