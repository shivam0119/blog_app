// import {
//   AllArticlesPage, 
// } from "@/components/articles/all-article-page";
// import ArticleSearchInput from "@/components/articles/article-search-input";
// import { Button } from "@/components/ui/button";
// import React, { Suspense } from "react";
// import { fetchArticleByQuery } from "@/lib/query/fetch-articles";
// import Link from "next/link";
// import Navbar from "@/components/home/header/navbar";
// import AllArticlesPageSkeleton from "@/components/articles/all-article-skeleton"

// const ITEMS_PER_PAGE = 3;

// export default async function Page({
//   searchParams,
// }: {
//   searchParams?: { search?: string; page?: string };
// }) {
//   const searchText = searchParams?.search || "";
//   const currentPage = Number(searchParams?.page) || 1;
//   const skip = (currentPage - 1) * ITEMS_PER_PAGE;
//   const take = ITEMS_PER_PAGE;

//   const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
//   const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  

//   return (
//     <div className="min-h-screen bg-background">
//         <Navbar/>
//       <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
//         {/* Page Header */}
//         <div className="mb-12 space-y-6 text-center">
//           <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
//             All Articles
//           </h1>
//           {/* Search Bar */}
//           <Suspense>
//             <ArticleSearchInput />
//           </Suspense>
//         </div>
//         {/* All article page  */}
//         <Suspense fallback={<AllArticlesPageSkeleton/>}>
//                 <AllArticlesPage articles={articles} />
//         </Suspense>
        
        
      
//         {/* <AllArticlesPageSkeleton/> */}
//         {/* Pagination */}
//         <div className="mt-12 flex justify-center gap-2">
//           {/* Prev Button */}
//           <Link
//             href={`?search=${searchText}&page=${currentPage - 1}`}
//             passHref
//           >
//             <Button variant="ghost" size="sm" disabled={currentPage === 1}>
//               ← Prev
//             </Button>
//           </Link>

//           {/* Page Numbers */}
//           {Array.from({ length: totalPages }).map((_, index) => (
//             <Link
//               key={index}
//               href={`?search=${searchText}&page=${index + 1}`}
//               passHref
//             >
//               <Button
//                 variant={`${currentPage === index + 1 ? 'destructive' : 'ghost'}`}
//                 size="sm"
//                 disabled={currentPage === index + 1}
//               >
//                 {index + 1}
//               </Button>
//             </Link>
//           ))}

//           {/* Next Button */}
//           <Link
//             href={`?search=${searchText}&page=${currentPage + 1}`}
//             passHref
//           >
//             <Button
//               variant="ghost"
//               size="sm"
//               disabled={currentPage === totalPages}
//             >
//               Next →
//             </Button>
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// };



// app/articles/page.tsx
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/home/header/navbar";
import Link from "next/link";
import { fetchArticleByQuery } from "@/lib/query/fetch-articles";

const ArticleSearchInput = dynamic(() => import("@/components/articles/article-search-input"), {
  // @ts-expect-error: suspense is supported
  suspense: true,
});

const AllArticlesPage = dynamic(() => import("@/components/articles/all-article-page").then(mod => mod.AllArticlesPage), {
  // @ts-expect-error: suspense is supported
  suspense: true,
});

const AllArticlesPageSkeleton = dynamic(() => import("@/components/articles/all-article-skeleton"), {
  // @ts-expect-error: suspense is supported
  suspense: false,
});

const ITEMS_PER_PAGE = 3;

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string; page?: string }>;
}) {
  // Await the searchParams promise
  const resolvedSearchParams = await searchParams;
  const searchText = resolvedSearchParams?.search || "";
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All Articles
          </h1>
          <Suspense fallback={<div>Loading search...</div>}>
            <ArticleSearchInput />
          </Suspense>
        </div>

        <Suspense fallback={<AllArticlesPageSkeleton />}>
          <AllArticlesPage articles={articles} />
        </Suspense>

        <div className="mt-12 flex justify-center gap-2">
          <Link href={`?search=${searchText}&page=${currentPage - 1}`} passHref>
            <Button variant="ghost" size="sm" disabled={currentPage === 1}>
              ← Prev
            </Button>
          </Link>

          {Array.from({ length: totalPages }).map((_, index) => (
            <Link key={index} href={`?search=${searchText}&page=${index + 1}`} passHref>
              <Button
                variant={currentPage === index + 1 ? "destructive" : "ghost"}
                size="sm"
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </Button>
            </Link>
          ))}

          <Link href={`?search=${searchText}&page=${currentPage + 1}`} passHref>
            <Button variant="ghost" size="sm" disabled={currentPage === totalPages}>
              Next →
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}