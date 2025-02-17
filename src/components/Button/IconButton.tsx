"use client";

type IconButtonProps = {
  name: string;
  label?: string;
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
};

const IconButton = ({ name, label, onClick, children, isActive = false }: IconButtonProps) => {
  return (
    <div>
      <button 
        title={name}
        aria-label={name}
        className={`text-black bg-black bg-opacity-10 hover:bg-opacity-20 h-8 rounded-full montserrat text-3xl font-medium overflow-hidden flex items-center transition-all duration-300 ${isActive ? "bg-opacity-40" : ""} ${label ? "w-20 justify-between px-[9px]" : "w-8 justify-center"}`} 
        onClick={onClick}
      >
        {children}
        {label && <span className="text-sm whitespace-nowrap">{label}</span>}
      </button>
    </div>
  );
};

export default IconButton;