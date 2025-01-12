import { notFound } from "next/navigation";
// import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import Link from "next/link";
import SearchPage from "@/components/Banner";
import SearchPosts from "@/components/SearchPosts";
import PageNavigation from "@/components/PageNavigation";
import { client } from "@/components/directus";
import { readItems } from "@directus/sdk";
import { Post, Scheema } from "@/components/directus/type";

interface PageProps {
  params: {
    category: string;
    pageNum: string;
  };
}

const POSTS_PER_PAGE = 4;

function getPostsForPage(posts: any, pageNumber: any, postsPerPage: any) {
  // Calculate start and end index
  let start = (pageNumber - 1) * postsPerPage;
  let end = pageNumber * postsPerPage;

  // Slice the posts array to get posts for the given page
  let postsForPage = posts.slice(start, end);

  return postsForPage;
}

async function getPostFromParams(params: PageProps["params"]) {
  const allPosts = await client.request(readItems("post"));
  const categories = await client.request(readItems("category"));

  const filteredPosts = allPosts.filter((post) => {
    const cat = categories.find((va) => va.slug == params.category);
    if (!cat) return false;
    return cat.id == post.category;
  });

  // write a function that takes posts and page number and posts per page and returns the posts for that page
  const posts = getPostsForPage(filteredPosts, params.pageNum, POSTS_PER_PAGE);

  if (!posts) {
    null;
  }

  return posts;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

const getPostCategory = (
  post: Scheema["post"][0],
  cat: Scheema["category"]
) => {
  const cats = cat.find((f) => f.id == post.category);
  return cats;
};

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  const allPosts = await client.request(readItems("post"));
  const allCategory = await client.request(readItems("category"));

  let posts = allPosts.map(
    (post) => `${getPostCategory(post, allCategory)?.slug}/${post.slug}`
  );
  return mapPostsToPages(posts, 2);
}

