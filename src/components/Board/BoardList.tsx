"use client";

import { Board } from "@/types/data";
import BoardCard from "./BoardCard";

type BoardListProps = {
  boards: Board[];
};

const BoardList = ({ boards }: BoardListProps) => {
  return (
    <div className="w-screen -ml-5 flex gap-5 px-5 overflow-x-auto snap-x snap-mandatory pb-5 hidden-scroll">
      {boards.length > 0 ?
        [...boards].sort((a, b) => a.sort - b.sort).map((board) => (
          <BoardCard 
            key={board.id}
            board={board}
          />
        )) :
        <div className="w-full text-center py-8">
          보드를 추가해주세요!
        </div>
      }
    </div>
  );
};

export default BoardList;
