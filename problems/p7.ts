import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const userRating = await prisma.starRating.findMany({
    where: {
      userId: userId,
    },
  });

  const totalScore = userRating.reduce(
    (total, rating) => total + rating.score,
    0
  );
  const averageScore = totalScore / userRating.length;

  return averageScore;
};
