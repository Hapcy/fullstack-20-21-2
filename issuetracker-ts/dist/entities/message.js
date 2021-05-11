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
exports.Message = void 0;
var core_1 = require("@mikro-orm/core");
var issue_1 = require("./issue");
var user_1 = require("./user");
var Message = /** @class */ (function () {
    function Message() {
        this.createdAt = new Date();
        this.modifiedAt = new Date();
    }
    __decorate([
        core_1.PrimaryKey(),
        __metadata("design:type", Number)
    ], Message.prototype, "id", void 0);
    __decorate([
        core_1.Property(),
        __metadata("design:type", String)
    ], Message.prototype, "text", void 0);
    __decorate([
        core_1.Property(),
        __metadata("design:type", Date)
    ], Message.prototype, "createdAt", void 0);
    __decorate([
        core_1.Property({ onUpdate: function () { return new Date(); } }),
        __metadata("design:type", Date)
    ], Message.prototype, "modifiedAt", void 0);
    __decorate([
        core_1.ManyToOne(function () { return issue_1.Issue; }),
        __metadata("design:type", issue_1.Issue)
    ], Message.prototype, "issue", void 0);
    __decorate([
        core_1.ManyToOne(function () { return user_1.User; }),
        __metadata("design:type", user_1.User)
    ], Message.prototype, "user", void 0);
    Message = __decorate([
        core_1.Entity()
    ], Message);
    return Message;
}());
exports.Message = Message;
