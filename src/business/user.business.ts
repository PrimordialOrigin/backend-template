import { UserRepository } from "@/repo/interfaces";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt'

const createUser = async (
  _userRepository: UserRepository,
  user: User
): Promise<User> => {
  const existingUser = await _userRepository.findUserByEmail(user.email);
  if(existingUser){
    throw new Error('Email already exists')
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const NewUser = await _userRepository.createUser({
    userid: user.userid,
    email: user.email,
    password: hashedPassword,
    fullname: user.fullname
  });
  return NewUser;
};

const findUserByEmail = async (
  _userRepository: UserRepository,
  email: string
): Promise<User | undefined> => {
  const res = await _userRepository.findUserByEmail(email);
  return res;
};


export default {
  createUser,
  findUserByEmail,
};
