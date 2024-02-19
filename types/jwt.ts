export type JwtPayload = {
  email: string
  password: string
  expiration?: Date
}
