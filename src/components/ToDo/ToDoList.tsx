import { filterState } from "@/store/filter";
import { Todo } from "@/types/data";
import { useRecoilValue } from "recoil";
import ToDoItem from "./ToDoItem";

type ToDoListProps = {
  todos: Todo[];
}

const ToDoList = ({ todos }: ToDoListProps) => {
  const filter = useRecoilValue(filterState);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "done") return todo.isDone;
    if (filter === "notDone") return !todo.isDone;
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
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
