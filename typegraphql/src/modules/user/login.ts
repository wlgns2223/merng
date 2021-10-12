import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import UserModel, { User } from "../../model/user";
import bcrypt from "bcrypt";

import { Context } from "../../types/context";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: Context
  ): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return null;
    context.req.session!.userId = user._id;

    return user;
  }
}
