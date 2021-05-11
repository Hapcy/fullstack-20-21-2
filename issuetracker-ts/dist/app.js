"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var controllers_1 = require("./controllers");
var entities_1 = require("./entities");
var mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
var passport_1 = require("./security/passport");
var app = express_1.default();
exports.app = app;
app.use(body_parser_1.default.json());
app.use(passport_1.passport.initialize());
app.use(entities_1.mikroorm(mikro_orm_config_1.default));
app.use(controllers_1.router);
