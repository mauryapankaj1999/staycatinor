"use client";
// In Next.js, this file would be called: app/providers.jsx

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
// import { useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 min stale time set
        refetchOnWindowFocus: false, // default: true, disable refetching on window focus to reduce the the number of requests sent to the server
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
