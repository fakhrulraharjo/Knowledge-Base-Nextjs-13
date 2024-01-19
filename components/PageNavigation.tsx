"use client";
import Link from "next/link";
import SearchPosts from "./SearchPosts";
import humanify from "@/app/utils/humanify";
import { useGetCategory, useGetPost } from "./directus";

const PageNavigation = ({
  paths,
}: {
  paths: { path: string; label: string }[];
}) => {
  const { data: postData } = useGetPost();
  const { data: categoriesData } = useGetCategory();

  return (
    <div className="sm:col-span-1 md:col-span-6 2xl:col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-6 2xl:grid-cols-3 gap-4 bg-gray-200 dark:bg-slate-800 py-2">
        <div></div>
        <div className="w-full sm:col-span-1 md:col-span-4 2xl:col-span-1">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div style={{ display: "inline-flex" }}>
              <Link href={"/"}>Home</Link>
              {paths.map(({ path, label }, i) => (
                <div style={{ display: "inline-flex" }} key={i}>
                  <span style={{ marginLeft: "1em", marginRight: "1em" }}>
                    {" > "}
                  </span>

                  <Link href={path}>{humanify(label)}</Link>
                </div>
              ))}
            </div>
            <div>
              <SearchPosts
                posts={
                  postData && categoriesData
                    ? postData.map((post: any) => {
                        const ct = categoriesData.find(
                          (f) => f.id == post.category
                        );

                        return {
                          title: post.title,
                          description: post.description,
                          slug: `/posts/${ct?.slug}/${post.slug}`,
                        };
                      })
                    : []
                }
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PageNavigation;
