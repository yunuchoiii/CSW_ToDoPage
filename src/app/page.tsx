"use client";

import BoardList from "@/components/Board/BoardList";
import CircleLoader from "@/components/Loader/CircleLoader";
import Modal from "@/components/Modal/Modal";
import Section from "@/components/Section/Section";
import ToDoList from "@/components/ToDo/ToDoList";
import { useData } from "@/hooks/useData";
import { activeBoardIdState } from "@/store/data";
import { modalChildrenState, modalOpenState } from "@/store/modal";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function Home() {
  const {data, refreshData} = useData();

  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpenState);
  const modalChildren = useRecoilValue(modalChildrenState);
  const activeBoardId = useRecoilValue(activeBoardIdState);

  useEffect(() => {
    refreshData();
  }, []);

  if (!data) {
    return <div className="flex items-center justify-center h-screen">
      <CircleLoader />
    </div>;
  }

  return (
    <div>
      <Section title="Board" type="board">
        <BoardList boards={data?.board || []} />
      </Section>
      <Section title="ToDo" type="todo">
        <ToDoList 
          todos={activeBoardId === 0 ? data?.todo || [] : data?.todo.filter((todo) => todo.boardId === activeBoardId) || []} 
          boards={data?.board || []} 
        />
      </Section>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <>{modalChildren}</>
      </Modal>
    </div>
  );

}
