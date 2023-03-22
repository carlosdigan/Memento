/*
  Warnings:

  - The primary key for the `SavedComments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SavedComments` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SavedComments" (
    "commentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("commentId", "userId"),
    CONSTRAINT "SavedComments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SavedComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SavedComments" ("commentId", "userId") SELECT "commentId", "userId" FROM "SavedComments";
DROP TABLE "SavedComments";
ALTER TABLE "new_SavedComments" RENAME TO "SavedComments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
