import colors from "@/constants/color";
import { useData } from "@/hooks/useData";
import { useModal } from "@/hooks/useModal";
import { dataService } from "@/service";
import { dataState } from "@/store/data";
import { Board } from "@/types/data";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import ColorPicker from "../Input/ColorPicker";
import Input from "../Input/Input";

type BoardFormProps = {
  formData?: Board;
}

const BoardForm = ({ formData }: BoardFormProps) => {
  const {refreshData} = useData();
  const { closeModal } = useModal();

  const initData = useRecoilValue(dataState);

  const [title, setTitle] = useState(formData?.title || "");
  const [description, setDescription] = useState(formData?.description || "");
  const [color, setColor] = useState(formData?.color || colors[0].value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data: Board = {
        id: formData?.id || Date.now(),
        sort: formData?.sort || Math.max(...(initData?.board.map(b=>b.sort) || [0])) + 1,
        title,
        description,
        color,
      } 
      if (formData) {
        dataService.updateData({
          type: "board",
          id: formData.id,
          formData: data,
        });
      } else {
        dataService.addData({
          type: "board",
          formData: data,
        });
      }
      refreshData();
      closeModal();
    } catch (error) {
      console.error("데이터 추가 실패", error);
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm("정말 삭제하시겠습니까?")) {
      dataService.deleteData({
        type: "board",
        id: formData!.id,
      });
      refreshData();
      closeModal();
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold montserrat tracking-tight text-neutral-700">Add Board</h1>
      <Input
        label="보드 이름"
        type="text"
        id="title"
        placeholder="보드 이름을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required={true}
      />
      <Input
        label="보드 설명"
        type="text"
        id="description"
        placeholder="보드 설명을 입력해주세요."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <ColorPicker
        label="보드 색상"
        id="color"
        value={color}
        onChange={(color) => setColor(color)}
      />
      <div className="flex items-center justify-between gap-2.5">
        <button 
          type="submit" 
          className="w-full p-2 rounded-lg bg-[#d3eef4] text-cyan-700 hover:brightness-95 mt-5 font-bold"
        >
          {formData ? "수정" : "추가"}
        </button>
        {formData && 
          <button 
            type="button" 
            className="w-full p-2 rounded-lg bg-[#fee3e3] text-red-600 hover:brightness-95 mt-5 font-bold"
            onClick={handleDelete}
          >
            삭제
          </button>
        }
      </div>
    </form>
  );
};

export default BoardForm;