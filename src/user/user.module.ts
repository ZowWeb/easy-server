import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserSchema } from './user.model'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), forwardRef(() => AuthModule)],
  providers: [UserService, JwtService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
