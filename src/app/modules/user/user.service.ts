import { TUserSignup } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUserSignup) => {
  const result = await User.create(payload);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
