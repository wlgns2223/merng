import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from "bcrypt";

import UserModel, { User } from "../../model/user";
import redisSingletone from "../../utils/redis";
import { forgotPasswordPrefix } from "../../constants/redisPrefix";
import { changePasswordInput } from "./changePassword/changePasswordInput";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data", () => changePasswordInput)
    { token, password }: changePasswordInput
  ): Promise<User | Error> {
    const userId = await redisSingletone.get(forgotPasswordPrefix + token);
    if (!userId) return new Error("Invalid Redis Key");

    const user = await UserModel.findOne({ userId });
    if (!user) return new Error("User Not Exists");

    await redisSingletone.del(forgotPasswordPrefix + token);

    const newPassword = await bcrypt.hash(password, 12);
    await UserModel.findOneAndUpdate(
      { _id: userId },
      { password: newPassword }
    );

    return user;
  }
}
