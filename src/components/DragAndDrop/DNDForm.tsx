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
    <div>
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
      <button 
        className="w-full p-2 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:shadow-none transition-all duration-100 mt-5 font-bold"
        onClick={complete}
      >
        완료
      </button>
    </div>
  );
};

export default DNDForm;