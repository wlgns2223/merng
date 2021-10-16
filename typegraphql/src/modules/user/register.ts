import { Query, Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import bcrypt from "bcrypt";
import UserModel, { User } from "../../model/user";
import { RegisterInput } from "./register/registerInput";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";
import sendEmail from "../../utils/sendEmail";
import createConfirmURL from "../../utils/createConfirmUrl";

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => String)
  async hello() {
    return "hello";
  }

  @Mutation(() => User)
  async register(
    @Arg("input") { firstName, lastName, email, password }: RegisterInput
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const isUserAlreadyExist = await UserModel.findOne({ email });
    if (isUserAlreadyExist) return Error("User already Exists");

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const conFirmUrl = await createConfirmURL(user.id);
    await sendEmail(email, conFirmUrl);

    return user;
  }
}
