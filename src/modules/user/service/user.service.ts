import User from "../model/user.model";

interface CreateUserInput {
  name: string;
  email: string;
}

export const createUser = async (data: CreateUserInput) => {
  const existingUser = await User.findOne({
    where: { email: data.email }
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const user = await User.create({
    name: data.name,
    email: data.email
  });

  return user;
};

export const getUserById = async (id: number) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};