"use client";

import BoardList from "@/components/Board/BoardList";
import CircleLoader from "@/components/Loader/CircleLoader";
import Modal from "@/components/Modal/Modal";
import Section from "@/components/Section/Section";
import ToDoList from "@/components/ToDo/ToDoList";
import { useData } from "@/hooks/useData";
import { activeBoardIdState } from "@/store/data";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function Home() {
  const {data, refreshData} = useData();

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
      <Section type="board">
        <BoardList boards={data?.board} />
      </Section>
      <Section type="todo">
        <ToDoList todos={data?.todo}  />
      </Section>
      <Modal/>
    </div>
  );

}
