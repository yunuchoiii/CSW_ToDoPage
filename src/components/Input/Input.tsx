type InputProps = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  id: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input = ({ label, type, id, value, placeholder, onChange, required = false }: InputProps) => {
  return <div className="flex flex-col gap-1.5">
    <label 
      htmlFor={id} 
      className="text-sm text-neutral-700"
    >
      {label}
    </label>
    <input 
      type={type} 
      id={id} 
      className="w-full p-2 rounded-md border border-neutral-300 text-black text-sm" 
      value={value} 
      onChange={onChange} 
      required={required}
      placeholder={placeholder}
    />
  </div>
}

export default Input;