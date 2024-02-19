import {
  Body,
  Controller,
  Headers,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'

import { CreateUserDTO, LoginUserDTO } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUpUser(@Body(ValidationPipe) user: CreateUserDTO) {
    return await this.userService.createUser(user)
  }

  @Post('signin')
  async signInUser(@Body() user: LoginUserDTO) {
    return await this.userService.signInUser(user)
  }
}
