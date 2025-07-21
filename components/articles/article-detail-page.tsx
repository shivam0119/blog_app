import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import { Prisma } from "@prisma/client";
import CommentForm from "../comments/comment-form";
import CommentList from "../comments/comment-list";
import { prisma } from "@/lib/prisma";
import LikeButton from "./like-button";
import { auth } from "@clerk/nextjs/server";
import Navbar from "../home/header/navbar";
import Image from "next/image";
import Link from "next/link"; // For login/signup prompt

type ArticleDetailPageProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>;
};

export async function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  const comments = await prisma.comment.findMany({
    where: {
      articleId: article.id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  const likes = await prisma.like.findMany({
    where: { articleId: article.id },
  });

  const { userId } = await auth();
  const user = userId
    ? await prisma.user.findUnique({ where: { clerkUserId: userId } })
    : null;

  const isLiked = likes.some((like) => like.userId === user?.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-muted-foreground">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.imageUrl as string} />
                <AvatarFallback>{article.id}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {article.author.name}
                </p>
                <p className="text-sm">
                  {article.createdAt.toDateString()} · 12 min read
                </p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-100 mb-4 overflow-hidden rounded-xl">
            <Image
              src={article.featuredImage as string}
              alt={article.title}
              fill
              priority
              className="rounded-xl object-cover"
            />
          </div>

          {/* Article Content */}
          <section
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Like Button */}
          {user ? (
            <LikeButton articleId={article.id} likes={likes} isLiked={isLiked} />
          ) : (
            <div className="text-sm text-muted-foreground mb-8">
              <Link href="/sign-in" className="text-primary underline">
                Sign in
              </Link>{" "}
              to like this article.
            </div>
          )}

          {/* Comments Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                {comments.length} Comments
              </h2>
            </div>

            {/* Comment Form */}
            {user ? (
              <CommentForm articleId={article.id} />
            ) : (
              <p className="text-sm text-muted-foreground mb-4">
                <Link href="/sign-in" className="text-primary underline">
                  Sign in
                </Link>{" "}
                to post a comment.
              </p>
            )}

            {/* Comments List */}
            <CommentList comments={comments} />
          </Card>
        </article>
      </main>
    </div>
  );
}
