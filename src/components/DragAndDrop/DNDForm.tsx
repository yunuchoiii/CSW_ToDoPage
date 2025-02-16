import { useData } from "@/hooks/useData";
import { dataService } from "@/service";
import { dataState } from "@/store/data";
import { Board, Todo } from "@/types/data";
import { useRecoilValue } from "recoil";
import DNDList, { DNDItem } from "./DNDList";

type DNDFormProps = {
  type: "board" | "todo";
  items: Board[] | Todo[];
  complete: () => void;
}

const DNDForm = ({ type, items, complete }: DNDFormProps) => {
  const {refreshData} = useData();
  const initData = useRecoilValue(dataState);

  const setItems = (items:DNDItem[]) => {
    const updatedItems = items.map((item, index) => ({...item, sort: Math.max(...items.map(i => i.sort)) + index}));
    console.log('>>> updatedItems', updatedItems);
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
    <div className="flex flex-col gap-3">
      <DNDList
        type={type}
        items={items.map((item) => ({
          id: item.id,
          sort: item.sort,
          title: item.title,
        }))}
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