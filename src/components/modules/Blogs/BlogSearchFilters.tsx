"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { BlogType } from "@/types";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface BlogSearchFiltersProps {
  blogTypes: ("All" | BlogType)[];
}

const BlogSearchFilters = ({ blogTypes }: BlogSearchFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        new URLSearchParams(window.location.search).get("searchTerm") || ""
      );
    }

    return "";
  });

  const debouncedSearch = useDebounce(searchTerm, 500);

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(window.location.search);

      if (value && value !== "All") {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      params.delete("page");

      router.push(`/blogs?${params.toString()}`);
    },
    [router],
  );

  useEffect(() => {
    const urlSearchTerm =
      new URLSearchParams(window.location.search).get("searchTerm") || "";

    if (debouncedSearch !== urlSearchTerm) {
      updateFilters("searchTerm", debouncedSearch);
    }
  }, [debouncedSearch, updateFilters]);

  const handleClearFilters = () => {
    setSearchTerm("");
    router.push("/blogs");
  };

  const activeType = searchParams.get("type") || "All";

  const hasActiveFilters =
    searchParams.get("searchTerm") || searchParams.get("type");

  return (
    <div className="flex w-full flex-col gap-4 md:w-auto">
      {/* <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 md:w-[280px]"
        />
      </div> */}

      <div className="flex flex-wrap gap-2">
        {blogTypes.map((type) => (
          <button
            key={type}
            onClick={() => updateFilters("type", type)}
            className={`rounded-xl border px-5 py-2 text-sm font-medium transition-all ${
              activeType === type
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary"
            }`}
          >
            {type}
          </button>
        ))}

        {hasActiveFilters && (
          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default BlogSearchFilters;
