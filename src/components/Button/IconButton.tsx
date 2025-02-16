"use client";

type IconButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
};

const IconButton = ({ onClick, children, isActive = false }: IconButtonProps) => {
  return (
    <div>
      <button className={`text-white bg-black bg-opacity-15 hover:bg-opacity-30 h-8 w-8 rounded-full montserrat text-3xl font-medium flex items-center justify-center ${isActive ? "bg-opacity-40" : ""}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default IconButton;