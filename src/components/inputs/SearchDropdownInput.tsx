import React, { useState, useEffect } from "react";
import SearchIcon from "../icons/SearchIcon";
import { twMerge } from "tailwind-merge";
import { City } from "../../state-manager/types";

type SearchDropdownInputProps = {
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
}: SearchDropdownInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputIsFocused, setInputIsFocused] = useState(false);

  useEffect(() => {
    setIsOpen(inputIsFocused);
  }, [value, inputIsFocused]);

  return (
    <div
      className={twMerge(
        "relative flex items-center w-full sm:w-auto px-4 py-3 rounded-lg bg-black/50",
        className
      )}
    >
      <input
        data-testid="search-input-general"
        className="w-full sm:w-auto flex-1 text-white/80 text-lg outline-none bg-transparent placeholder-gray-400"
        placeholder={placeholder || "Search"}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={() => setInputIsFocused(true)}
        onBlur={() => {
          setTimeout(() => setInputIsFocused(false), 300);
        }}
      />
      <SearchIcon />
      {isOpen && (
        <Dropdown value={value || ""} items={items || []} onSelect={onSelect || (() => {})} />
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
  const filteredItems = items.filter((item) => 
    !value || item.name.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div
      data-testid="search-dropdown"
      className="absolute top-[105%] left-0 w-full sm:w-auto z-10 bg-white shadow-lg rounded-lg overflow-hidden max-h-60 overflow-y-auto"
    >
      <ul className="py-2 text-sm text-gray-700">
        {filteredItems.map((item) => (
          <DropdownItem key={item.name} text={item.address} onClick={() => onSelect(item.name)} />
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
    <li data-testid="search-dropdown-item">
      <button
        onClick={onClick}
        className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-all"
      >
        {text}
      </button>
    </li>
  );
}
