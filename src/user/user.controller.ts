import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'

import { UserDTO } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUpUser(@Body(ValidationPipe) user: UserDTO) {
    return await this.userService.createUser(user)
  }
}
