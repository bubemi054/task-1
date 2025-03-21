import React, { useState, useEffect, useMemo } from "react";
import SearchIcon from "../icons/SearchIcon";
import { twMerge } from "tailwind-merge";
import { City } from "../../state-manager/types";
import Fuse from "fuse.js";
import { FixedSizeList as List } from "react-window";

type SearchDropdownInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  items?: City[];
  onSelect?: (item: number) => void;
  isOffline: boolean
};

export default function SearchDropdownInput({
  value,
  onChange,
  className,
  placeholder,
  items,
  onSelect,
  isOffline
}: SearchDropdownInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputIsFocused, setInputIsFocused] = useState(false);

  useEffect(() => {
    if (value?.trim()?.length === 0 || isOffline) {
      setIsOpen(false);
      return;
    }
    setIsOpen(inputIsFocused);
  }, [value, inputIsFocused, isOffline]);

  return (
    <div
      className={twMerge(
        "relative flex items-center w-full sm:w-auto px-4 py-3 rounded-lg bg-black/50",
        className
      )}
    >
      <input
        data-testid="search-input-general"
        className="w-full sm:w-auto flex-1 text-white/80 text-lg outline-none bg-transparent placeholder-gray-400 disabled:cursor-not-allowed"
        placeholder={placeholder || "Search"}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={() => setInputIsFocused(true)}
        onBlur={() => {
          setTimeout(() => setInputIsFocused(false), 300);
        }}
        disabled={isOffline}
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
  onSelect: (item: number) => void;
};

function Dropdown({ items, onSelect, value }: DropdownProps) {
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "name", weight: 0.4 },
          // { name: "country", weight: 0.3 },
          // { name: "altCountry", weight: 0.2 },
          // { name: "muni", weight: 0.2 },
          // { name: "muniSub", weight: 0.1 },
          // { name: "adminCode", weight: 0.1 },
        ],
        threshold: 0.4,
      }),
    [items]
  );

  const filteredItems = useMemo(() => {
    if (!value) return items;
    return fuse.search(value).map((result) => result.item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, fuse]);

  return (
    <div
      data-testid="search-dropdown"
      className="absolute top-[105%] left-0 w-full z-10 bg-white shadow-lg rounded-lg overflow-hidden max-h-60"
    >
      <List
        height={240}
        itemCount={filteredItems.length}
        itemSize={40}
        width="100%"
      >
        {({ index, style }) => (
          <div style={style} className="cursor-pointer">
            <DropdownItem
              key={filteredItems[index].cityId}
              text={filteredItems[index].name}
              onClick={() => onSelect(filteredItems[index].cityId)}
            />
          </div>
        )}
      </List>
    </div>
  );
}

type DropdownItemProps = {
  text: string;
  onClick: () => void;
};

function DropdownItem({ text, onClick }: DropdownItemProps) {
  return (
    <li data-testid="search-dropdown-item" className="list-none cursor-pointer">
      <button
        onClick={onClick}
        className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-all"
      >
        {text}
      </button>
    </li>
  );
}
