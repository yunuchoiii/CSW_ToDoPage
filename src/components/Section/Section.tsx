"use client";
import { useModal } from "@/hooks/useModal";
import { dataState } from "@/store/data";
import { filterState } from "@/store/filter";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import BoardForm from "../Board/BoardForm";
import IconButton from "../Button/IconButton";
import DNDForm from "../DragAndDrop/DNDForm";
import ToDoForm from "../ToDo/ToDoForm";

type SectionProps = {
  type: "board" | "todo";
  children: React.ReactNode;
};

const Section = ({ type, children }: SectionProps) => {
  const { openModal, closeModal } = useModal();

  const data = useRecoilValue(dataState);
  const boards = data?.board;
  const todos = data?.todo;

  const dataIsEmpty = type === "board" ? boards?.length === 0 : todos?.length === 0;

  const [useDND, setUseDND] = useState(false);
  const [filter, setFilter] = useRecoilState(filterState);

  const handleOpenModal = () => {
    openModal(type === "board" ? <BoardForm /> : <ToDoForm />);
  };

  const handleUpdateSort = () => {
    // setUseDND(!useDND);
    openModal(<DNDForm type={type} complete={closeModal}/>);
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

  const filterLabel = {
    all: "모든 항목",
    done: "완료됨",
    notDone: "미완료",
  }

  return (  
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-center justify-between sm:justify-start gap-8">
        <h1 className="text-3xl font-extrabold montserrat leading-none">
          {type === "board" ? "Board" : "To Do"}
        </h1>
        <div className="flex items-center gap-2">
          {!dataIsEmpty && <>
            {type === "todo" && (
              <IconButton name="필터링" label={filter !== "all" ? filterLabel[filter] : ""} onClick={handleFilter}>
                <img 
                  src="/images/filter-svgrepo-com.svg" 
                  alt="filter" 
                  className="w-5 h-5 mt-0.5" 
                />
              </IconButton>
            )}
            <IconButton name="순서 변경" onClick={handleUpdateSort} isActive={useDND}>
              <img 
                src={
                  type === "board" ? 
                  "/images/sort-horizontal-svgrepo-com.svg" : 
                  "/images/sort-vertical-svgrepo-com.svg"
                } 
                alt="update-sort" 
                className="w-6 h-6"
              />
            </IconButton>
          </>}
          <IconButton name="추가" onClick={handleOpenModal}>
            {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
            <img src="https://www.svgrepo.com/show/512676/plus-1512.svg" alt="add" className="w-4 h-4" />
          </IconButton>
        </div>
      </div>
      {useDND ? 
        <DNDForm 
          type={type}
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
