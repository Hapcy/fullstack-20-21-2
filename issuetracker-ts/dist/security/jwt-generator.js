"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret_1 = require("./secret");
function generateJwt(user) {
    var payload = {
        sub: user.id,
        role: user.role,
        username: user.username,
    };
    var token = jsonwebtoken_1.default.sign(payload, secret_1.secret);
    return token;
}
exports.generateJwt = generateJwt;
