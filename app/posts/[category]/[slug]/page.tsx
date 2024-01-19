import { notFound } from "next/navigation";
// import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import PageNavigation from "@/components/PageNavigation";
import { Scheema, client } from "@/components/directus";
import { readItems } from "@directus/sdk";
import { ca } from "@directus/sdk/dist/index-Szt1hiPf";

interface CategoryPostProps {
  params: {
    category: string;
    slug: string;
  };
}

const getPostCategory = (
  post: Scheema["post"][0],
  cat: Scheema["category"]
) => {
  const cats = cat.find((f) => f.id == post.category);
  return cats;
};

export async function generateStaticParams(
  params: any
): Promise<CategoryPostProps["params"][]> {
  const allPosts = await client.request(readItems("post"));
  const allCategory = await client.request(readItems("category"));

  return allPosts.map((post) => {
    // const [category, slug] = post.slugAsParams.split("/");
    return {
      category: getPostCategory(post, allCategory)?.slug ?? "",
      slug: post.slug,
    };
  });
}

export default async function PostPage(postProps: CategoryPostProps) {
  const post = await getPostFromParams(postProps);
  if (!post) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-6 2xl:grid-cols-3 gap-4">
      <PageNavigation
        paths={[
          {
            path: `/posts/${postProps.params.category}/pagination/1`,
            label: postProps.params.category,
          },
          {
            path: `/posts/${postProps.params.category}/${postProps.params.slug}}`,
            label: postProps.params.slug,
          },
        ]}
      />
      <div></div>
      <div className="w-full sm:col-span-1 md:col-span-4 2xl:col-span-1">
        {" "}
        <article className="py-6 prose dark:prose-invert">
          <h1 className="mb-2">{post.title}</h1>
          {post.description && (
            <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
              {post.description}
            </p>
          )}
          <hr className="my-4" />
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </article>
      </div>

      <div></div>
    </div>
  );
}

async function getPostFromParams(postProps: CategoryPostProps) {
  const allPosts = await client.request(readItems("post"));

  const post = allPosts.find((post) => {
    return post.slug == postProps.params.slug;
  });
  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata(
  postProps: CategoryPostProps
): Promise<Metadata> {
  const post = await getPostFromParams(postProps);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}
