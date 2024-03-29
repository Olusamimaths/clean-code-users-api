import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AvatarModel {
  @Prop()
  _id: string;

  // virtual property
  id: string;

  @Prop()
  hash: string;

  @Prop()
  userId: string;
}

const AvatarSchema = SchemaFactory.createForClass(AvatarModel);

/**
 * Virtual property to return the id as a string
 * we don't want to expose the _id as it is an internal representation
 */
AvatarSchema.virtual('id').get(function (this: AvatarDocument) {
  return this._id;
});

export type AvatarDocument = AvatarModel & Document;

export { AvatarSchema };
