"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const error_1 = require("../../utils/error");
const logger_1 = __importDefault(require("../../utils/logger"));
const JWT_EXPIRES_IN = 60 * 2;
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async createUser(user, res) {
        try {
            const { password, ...rest } = user;
            const hashedPwd = await bcrypt.hash(password, 10);
            const newUser = new this.userModel({
                ...rest,
                password: hashedPwd,
            });
            const savedUser = await newUser.save();
            const token = this.jwtService.sign({ email: savedUser.email, name: savedUser.name }, {
                secret: process.env.JWT_SECRET,
                expiresIn: JWT_EXPIRES_IN,
            });
            return res.status(201).json({ token, expiresIn: JWT_EXPIRES_IN });
        }
        catch (e) {
            logger_1.default.error(`[createUser] catch:`, e);
            return res.status(400).json((0, error_1.getErrorMessage)(e));
        }
    }
    async findOneByEmail(email) {
        try {
            return await this.userModel.findOne({ email });
        }
        catch (e) {
            logger_1.default.error(`[findOneByEmail] catch:`, e);
        }
    }
    async signInUser(user, res) {
        const { email, password } = user;
        const foundUser = await this.findOneByEmail(email);
        if (!foundUser) {
            logger_1.default.error(`[signInUser]: User [email: ${email}] does not exist!`);
            throw new common_1.UnauthorizedException('Email does not exist!');
        }
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            logger_1.default.error('[signInUser]: Password is incorrect!');
            throw new common_1.UnauthorizedException('Password is incorrect!');
        }
        const payload = { email: foundUser.email, name: foundUser.name };
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: JWT_EXPIRES_IN,
        });
        return res.status(200).json({ token, expiresIn: JWT_EXPIRES_IN });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map