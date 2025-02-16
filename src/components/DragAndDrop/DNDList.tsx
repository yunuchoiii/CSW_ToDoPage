"use client";

import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DNDListItem from "./DNDListItem";

export interface DNDItem {
  id: number;
  sort: number;
  title: string;
}

type DNDListProps = {
  type: "board" | "todo";
  items: DNDItem[];
  setItems: (items: DNDItem[]) => void;
}

const DNDList = ({ type, items, setItems }: DNDListProps) => {

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext 
        items={items} 
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2.5">
          {items.sort((a, b) => a.sort - b.sort).map((item) => (
            <DNDListItem key={item.id} type={type} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DNDList;