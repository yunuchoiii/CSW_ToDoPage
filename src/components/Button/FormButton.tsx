
type FormButtonProps = {
  type: "save" | "delete";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormButton = ({ type, onClick }: FormButtonProps) => {
  return <button 
    type={type === "save" ? "submit" : "button"} 
    className={`w-full p-2 rounded-lg bg-[#d3eef4] text-cyan-700 hover:brightness-95 mt-5 font-bold ${type === "save" ? "bg-[#d3eef4] text-cyan-700" : "bg-[#fee3e3] text-red-600"}`}
    onClick={onClick}
  >
    {type === "save" ? "저장" : "삭제"}
  </button>;
}

export default FormButton;