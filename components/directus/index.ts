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

export const client = createDirectus<Scheema>("http://localhost:3000/cms")
  .with(staticToken("rHRDSi1UJ9A_xyYh2kO9dg1K-rRWynQd"))
  .with(rest());

export { QueryProvider, useGetCategory, useGetPost };
