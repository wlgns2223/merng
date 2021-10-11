import { Field, InputType } from "type-graphql";
import { Length, IsEmail } from "class-validator";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 10)
  firstName: string;

  @Field()
  @Length(1, 10)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
