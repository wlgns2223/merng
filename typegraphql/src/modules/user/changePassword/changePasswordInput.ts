import { Field, InputType } from "type-graphql";
import { PasswordInput } from "../sharedPassword/passwordInput";

@InputType()
export class changePasswordInput extends PasswordInput {
  @Field()
  token: string;
}
