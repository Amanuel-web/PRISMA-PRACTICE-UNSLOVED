import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";
import { title } from "process";
import { number } from "zod";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const movies = await prisma.movie.findMany({
    include: {
      starRatings: true,
    },
  });

  const filteredMovies = movies.filter((movie) => {
    const totalRatings = movie.starRatings.length;
    const averageScore =
      totalRatings > 0
        ? movie.starRatings.reduce((sum, rating) => sum + rating.score, 0) /
          totalRatings
        : 0;

    return averageScore > n;
  });

  return filteredMovies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    releaseYear: movie.releaseYear,
    parentalRating: movie.parentalRating,
  }));
};
