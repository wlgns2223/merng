import { Query, Resolver, Mutation, Arg, Authorized } from "type-graphql";
import bcrypt from "bcrypt";
import UserModel, { User } from "../../model/user";
import { RegisterInput } from "./register/registerInput";

@Resolver()
export class RegisterResolver {
  @Authorized()
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

    const newUser = await user.save();

    return newUser;
  }
}
