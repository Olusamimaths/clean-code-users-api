import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserModel {
  @Prop()
  _id: string;

  // virtual property
  id: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  avatar: string;
}

const UserSchema = SchemaFactory.createForClass(UserModel);

/**
 * Virtual property to return the id as a string
 * we don't want to expose the _id as it is an internal representation
 */
UserSchema.virtual('id').get(function (this: UserDocument) {
  return this._id;
});

export type UserDocument = UserModel & Document;

export { UserSchema };
