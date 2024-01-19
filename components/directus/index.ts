import {
  createDirectus,
  rest,
  graphql,
  authentication,
  readItems,
  staticToken,
} from "@directus/sdk";

import QueryProvider from "./queryWrapper";
import { useGetCategory, useGetPost } from "./get";
import { Scheema } from "./type";

const cmsEnpoint = () => {
  if (process.env.DIRECTUS_HOST) return process.env.DIRECTUS_HOST;
  if (process.env.NEXT_PUBLIC_DIRECTUS_HOST)
    return process.env.NEXT_PUBLIC_DIRECTUS_HOST;
  return "http://directus-directus-1:8055";
};

export const client = createDirectus<Scheema>(cmsEnpoint())
  .with(staticToken("rHRDSi1UJ9A_xyYh2kO9dg1K-rRWynQd"))
  .with(rest());

export { QueryProvider, useGetCategory, useGetPost };
