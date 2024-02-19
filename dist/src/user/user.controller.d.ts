import { Response } from 'express';
import { CreateUserDTO, LoginUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUpUser(user: CreateUserDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    signInUser(user: LoginUserDTO, res: Response): Promise<Response<any, Record<string, any>>>;
}
