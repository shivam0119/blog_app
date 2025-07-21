/*
  Warnings:

  - You are about to drop the column `content` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_articleId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "content";

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
