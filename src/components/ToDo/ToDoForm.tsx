import { useData } from "@/hooks/useData";
import { dataService } from "@/service";
import { activeBoardIdState, dataState } from "@/store/data";
import { modalOpenState } from "@/store/modal";
import { Todo } from "@/types/data";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Input from "../Input/Input";
import Select from "../Input/Select";

type ToDoFormProps = {
  formData?: Todo;
}

const ToDoForm = ({ formData }: ToDoFormProps) => {
  const {refreshData} = useData();
  const activeBoardId = useRecoilValue(activeBoardIdState);
  const initData = useRecoilValue(dataState);

  const [title, setTitle] = useState(formData?.title || "");
  const [description, setDescription] = useState(formData?.description || "");
  const [boardId, setBoardId] = useState(formData?.boardId || activeBoardId || initData!.board[0].id);

  const setOpenModal = useSetRecoilState(modalOpenState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data: Todo = {
        id: formData?.id || Date.now(),
        sort: formData?.sort || Math.max(...(initData?.todo.map(t=>t.sort) || [0])) + 1,
        boardId,
        title,
        description,
        isDone: formData?.isDone || false,
      } 
      if (formData) {
        dataService.updateData({
          type: "todo",
          id: formData.id,
          formData: data,
        });
      } else {
        dataService.addData({
          type: "todo",
          formData: data,
        });
      }
      refreshData();
      setOpenModal(false);
    } catch (error) {
      console.error("데이터 추가 실패", error);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm("정말 삭제하시겠습니까?")) {
      dataService.deleteData({
        type: "todo",
        id: formData!.id,
      });
      refreshData();
      setOpenModal(false);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold montserrat tracking-tight text-neutral-700">Add ToDo</h1>
      <Select
        label="보드"
        options={initData?.board.map((board) => ({
          label: board.title,
          value: board.id,
        })) || []}
        value={boardId}
        onChange={(value) => setBoardId(value)}
      />
      <Input
        label="항목 이름"
        type="text"
        id="title"
        placeholder="항목 이름을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required={true}
      />
      <Input
        label="항목 설명"
        type="text"
        id="description"
        placeholder="항목 설명을 입력해주세요."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex items-center justify-between gap-2.5">
        <button 
          type="submit" 
          className="w-full p-2 rounded-lg bg-cyan-800 text-white mt-5 font-bold"
        >
          {formData ? "수정" : "추가"}
        </button>
        {formData && 
          <button 
            type="button" 
            className="w-full p-2 rounded-lg bg-rose-500 text-white mt-5 font-bold"
            onClick={handleDelete}
          >
            삭제
          </button>
        }
      </div>
    </form>
  );
};

export default ToDoForm;