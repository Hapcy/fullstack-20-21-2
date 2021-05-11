"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.User = void 0;
var core_1 = require("@mikro-orm/core");
var issue_1 = require("./issue");
var message_1 = require("./message");
var User = /** @class */ (function () {
    function User() {
        this.role = UserRole.User;
        this.issues = new core_1.Collection(this);
        this.messages = new core_1.Collection(this);
    }
    __decorate([
        core_1.PrimaryKey(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        core_1.Property(),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        core_1.Property({ hidden: true }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        core_1.Enum(),
        __metadata("design:type", String)
    ], User.prototype, "role", void 0);
    __decorate([
        core_1.OneToMany(function () { return issue_1.Issue; }, function (issue) { return issue.user; }),
        __metadata("design:type", Object)
    ], User.prototype, "issues", void 0);
    __decorate([
        core_1.OneToMany(function () { return message_1.Message; }, function (message) { return message.user; }),
        __metadata("design:type", Object)
    ], User.prototype, "messages", void 0);
    User = __decorate([
        core_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
var UserRole;
(function (UserRole) {
    UserRole["Guest"] = "GUEST";
    UserRole["User"] = "USER";
    UserRole["Admin"] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
