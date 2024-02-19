import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common'
import { Response } from 'express'

import { CreateUserDTO, LoginUserDTO } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUpUser(@Body(ValidationPipe) user: CreateUserDTO, @Res() res: Response) {
    return await this.userService.createUser(user, res)
  }

  @Post('signin')
  async signInUser(@Body() user: LoginUserDTO, @Res() res: Response) {
    return await this.userService.signInUser(user, res)
  }
}
