import { activeBoardState } from "@/store/data";
import { filterState } from "@/store/filter";
import { Todo } from "@/types/data";
import { useRecoilValue } from "recoil";
import ToDoItem from "./ToDoItem";

type ToDoListProps = {
  todos: Todo[];
}

const ToDoList = ({ todos }: ToDoListProps) => {
  const filter = useRecoilValue(filterState);
  const activeBoard = useRecoilValue(activeBoardState);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "done") return todo.isDone;
    if (filter === "notDone") return !todo.isDone;
  });

  const filterLabel = {
    all: "모든 항목",
    done: "완료",
    notDone: "미완료",
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-2.5 items-end justify-between">
        {[`${activeBoard?.title || "모든 보드"}`, filterLabel[filter]].map((label) => (
          <div 
            className="px-2.5 py-1 rounded-lg bg-white bg-opacity-50 text-sm"
          >
            <b>{label}</b>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {filteredTodos.length > 0 ? 
          [...filteredTodos].sort((a, b) => a.sort - b.sort).map((todo) => (
            <ToDoItem key={todo.id} todo={todo} />
          )) : (
          <div className="text-center py-8">
            <p>항목을 추가해주세요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
