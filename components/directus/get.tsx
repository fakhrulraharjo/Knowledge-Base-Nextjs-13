"use client";

import { Query, readItems } from "@directus/sdk";
import { client } from ".";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Post, Scheema } from "./type";

export const useGetCategory = () => {
  const t = useQuery({
    queryKey: ["categoris"],
    queryFn: async () => {
      return await client.request(readItems("category"));
    },
  });
  return t;
};

export const useGetPost = (query?: Query<Scheema, Post>) => {
  const t = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return await client.request(readItems("post"));
    },
    refetchOnMount: false,
  });
  return t;
};

export const useGetFaq = (query?: Query<Scheema, Post>) => {
  const t = useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      return await client.request(readItems("faq"));
    },
  });
  return t;
};
