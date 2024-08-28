import { prisma } from "./prisma";

export const updateUsername = async (userId: number, newUsername: string) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: newUsername,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating username:", error);
    throw error;
  }
};
