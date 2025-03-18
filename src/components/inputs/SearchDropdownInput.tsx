import React, { useState, useEffect, useMemo } from "react";
import SearchIcon from "../icons/SearchIcon";
import { twMerge } from "tailwind-merge";
import { City } from "../../state-manager/types";
import { FixedSizeList as List } from "react-window";
import Fuse from "fuse.js";

const ITEM_HEIGHT = 40;

type SearchDropdownInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  items?: City[];
  onSelect?: (item: string) => void;
  timeout?: number;
};

type DropdownProps = {
  items: City[];
  value: string;
  onSelect: (item: string) => void;
};

type DropdownItemProps = {
  text: string;
  onClick: () => void;
  style?: React.CSSProperties;
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
          setTimeout(() => setInputIsFocused(false), 200);
        }}
      />
      <SearchIcon />
      {isOpen && (
        <Dropdown value={value || ""} items={items || []} onSelect={onSelect || (() => {})} />
      )}
    </div>
  );
}

function Dropdown({ items, onSelect, value }: DropdownProps) {
  const fuse = useMemo(() => new Fuse(items, { keys: ["name"], threshold: 0.3 }), [items]);

  const filteredItems = useMemo(() => {
    if (!value.trim()) return [];
    return fuse.search(value).map(result => result.item);
  }, [value, fuse]);

  if (filteredItems.length === 0) return null;

  return (
    <div
      data-testid="search-dropdown"
      className="absolute top-[105%] left-0 w-full sm:w-full z-10 bg-white shadow-lg rounded-lg overflow-hidden max-h-60"
    >
      <List
        height={Math.min(filteredItems.length * ITEM_HEIGHT, 240)} // Adjust height dynamically
        itemCount={filteredItems.length}
        itemSize={ITEM_HEIGHT}
        width="100%"
      >
        {({ index, style }) => (
          <DropdownItem
            key={filteredItems[index].name}
            text={filteredItems[index].name}
            onClick={() => onSelect(filteredItems[index].name)}
            style={style}
          />
        )}
      </List>
    </div>
  );
}

function DropdownItem({ text, onClick, style }: DropdownItemProps) {
  return (
    <div style={style} data-testid="search-dropdown-item" className="px-4 py-2 hover:bg-gray-100 transition-all border-b border-b-gray-200">
      <button
        onClick={onClick}
        className="w-full h-full text-left cursor-pointer text-[#111827] text-base not-italic font-medium leading-[normal] font-manrope"
      >
        {text}
      </button>
    </div>
  );
}
