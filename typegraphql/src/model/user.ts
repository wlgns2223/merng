import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ObjectType, Root } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  @prop()
  firstName: string;

  @Field()
  @prop()
  lastName: string;

  @Field()
  @prop()
  password: string;

  @Field()
  @prop({ unique: true })
  email: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }
}

const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});

export default UserModel;
