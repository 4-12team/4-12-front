import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "../_queryFactory/getQueryClient";
import { projectQueryKeys } from "../_queryFactory/projectQuery";
import SelectStack from "./_components/SelectStack/SelectStack";

async function MainPage() {
  const queryClient = getQueryClient();

  const projectListQuery = projectQueryKeys.list({ page: 1, size: 16 });

  await queryClient.prefetchInfiniteQuery({
    queryKey: projectListQuery.queryKey,
    queryFn: projectListQuery.queryFn,
    initialPageParam: 1 as never,
    getNextPageParam: (lastPage: any) => {
      const { customPageable } = lastPage;
      if (customPageable.hasNext) {
        return customPageable.page + 1; // 다음 페이지 번호 반환
      }
      return undefined; // 더 이상 페이지가 없으면 undefined 반환
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <main className="mx-auto my-16 grid w-[1200px] grid-cols-[230px_minmax(976px,_1fr)] grid-rows-[100px_minmax(800px,_1fr)]">
        <SelectStack />
      </main>
    </HydrationBoundary>
  );
}

export default MainPage;
