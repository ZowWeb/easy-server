import { CreateUserDTO, LoginUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUpUser(user: CreateUserDTO): Promise<{
        error: string;
        message: string;
    } | {
        token: string;
    }>;
    signInUser(user: LoginUserDTO): Promise<{
        token: string;
    }>;
}
