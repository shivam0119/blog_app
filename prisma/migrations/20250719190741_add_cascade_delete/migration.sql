/*
  Warnings:

  - Added the required column `content` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_articleId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "content" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
