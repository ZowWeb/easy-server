import { UserService } from '../user/user.service';
import { JwtPayload } from 'types/jwt';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    validateUser(payload: JwtPayload): Promise<import("../user/user.model").UserModel>;
}
