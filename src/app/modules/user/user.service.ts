import { TUserSignup } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUserSignup) => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (user) {
    throw new Error('User already exists!');
  }

  const result = await User.create(payload);
  const { password, ...userResponse } = result.toObject();
  return userResponse;
};

export const UserServices = {
  createUserIntoDB,
};
