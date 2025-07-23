/*
  Warnings:

  - You are about to drop the column `learningResources` on the `IndustryInsight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IndustryInsight" DROP COLUMN "learningResources",
ADD COLUMN     "recommendedSkills" TEXT[];
