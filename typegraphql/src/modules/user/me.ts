import { Resolver, Query, Ctx } from "type-graphql";

import UserModel, { User } from "../../model/user";
import { MyContext } from "../../types/types";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() context: MyContext): Promise<User | undefined | null> {
    console.log({ context: context.req.session.userId });

    if (!context.req.session!.userId) return undefined;

    const user = await UserModel.findOne({ _id: context.req.session!.userId });

    return user;
  }
}
