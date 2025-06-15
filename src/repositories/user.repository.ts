import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
import { logger } from "../logger";
import { ErrorHandler } from "../middlewares/error.middleware";

const createUser = async (user: User): Promise<User> => {
  try {
    const response = await prisma.user.create({ 
      data: user
    });

    return response;
  } catch (error: any) {
    logger.error(error); 
    // Check Prisma Error docs to see what corresponding error refers to - https://www.prisma.io/docs/orm/reference/error-reference
    return error;
  }
};

const findUserByEmail = async (email: string): Promise<User | undefined> => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { email },
     });

    return user || undefined;
  } catch (error: any) {
    logger.error(`Error finding user by email: ${email}`, error);
    throw new ErrorHandler(500, "Internal server error");
  }
};

export default {
  createUser,
  findUserByEmail,
};