export default async function Page({ params }: PageProps) {
  const posts = await getPostFromParams(params);
  const allPosts = await client.request(readItems("post"));
  const allCategory = await client.request(readItems("category"));

  const totalPages = Math.ceil(
    posts.filter((post: { category: string }) =>
      post.category.startsWith(params.category)
    ).length / POSTS_PER_PAGE
  );

  const getHreef = (post: Post, category: typeof allCategory) => {
    const ct = category.find((f) => f.id == post.category);
    return `/${ct?.slug ?? ""}/${post.slug}`;
  };

  if (!posts) {
    notFound();
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-6 2xl:grid-cols-3 gap-4">
        <PageNavigation
          paths={[
            {
              path: `/posts/${params.category}/pagination/${params.pageNum}`,
              label: params.category,
            },
          ]}
        />
        <div></div>
        <div className="w-full sm:col-span-1 md:col-span-4 2xl:col-span-1 pt-10">
          <div className="grid grid-cols-3">
            <div className="md:col-span-2 col-span-3">
              <ul
                className="table clear-both p-0 m-0"
                style={{ content: '""', listStyle: "none" }}
              >
                {posts.map((post: any) => (
                  <Link href={getHreef(post, allCategory)} key={post.title}>
                    <li
                      className="px-0 pt-0 pb-5 mx-0 mt-0 mb-5 text-left border-b border-solid border-neutral-200"
                      style={{ listStyle: "outside none none" }}
                    >
                      <article
                        id="post-54"
                        className="block"
                        itemType="https://schema.org/CreativeWork"
                        style={{ listStyle: "outside none none" }}
                      >
                        <Link
                          className="block  bg-transparent cursor-pointer hover:outline-0"
                          href={`/posts/${getHreef(post, allCategory)}`}
                          style={{
                            textDecoration: "none",
                            listStyle: "outside none none",
                          }}
                        >
                          <h2
                            className="m-0 font-sans text-base leading-normal normal-case"
                            itemProp="headline"
                            style={{
                              fontWeight: "bold",
                              listStyle: "outside none none",
                            }}
                          >
                            {post.title}
                          </h2>
                          <div
                            className="mx-0 mt-2 mb-0 text-sm leading-normal"
                            style={{ listStyle: "outside none none" }}
                          >
                            {post.description}
                          </div>
                        </Link>
                      </article>
                    </li>
                  </Link>
                ))}
              </ul>
              <div
                className="table clear-both mx-0 mt-0 mb-5 leading-7 "
                style={{ content: '""' }}
              >
                {parseInt(params.pageNum) !== 1 && (
                  <span>
                    <Link
                      href={`posts/${params.category}/pagination/${
                        parseInt(params.pageNum) - 1
                      }`}
                      className="inline-block py-2 px-4 text-sm leading-none rounded-sm cursor-pointer bg-gray-300 dark:bg-slate-900 hover:outline-0"
                      style={{
                        textDecoration: "none",
                        transition: "all 0.1s ease-in-out 0s",
                      }}
                    >
                      Prev
                    </Link>
                  </span>
                )}
                {parseInt(params.pageNum) < totalPages && (
                  <span>
                    <Link
                      href={`posts/${params.category}/pagination/${
                        parseInt(params.pageNum) + 1
                      }`}
                      className="inline-block py-2 px-4 my-0 mr-0 ml-1 text-sm leading-none rounded-sm cursor-pointer bg-gray-300 dark:bg-slate-900 hover:outline-0"
                      style={{
                        textDecoration: "none",
                        transition: "all 0.1s ease-in-out 0s",
                        content: '">"',
                      }}
                    >
                      Next
                    </Link>
                  </span>
                )}
              </div>
            </div>
            <aside className="md:col-span-1 col-span-3">
              {/* <section
                id="text-2"
                className="block p-8 mx-0 mt-0 mb-5 text-sm rounded bg-gray-300 dark:bg-slate-900"
                style={{ lineHeight: "1.4" }}
              >
                <h3
                  className="mx-0 mt-0 mb-4 font-sans normal-case"
                  style={{ fontWeight: "bold", lineHeight: "1.3" }}
                >
                  Get started at NextJSTemplateStore.com
                </h3>
                <div className="leading-5">
                  <p className="m-0">
                    Visit
                    <a
                      href="https://www.nextjstemplatestore.com"
                      target="_blank"
                      rel="noopener"
                      className=" bg-transparent cursor-pointer  hover:outline-0"
                      style={{ textDecoration: "underline" }}
                    >
                      NextJSTemplateStore.com
                    </a>
                    .
                  </p>
                </div>
              </section>*/}
              <section
                id="ht-kb-exit-widget-2"
                className="block p-8 m-0 text-sm rounded bg-gray-300 dark:bg-slate-900"
                style={{ lineHeight: "1.4" }}
              >
                <h3
                  className="mx-0 mt-0 mb-4 font-sans normal-case"
                  style={{ fontWeight: "bold", lineHeight: "1.3" }}
                >
                  Butuh Bantuan?
                </h3>
                <div className="mx-0 mt-0 mb-3 leading-5">
                  Tidak dapat menemukan panduan yang anda butuhkan?
                </div>
                <Link
                  className="inline-block py-3 px-4 text-xs font-semibold leading-none text-white uppercase bg-cyan-800 cursor-pointer hover:outline-0 rounded-full"
                  href="/contact-us"
                >
                  CONTACT SUPPORT
                </Link>
              </section>
            </aside>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

function mapPostsToPages(
  posts: string[],
  postsPerPage: number
): PageProps["params"][] {
  let result: PageProps["params"][] = [];
  let categoryPageCounts: { [key: string]: number } = {};

  posts.forEach((post) => {
    let category = post.split("/")[0];
    if (!categoryPageCounts[category]) {
      categoryPageCounts[category] = 0;
    }
    if (categoryPageCounts[category] % postsPerPage === 0) {
      result.push({
        category: category,
        pageNum: `${categoryPageCounts[category] / postsPerPage + 1}`,
      });
    }
    categoryPageCounts[category]++;
  });

  return result;
}
