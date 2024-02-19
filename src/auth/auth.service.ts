import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common'

import { UserService } from '../user/user.service'
import { JwtPayload } from 'types/jwt'

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async validateUser(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.email)
    if (user.password !== payload.password) {
      throw new UnauthorizedException('Password not correct!')
    }
    return user
  }
}
