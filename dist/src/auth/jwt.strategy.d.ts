import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from 'types/jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<import("../user/user.model").UserModel>;
}
export {};
