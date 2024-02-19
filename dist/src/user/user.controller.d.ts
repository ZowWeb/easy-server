import { CreateUserDTO, LoginUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUpUser(user: CreateUserDTO): Promise<{
        token: string;
        error?: undefined;
    } | {
        error: {
            error: string;
            message: string;
        };
        token?: undefined;
    }>;
    signInUser(user: LoginUserDTO): Promise<{
        token: string;
    }>;
}
