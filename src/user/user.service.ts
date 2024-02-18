import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import omit from 'lodash/omit'

import { UserDTO } from './dto/user.dto'
import { Model } from 'mongoose'
import { UserModel } from './user.model'

import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
  ) {}

  async createUser(user: UserDTO): Promise<string> {
    try {
      const { password } = user
      const salt = await bcrypt.genSalt(10)
      const hashedPwd = await bcrypt.hash(password, salt)
      const newUser = new this.userModel({
        ...omit(user, ['password']),
        password: hashedPwd,
      })
      await newUser.save()

      return 'User created!'
    } catch (e) {
      console.error(`UserService ~ createUser ~ e:`, e)
      return `[createUser] catch: ${JSON.stringify(e)}`
    }
  }
}
