"use client";
import { activeBoardIdState, dataState } from "@/store/data";
import { filterState } from "@/store/filter";
import { modalChildrenState, modalOpenState } from "@/store/modal";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import BoardForm from "../Board/BoardForm";
import IconButton from "../Button/IconButton";
import DNDForm from "../DragAndDrop/DNDForm";
import ToDoForm from "../ToDo/ToDoForm";

type SectionProps = {
  title: string;
  type: "board" | "todo";
  children: React.ReactNode;
};

const Section = ({ title, type, children }: SectionProps) => {
  const data = useRecoilValue(dataState);
  
  const setOpenModal = useSetRecoilState(modalOpenState);
  const setModalChildren = useSetRecoilState(modalChildrenState);
  const activeBoard = useRecoilValue(activeBoardIdState);

  const [useDND, setUseDND] = useState(false);
  const [filter, setFilter] = useRecoilState(filterState);

  const handleOpenModal = () => {
    setOpenModal(true);
    setModalChildren(type === "board" ? <BoardForm /> : <ToDoForm />);
  };

  const handleUpdateSort = () => {
    setUseDND(!useDND);
  };

  const handleFilter = () => {
    if (filter === "all") {
      setFilter("done");
    } else if (filter === "done") {
      setFilter("notDone");
    } else {
      setFilter("all");
    }
  };

  return (  
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-center justify-between sm:justify-start gap-8">
        <h1 className="text-3xl font-extrabold montserrat leading-none">{title}</h1>
        <div className="flex items-center gap-2">
          {type === "todo" && (
            <IconButton onClick={handleFilter}>
              <img 
                src="/images/filter-svgrepo-com.svg" 
                alt="filter" 
                className="w-5 h-5 invert mt-0.5" 
              />
            </IconButton>
          )}
          <IconButton onClick={handleUpdateSort} isActive={useDND}>
            <img 
              src={
                type === "board" ? 
                "/images/sort-horizontal-svgrepo-com.svg" : 
                "/images/sort-vertical-svgrepo-com.svg"
              } 
              alt="update-sort" 
              className="w-6 h-6 invert"
            />
          </IconButton>
          <IconButton onClick={handleOpenModal}>
            {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
            <img src="https://www.svgrepo.com/show/512676/plus-1512.svg" alt="add" className="w-4 h-4 invert" />
          </IconButton>
        </div>
      </div>
      {useDND ? 
        <DNDForm 
          type={type} 
          items={
            type === "board" ? 
            data!.board : 
            activeBoard ? 
            data!.todo.filter(todo => todo.boardId === activeBoard) : 
            data!.todo
          } 
          complete={() => setUseDND(false)}
        /> : 
        <div>
          {children}
        </div>
      }
    </div>
  );
};

export default Section;
