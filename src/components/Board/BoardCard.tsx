'use client';

import { useModal } from "@/hooks/useModal";
import { activeBoardIdState, dataState } from "@/store/data";
import { Board, Todo } from "@/types/data";
import { changeBackgroundColor, getRGBAFromHex } from "@/util";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import BoardForm from "./BoardForm";

type BoardCardProps = {
  board: Board;
}

const BoardCard = ({ board }: BoardCardProps) => {
  const { openModal } = useModal();

  const [todos, setTodos] = useState<Todo[]>([]);

  const data = useRecoilValue(dataState);
  const [activeBoardId, setActiveBoardId] = useRecoilState(activeBoardIdState);

  useEffect(() => {
    setTodos(data!.todo.filter((todo) => todo.boardId === board.id));
  }, [board.id, data]);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openModal(<BoardForm formData={board} />);
  };

  const handleClickBoard = () => {
    const isActive = activeBoardId === board.id;
    setActiveBoardId(isActive ? 0 : board.id);

    changeBackgroundColor(isActive ? "" : board.color);
  };

  return <section 
    className={`group relative w-[75vw] max-w-[300px] min-w-[240px] aspect-[1.5] flex flex-col justify-between rounded-[20px] flex-shrink-0 snap-center shadow-lg bg-white p-5 cursor-pointer hover:bg-opacity-100 transition-all duration-300 border-4 ${activeBoardId === board.id ? "bg-opacity-100" : "bg-opacity-70"}`}
    style={{borderColor: activeBoardId === board.id ? board.color : "transparent"}}
    onClick={handleClickBoard}
  >
    <div>
      <div className="flex items-start justify-between">
        <h1 
          className="text-2xl font-bold tracking-tight text-neutral-700"
        >
          {board.title}
        </h1>
        <button 
          className="p-2.5 rounded-full -mr-1.5 hover:bg-neutral-100" 
          onClick={handleOpenModal}
        >
          <img 
            src="https://www.svgrepo.com/show/509384/more-vertical.svg"
            alt="more" 
            className="w-4 h-4" 
          />
        </button>
      </div>
      <p className="text-sm text-neutral-700">{board.description}</p>
    </div>
    {todos.length > 0 ?
    <div className="flex flex-col gap-2">
      <p className="text-xs text-neutral-700 text-right mr-1">
        {todos.filter(t => t.isDone).length} / {todos.length} 완료!
      </p>
      <div 
        className="w-full h-2 rounded-full overflow-hidden"
        style={{
          backgroundColor: getRGBAFromHex(board.color).replace(", 1)", ", 0.3)"),
        }}
      >
        <div 
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${(todos.filter(t => t.isDone).length / todos.length) * 100}%`,
            backgroundColor: board.color,
          }}
        />
      </div>
    </div> : (
      <div className="text-sm text-center text-neutral-700">항목을 추가해주세요!</div>
    )}
  </section>;
};

export default BoardCard;