"use client";

import colors from "@/constants/color";
import { useState } from "react";

type ColorPickerProps = {
  label: string;
  id: string;
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ label, id, value, onChange }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickPicker = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  const onClickColor = (color: string) => {
    onChange(color);
    setIsOpen(false);
  }

  return (
    <div className="relative flex flex-row items-center gap-2.5 mt-2.5">
      <label htmlFor={id} className="text-sm text-neutral-700">{label}</label>
      <button 
        className="rounded-full h-5 w-5" 
        style={{ backgroundColor: value }} 
        onClick={onClickPicker}
      />
      {isOpen && (
        <div className="absolute top-full mt-2.5 left-0 p-5 bg-white rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.1)] flex flex-col gap-2.5 z-10">
          {[colors.slice(0, colors.length / 2), colors.slice(colors.length / 2)].map((colorGroup) => (
            <div key={colorGroup[0].value} className="flex flex-row gap-2.5">
              {colorGroup.map((color) => (
                <button 
                  key={color.value} 
                  className="rounded-full h-5 w-5" 
                  style={{ backgroundColor: color.value }} 
                  onClick={() => {onClickColor(color.value)}}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorPicker;