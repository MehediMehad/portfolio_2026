"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  limitOptions?: number[];
  defaultLimit: number;
}

const TablePagination = ({
  currentPage,
  totalPages,
  limitOptions = [10, 20, 50, 100],
  defaultLimit = 10,
}: TablePaginationProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const currentLimit = searchParams.get("limit") || String(defaultLimit);

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    if (!params.get("limit")) {
      params.set("limit", String(defaultLimit));
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const changeLimit = (newLimit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit);
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  if (totalPages <= 1 && !searchParams.get("limit")) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage <= 1 || isPending}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
          let pageNumber;

          if (totalPages <= 5) {
            pageNumber = index + 1;
          } else if (currentPage <= 3) {
            pageNumber = index + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + index;
          } else {
            pageNumber = currentPage - 2 + index;
          }

          return (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => navigateToPage(pageNumber)}
              disabled={isPending}
              className="w-10"
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage >= totalPages || isPending}
      >
        Next
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>

      <span className="ml-2 text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Items per page:</span>

        <Select
          value={currentLimit}
          onValueChange={changeLimit}
          disabled={isPending}
        >
          <SelectTrigger className="h-8 w-20">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {limitOptions.map((limit) => (
              <SelectItem key={limit} value={String(limit)}>
                {limit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TablePagination;
