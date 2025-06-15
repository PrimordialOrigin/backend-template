import { User } from "@prisma/client";

export default interface UserRepository {
  createUser(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User | undefined>;
  findUserById(identifier: string): Promise<User | undefined>;
  updateUser(user: User, user_id: string): Promise<User>;
}
