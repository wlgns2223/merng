import { Resolver, Mutation, Arg } from "type-graphql";
import redisSingleton from "../../utils/redis";
import UserModel from "../../model/user";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redisSingleton.get(token);
    if (!userId) return false;

    await UserModel.findOneAndUpdate({ _id: userId }, { isConfirmed: true });
    await redisSingleton.del(token);

    return true;
  }
}
