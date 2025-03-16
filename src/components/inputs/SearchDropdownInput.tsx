import { useState, useEffect } from "react";
import SearchIcon from "../icons/SearchIcon";
import { twMerge } from "tailwind-merge";
import { City } from "../../state-manager/types";

type SearchDropdownInput = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  items?: City[];
  onSelect?: (item: string) => void;
};

export default function SearchDropdownInput({
  value,
  onChange,
  className,
  placeholder,
  items,
  onSelect,
}: SearchDropdownInput) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputIsFocused, setInputIsFocused] = useState(false);

  useEffect(() => {
    if (inputIsFocused) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [value, inputIsFocused]);

  return (
    <div
      className={twMerge(
        "inline-flex relative justify-center items-center pl-[1.8125rem] pr-[1.60938rem] pt-[0.8125rem] pb-3 rounded-[0.625rem] bg-[rgba(0,0,0,0.50)]",
        className
      )}
    >
      <input
        className="text-[rgba(255,255,255,0.50)] text-2xl not-italic font-normal leading-[normal] outline-none"
        placeholder={placeholder || "Search"}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={() => setInputIsFocused(true)}
        onBlur={() => {
          setTimeout(() => {
            setInputIsFocused(false);
          }, 300);
        }}
      />
      <SearchIcon />
      {isOpen && (
        <Dropdown
          value={value || ""}
          items={items || []}
          onSelect={onSelect || (() => {})}
        />
      )}
    </div>
  );
}

type DropdownProps = {
  items: City[];
  value: string;
  onSelect: (item: string) => void;
};

function Dropdown({ items, onSelect, value }: DropdownProps) {
  const filteredItems = items.filter((item) => {
    if (!value) return true;
    return item.name.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <div className="absolute top-[105%] w-full z-10 bg-white divide-y divide-gray-300 rounded-lg shadow-sm max-h-[200px] overflow-y-auto">
      <ul className="py-2 text-sm text-[rgba(0,0,0,0.50)]">
        {filteredItems.map((item) => (
          <DropdownItem
            key={item.name}
            text={item.address}
            onClick={() => onSelect(item.name)}
          />
        ))}
      </ul>
    </div>
  );
}

type DropdownItemProps = {
  text: string;
  onClick: () => void;
};

function DropdownItem({ text, onClick }: DropdownItemProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className="block w-full text-left px-4 py-2 cursor-pointer"
      >
        {text}
      </button>
    </li>
  );
}
