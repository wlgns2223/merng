import { Resolver, Mutation, Arg } from "type-graphql";
import { v4 } from "uuid";

import sendEmail from "../../utils/sendEmail";
import UserModel from "../../model/user";
import redisSingletone from "../../utils/redis";
import { forgotPasswordPrefix } from "../../constants/redisPrefix";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<Boolean> {
    const user = await UserModel.findOne({ email });
    const token = v4();

    if (!user) return true;

    await redisSingletone.set(
      forgotPasswordPrefix + token,
      user.id,
      "ex",
      60 * 60 * 24
    );
    await sendEmail(email, `http:/localhost:3000/user/forgotPassword/${token}`);

    return true;
  }
}
