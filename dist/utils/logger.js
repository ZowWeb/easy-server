"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, colorize, printf } = winston_1.format;
const messageFormat = printf(({ level, message }) => {
    return `${new Date()} ${level}: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    format: combine((0, winston_1.format)((info) => {
        info.level = info.level.toUpperCase();
        return info;
    })(), colorize(), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json(), messageFormat),
    transports: [new winston_1.transports.Console()],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map