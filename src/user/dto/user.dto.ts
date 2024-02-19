import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}

export class LoginUserDTO {
  @IsEmail()
  email: string

  @IsString()
  password: string
}
