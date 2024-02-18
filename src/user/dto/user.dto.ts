import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}
