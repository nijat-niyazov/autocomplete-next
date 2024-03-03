"use client";

import { useDebounced } from "@/hooks";
const axios = require("axios");

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

function Skeletons() {
  return Array.from({ length: 3 }).map((_, i) => (
    <li key={i} className="flex items-start gap-3 pt-2 w-full">
      <div className="bg-gray-600 animate-pulse h-full min-h-20 min-w-20" />

      <div className="w-full">
        <div className="text-sm bg-gray-600 animate-pulse min-h-4 truncate mb-3 " />

        <div className="text-xs bg-gray-600 animate-pulse min-h-4 opacity-50 w-1/3" />
      </div>
    </li>
  ));
}

type Result = { title: string; imageUrl: string; date: string };
let config: any = {
  method: "post",
  url: "https://google.serper.dev/search",
  headers: {
    "X-API-KEY": "9b46763767d23264bbb97d37d85d88297ad9484e",
    "Content-Type": "application/json",
  },
};
const HomeContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const debounced = useDebounced(query.trim(), 500);
  const isTyping = debounced.trim().length > 0;

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    setisLoading(true);
    setResults([]);
    if (debounced) {
      config.data = JSON.stringify({ q: debounced });
      router.push(`?q=${debounced}`);
      setTimeout(() => {
        axios(config).then(({ data: res }: { data: { topStories: Result[] } }) => {
          if (!res.topStories || !res.topStories.length) {
            setResults([]);
            setisLoading(false);
            return;
          }

          const data = res.topStories.map(({ title, imageUrl, date }) => ({ imageUrl, title, date }));
          setResults(data.slice(0, 5));
          setisLoading(false);
        });
      }, 500);
    } else {
      router.push("/");
      setResults([]);
      setisLoading(false);
    }
  }, [debounced]);

  return (
    <div className="mx-auto max-h-96 lg:w-1/3 w-1/2 bg-white rounded-md p-2 overflow-x-hidden group">
      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          className="p-2 w-full outline-none flex-1"
          placeholder="Search"
          type="text"
        />
        {isLoading ? <div className="w-4 h-4 rounded-full border-black border-2 border-t-gray-400 animate-spin" /> : <SearchIcon />}
      </div>

      <ul className="hidden group-focus-within:block">
        {isLoading && !results.length && isTyping && <Skeletons />}

        {results.map((res, i) => (
          <li key={i} className="flex items-start gap-3 pt-2">
            <Image src={res.imageUrl} alt={res.title} width={70} height={70} className="object-cover h-full" />

            <ul>
              <li className="text-sm truncate mb-3">{res.title}</li>

              <li className="text-xs opacity-50">{res.date}</li>
            </ul>
          </li>
        ))}

        {!isLoading && !results.length && isTyping && <li className="text-center">No results found</li>}
      </ul>
    </div>
  );
};

export default HomeContainer;

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
      <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
    </svg>
  );
}
