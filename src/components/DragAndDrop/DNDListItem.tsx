import { dataState } from "@/store/data";
import { useSortable } from "@dnd-kit/sortable";
import { useRecoilValue } from "recoil";
import ToDoItem from "../ToDo/ToDoItem";
import { DNDItem } from "./DNDList";

type DNDListItemProps = {
  type: "board" | "todo";
  item: DNDItem;
}

const DNDListItem = ({ type, item }: DNDListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const data = useRecoilValue(dataState);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transform ? `translateY(${transform.y}px)` : undefined,
        transition,
      }}
    >
      <ToDoItem 
        todo={
          type === "board" ? 
          {
            ...data?.board.find((board) => board.id === item.id)!,
            boardId: item.id, 
            isDone: false
          } : 
          data?.todo.find((todo) => todo.id === item.id)!
        } 
        isDragging={true}
      />
    </div>
  );
};

export default DNDListItem;