import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const userRating = await prisma.starRating.findMany({
    where: {
      userId: userId,
    },
    include: {
      movie: true,
    },
  });

  const movies = (await userRating).map((rating) => rating.movie);

  return movies;
};
