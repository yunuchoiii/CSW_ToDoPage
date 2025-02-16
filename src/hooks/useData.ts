import { dataService } from "@/service";
import { dataState } from "@/store/data";
import { useRecoilState } from "recoil";

export function useData() {
  const [data, setData] = useRecoilState(dataState);

  const refreshData = () => {
    const response = dataService.readData();
    if (response) {
      setData(response);
    }
  };

  return {data, refreshData};
}