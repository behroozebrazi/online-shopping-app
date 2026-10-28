"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName: string;
};

function Pagination({ page, totalPages, urlParamName }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="lg"
        className="w-10 m-2 text-lg"
        disabled={Number(page) <= 1}
      >
        {"❮"}
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-10 mt-2 text-lg"
        disabled={Number(page) >= totalPages}
      >
        {"❯"}
      </Button>
    </div>
  );
}

export default Pagination;
