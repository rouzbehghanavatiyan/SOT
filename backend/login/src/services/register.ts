import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class UserService {
  async createUser(userName: string, email: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }

  async getUserName(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user ? `${user.userName} ${user.email}` : null;
  }

  async createJWT(userId: string, userName: string) {
    return jwt.sign({ userId, userName }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_LIFETIME,
    });
  }

  async comparePassword(candidatePassword: string, hashedPassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

const userService = new UserService();

export default userService;
