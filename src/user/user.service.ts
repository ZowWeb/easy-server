import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { CreateUserDTO, LoginUserDTO } from './dto/user.dto'
import { UserModel } from './user.model'
import { JwtService } from '@nestjs/jwt'
import { getErrorMessage } from 'utils/error'
import { Response } from 'express'

const JWT_EXPIRES_IN = 60 * 2

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
    private jwtService: JwtService,
  ) {}

  async createUser(user: CreateUserDTO, res: Response) {
    try {
      const { password, ...rest } = user
      const hashedPwd = await bcrypt.hash(password, 10)
      const newUser = new this.userModel({
        ...rest,
        password: hashedPwd,
      })
      const savedUser = await newUser.save()

      const token = this.jwtService.sign(
        { email: savedUser.email, name: savedUser.name },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: JWT_EXPIRES_IN,
        },
      )

      return res.status(201).json({ token, expiresIn: JWT_EXPIRES_IN })
    } catch (e) {
      console.error(`[createUser] catch:`, e)

      return res.status(400).json(getErrorMessage(e))
    }
  }

  async findOneByEmail(email: string): Promise<UserModel> {
    return await this.userModel.findOne({ email })
  }

  async signInUser(user: LoginUserDTO, res: Response) {
    const { email, password } = user
    const foundUser = await this.findOneByEmail(email)
    if (!foundUser) {
      throw new UnauthorizedException('Email does not exist!')
    }

    const isMatch = await bcrypt.compare(password, foundUser.password)
    if (!isMatch) {
      throw new UnauthorizedException('Password is incorrect!')
    }

    const payload = { email: foundUser.email, name: foundUser.name }
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: JWT_EXPIRES_IN,
    })
    return res.status(200).json({ token, expiresIn: JWT_EXPIRES_IN })
  }
}
