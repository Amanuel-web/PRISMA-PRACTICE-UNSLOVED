import { maxBy, minBy, groupBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const ratings = await prisma.starRating.findMany();

  const groupedRatings = groupBy(ratings, (rating) => rating.userId);

  const averages = Object.entries(groupedRatings).map(([userId, ratings]) => {
    const totalScore = ratings.reduce((sum, rating) => sum + rating.score, 0);
    const averageScore = totalScore / ratings.length;
    return { userId: parseInt(userId, 10), averageScore };
  });

  const grumpiestCritic = averages.reduce((prev, curr) =>
    curr.averageScore < prev.averageScore ? curr : prev
  );

  return grumpiestCritic.userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const ratings = await prisma.starRating.findMany();

  const groupedRatings = groupBy(ratings, (rating) => rating.userId);

  const averages = Object.entries(groupedRatings).map(([userId, ratings]) => {
    const totalScore = ratings.reduce((sum, rating) => sum + rating.score, 0);
    const averageScore = totalScore / ratings.length;
    return { userId: parseInt(userId, 10), averageScore };
  });

  const nicestCritic = averages.reduce((prev, curr) =>
    curr.averageScore > prev.averageScore ? curr : prev
  );

  return nicestCritic.userId;
};
