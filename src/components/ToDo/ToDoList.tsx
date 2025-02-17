import { useModal } from "@/hooks/useModal";
import { activeBoardState } from "@/store/data";
import { filterState } from "@/store/filter";
import { Board, Todo } from "@/types/data";
import { useRecoilValue } from "recoil";
import ToDoForm from "./ToDoForm";
import ToDoItem from "./ToDoItem";

type ToDoListProps = {
  boards: Board[];
  todos: Todo[];
}

const BoardItem = ({ board, todos, filter }: { board: Board, todos: Todo[], filter: "all" | "done" | "notDone" }) => {
  const { openModal } = useModal();

  const filteredTodos = todos.sort((a, b) => a.sort - b.sort).filter((todo) => {
    if (filter === "all") return true;
    if (filter === "done") return todo.isDone;
    if (filter === "notDone") return !todo.isDone;
  });

  return <div key={board.id} className="flex flex-col gap-2">
    <div className="px-2.5 flex items-center gap-2" >
      <div className="w-2 h-2 rounded-full" style={{
        backgroundColor: board.color,
      }}></div>
      <h2 className="text-lg font-bold">{board.title}</h2>
    </div>
    {filteredTodos.length > 0 ? 
      filteredTodos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} />
      )) : 
      <div 
        className={`text-center text-sm font-bold bg-white bg-opacity-70 rounded-[15px] py-5 shadow-lg ${filter === "all" ? "cursor-pointer hover:bg-opacity-85 transition-all duration-150" : ""}`}
        onClick={filter === "all" ? () => openModal(<ToDoForm defaultBoardId={board.id} />) : undefined}
      >
        {todos.length > 0 ? (filter === "done" ? "완료된 항목이 없습니다." : "모두 완료하였습니다.") : "항목을 추가해주세요!"}
      </div>
    }
  </div>
}

const ToDoList = ({ todos, boards }: ToDoListProps) => {
  const filter = useRecoilValue(filterState);
  const activeBoard = useRecoilValue(activeBoardState);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {!activeBoard ? [...boards].sort((a, b) => a.sort - b.sort).map((board) => (
          <BoardItem key={board.id} board={board} todos={todos.filter((todo) => todo.boardId === board.id)} filter={filter} />
        )) : (
          <BoardItem key={activeBoard.id} board={activeBoard} todos={todos} filter={filter} />
        )}
      </div>
    </div>
  );
};

export default ToDoList;
