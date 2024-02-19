import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { CreateUserDTO, LoginUserDTO } from './dto/user.dto'
import { UserModel } from './user.model'
import { JwtService } from '@nestjs/jwt'
import { getErrorMessage } from 'utils/error'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
    private jwtService: JwtService,
  ) {}

  async createUser(user: CreateUserDTO) {
    try {
      const { password, ...rest } = user
      const hashedPwd = await bcrypt.hash(password, 10)
      const newUser = new this.userModel({
        ...rest,
        password: hashedPwd,
      })
      const savedUser = await newUser.save()

      const token = this.jwtService.sign(
        { email: savedUser.email },
        {
          secret: 'secret',
          expiresIn: '3d',
        },
      )

      return { token }
    } catch (e) {
      console.error(`[createUser] catch:`, e)

      return getErrorMessage(e)
    }
  }

  async findOne(email: string): Promise<UserModel> {
    return await this.userModel.findOne({ email })
  }

  async signInUser(user: LoginUserDTO) {
    const { email, password } = user
    const foundUser = await this.findOne(email)
    if (!foundUser) {
      throw new UnauthorizedException('Email does not exist!')
    }

    const isMatch = await bcrypt.compare(password, foundUser.password)
    if (!isMatch) {
      throw new UnauthorizedException('Password is incorrect!')
    }

    const payload = { email: foundUser.email }
    const token = this.jwtService.sign(payload, {
      secret: 'secret',
      expiresIn: '3d',
    })
    return { token }
  }
}
