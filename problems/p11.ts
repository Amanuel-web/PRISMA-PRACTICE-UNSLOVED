import { prisma } from "./prisma";

export const createUserWithData = async ({
  username,
  age,
}: {
  username: string;
  age: number;
}) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        age,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
