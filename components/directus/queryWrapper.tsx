"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface props {}

const QueryWrapper: React.FunctionComponent<PropsWithChildren<props>> = ({
  children,
}) => {
  const [queryClient, setQueryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 1000,
        },
      },
    })
  );
  //   useEffect(() => {
  //     clientLogin();
  //   }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  );
};

export default QueryWrapper;
