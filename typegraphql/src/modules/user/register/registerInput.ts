import { Field, InputType } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { PasswordInput } from "../sharedPassword/passwordInput";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 10)
  firstName: string;

  @Field()
  @Length(1, 10)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;
}
