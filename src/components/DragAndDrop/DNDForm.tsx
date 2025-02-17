import { useData } from "@/hooks/useData";
import { dataService } from "@/service";
import { activeBoardIdState, dataState } from "@/store/data";
import { Board, Todo } from "@/types/data";
import { useRecoilValue } from "recoil";
import DNDList, { DNDItem } from "./DNDList";

type DNDFormProps = {
  type: "board" | "todo";
  complete: () => void;
}

const DNDForm = ({ type, complete }: DNDFormProps) => {
  const {refreshData} = useData();
  const initData = useRecoilValue(dataState);
  const activeBoard = useRecoilValue(activeBoardIdState);

  const setItems = (items:DNDItem[]) => {
    const updatedItems = items.map((item, index) => ({...item, sort: Math.max(...items.map(i => i.sort)) + index}));
    updatedItems.forEach((item) => {
      const formData = type === "board" ? 
        {
          ...initData?.board.find((b) => b.id === item.id),
          sort: item.sort,
        } : 
        {
          ...initData?.todo.find((t) => t.id === item.id),
          sort: item.sort,
        };
      dataService.updateData({
        type: type,
        id: item.id,
        formData: formData as Board | Todo,
      });
    });
    refreshData();
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">순서 변경</h1>
      <div className="max-h-[calc(100vh-200px)] w-[calc(100%+24px)] -ml-3 px-3 overflow-y-auto">
        <DNDList
          type={type}
          items={type === "board" ? initData!.board.map((board) => ({
            id: board.id,
            sort: board.sort,
            title: board.title,
          })) : (
            activeBoard ? 
              initData!.todo.filter((todo) => todo.boardId === activeBoard).map((todo) => ({
                id: todo.id,
                sort: todo.sort,
                title: todo.title,
              })) : 
              initData!.todo.map((todo) => ({
                id: todo.id,
                sort: todo.sort,
                title: todo.title,
              }))
          )}
          setItems={setItems}
        />
      </div>
      <button 
        className="w-full p-2 rounded-full bg-[#d3eef4] text-cyan-700 hover:brightness-95 font-bold"
        onClick={complete}
      >
        완료
      </button>
    </div>
  );
};

export default DNDForm;