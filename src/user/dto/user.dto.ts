import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'
import { PwdRegex } from 'utils/regex'

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @Matches(PwdRegex, {
    message:
      'Password must be at least 8 characters long and contain at least one letter, one number and one special character',
  })
  password: string
}

export class LoginUserDTO {
  @IsEmail()
  email: string

  @IsString()
  password: string
}
