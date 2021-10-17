import { Resolver, Mutation, Ctx } from "type-graphql";
import { MyContext } from "../../types/types";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() context: MyContext): Promise<boolean> {
    return new Promise((resolve, reject) =>
      context.req.session.destroy((error) => {
        if (error) return reject(true);

        context.res.clearCookie("qid");
        return resolve(true);
      })
    );
  }
}
