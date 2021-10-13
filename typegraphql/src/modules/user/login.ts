import bcrypt from "bcrypt";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";

import UserModel, { User } from "../../model/user";
import { MyContext } from "../../types/types";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: MyContext
  ): Promise<User | Error> {
    const user = await UserModel.findOne({ email });
    if (!user) return new Error("User Not Found");

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) return new Error("Invalid Password");

    context.req.session!.userId = user.id;
    context.req.session!.save(() => {
      console.log({ context: context.req.session });
    });

    return user;
  }
}
