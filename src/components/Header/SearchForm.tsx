"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

let debounceTimeout: NodeJS.Timeout | null = null;

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hiddenPaths = [
      "/partners/tg-general",
      "/partnor-create",
      "/partners/partner",
    ];
    setShowSearch(!hiddenPaths.includes(pathname));
  }, [pathname]);

  const handleSearch = (value: string) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams as any);
      if (value.trim()) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 300); // 300ms kechikish
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  return (
    <>
      {showSearch && (
        <li className="hidden lg:block">
          <div className="relative w-full max-w-[300px]">
            <button
              type="button"
              className="absolute left-5 top-1/2 -translate-y-1/2 text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary"
            >
              <IoSearch className="text-2xl" />
            </button>
            <input
              type="text"
              value={searchValue}
              onChange={handleChange}
              placeholder="Search"
              className="w-full rounded-full border border-stroke bg-gray-2 py-3 pl-13.5 pr-5 text-dark focus:border-primary focus:outline-none dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus:border-primary xl:w-[300px]"
            />
          </div>
        </li>
      )}
    </>
  );
};

export default SearchForm;
