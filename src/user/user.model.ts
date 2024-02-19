import { Schema } from 'mongoose'

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export type UserModel = {
  _id: string
  name: string
  email: string
  password: string
}
