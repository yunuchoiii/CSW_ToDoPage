import { useEffect, useState } from "react";

interface SelectProps {
  label?: string;
  value?: any;
  options: { value: any; label: string, disabled?: boolean }[];
  onChange?: (value: any) => void;
}

const Select = ({ label, value, options, onChange }: SelectProps) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value ?? options[0]?.value);

  const handleSearchType = (value: any) => {
    setSelectedOption(value);
    if (onChange) {
      onChange(value);
    }
    setOptionsVisible(false);
  };

  useEffect(() => {
    setSelectedOption(value ?? options[0]?.value);
  }, [value, options]);

  return (<div>
    <div className={`Select-container w-full flex flex-col gap-1`}>
      {label && <label className="Select-label text-sm Montserrat ml-1">{label}</label>}
      <div className="relative flex-1 flex">
        <div className="relative flex flex-row items-center flex-1">
          <button
            className={`w-full border border-neutral-300 bg-white text-sm rounded-md p-2`}
            onClick={(e) => {
              e.preventDefault();
              setOptionsVisible(!optionsVisible)
            }}
          >
            <span className="text-center">
              {options.find(option => option.value === selectedOption)?.label}
            </span>
            <i className={`absolute right-1.5 top-1/2 -translate-y-1/2 fas fa-caret-down px-3 text-lg ${optionsVisible ? "rotate-180" : ""}`}></i>
          </button>
          <div 
            className={`absolute z-50 w-full top-12 left-0 right-0 bg-white rounded-lg overflow-hidden transition-all duration-300 shadow-[0_0_16px_rgba(0,0,0,0.15)]`}
            style={{
              height: optionsVisible ? `${options.length * 40 + 10}px` : "0px",
              padding: optionsVisible ? "5px 10px" : "0px 10px",
            }}
          >
            {options.map((option, index) => (
              <div key={option.value} className={`${optionsVisible ? "opacity-100" : "opacity-0"} transition-all duration-300 flex flex-col justify-center`}>
                <button 
                  key={option.value} 
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearchType(option.value);
                  }}
                  className={`h-10 flex items-center justify-center text-sm font-semibold md:hover:text-cyan-800 disabled:hover:text-black ${selectedOption === option.value ? "text-cyan-800" : "text-black"} ${option.disabled ? "opacity-50" : ""}`}
                  disabled={option.disabled}
                >
                  {option.label}
                </button>
                {index !== options.length - 1 && 
                  <hr className="w-full h-[1px] text-[#DDD]"/>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>);
}

export default Select;