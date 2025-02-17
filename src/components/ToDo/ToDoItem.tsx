import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { dataService } from "@/service";
import { dataState } from "@/store/data";
import { Todo } from "@/types/data";
import { getRGBAFromHex } from "@/util";
import { useRecoilValue } from "recoil";
import ToDoForm from "./ToDoForm";

type ToDoItemProps = {
  todo: Todo;
  isDragging?: boolean;
}

const ToDoItem = ({ todo, isDragging }: ToDoItemProps) => {
  const {refreshData} = useData();
  const {openModal} = useModal();

  const data = useRecoilValue(dataState);
  const board = data?.board.find((board) => board.id === todo.boardId);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openModal(<ToDoForm formData={todo} />);
  }

  const handleToggleDone = () => {
    dataService.updateData({
      type: "todo",
      id: todo.id,
      formData: {
        ...todo,
        isDone: !todo.isDone,
      },
    });
    refreshData();
  }

  return <div 
    className={`h-[75px] flex items-center justify-between pr-5 rounded-[15px] bg-opacity-85 hover:bg-opacity-90 backdrop-blur-sm cursor-pointer transition-all duration-150 
      ${todo.isDone ? " text-neutral-500" : "text-neutral-700"} 
      ${isDragging ? "pl-5 shadow-none bg-neutral-100 gap-2.5" : "pl-2.5 shadow-lg bg-white gap-1.5"}`}
    onClick={handleToggleDone}
  >
    {!isDragging && (
      <button 
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-neutral-100" 
        onClick={(e) => handleOpenModal(e)}
      >
        <img 
          src="https://www.svgrepo.com/show/509384/more-vertical.svg" 
          alt="more" 
          className="w-4 h-4" 
        />
      </button>
    )}
    <div className="min-w-0 flex-1 flex flex-col gap-1">
      <h1 className={`text-base font-bold ellipsis ${todo.isDone ? "line-through" : ""}`}>
        {todo.title}
      </h1>
      <p className="text-xs text-neutral-500 ellipsis">
        {board?.title} | {todo.description}
      </p>
    </div>
    <button 
      title="완료"
      aria-label="완료"
      className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
      style={{backgroundColor: getRGBAFromHex(board?.color || "#FFFFFF")}}
      onClick={handleToggleDone}
    >
      {isDragging ? (
      <img 
        src="/images/sort-svgrepo-com.svg" 
        alt="sort" 
        className="w-5 h-5 invert" 
      /> 
      ):(
      <img 
        src="https://www.svgrepo.com/show/509324/check.svg" 
        alt="check" 
        className={`w-5 h-5 transition-opacity duration-150 ${todo.isDone ? "opacity-100" : "opacity-0"}`} 
      />
      )}
    </button>
  </div>;
};

export default ToDoItem;