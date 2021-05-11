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
exports.IssueStatus = exports.Issue = void 0;
var core_1 = require("@mikro-orm/core");
var label_1 = require("./label");
var message_1 = require("./message");
var user_1 = require("./user");
var Issue = /** @class */ (function () {
    function Issue() {
        this.status = IssueStatus.NEW;
        this.createdAt = new Date();
        this.modifiedAt = new Date();
        this.labels = new core_1.Collection(this);
        this.messages = new core_1.Collection(this);
    }
    __decorate([
        core_1.PrimaryKey(),
        __metadata("design:type", Number)
    ], Issue.prototype, "id", void 0);
    __decorate([
        core_1.Property(),
        __metadata("design:type", String)
    ], Issue.prototype, "description", void 0);
    __decorate([
        core_1.Property(),
        __metadata("design:type", String)
    ], Issue.prototype, "title", void 0);
    __decorate([
        core_1.Property(),
        __metadata("design:type", String)
    ], Issue.prototype, "place", void 0);
    __decorate([
        core_1.Enum(),
        __metadata("design:type", String)
    ], Issue.prototype, "status", void 0);
    __decorate([
        core_1.Property(),
        __metadata("design:type", Date)
    ], Issue.prototype, "createdAt", void 0);
    __decorate([
        core_1.Property({ onUpdate: function () { return new Date(); } }),
        __metadata("design:type", Date)
    ], Issue.prototype, "modifiedAt", void 0);
    __decorate([
        core_1.ManyToMany(function () { return label_1.Label; }, 'issues', { owner: true }),
        __metadata("design:type", Object)
    ], Issue.prototype, "labels", void 0);
    __decorate([
        core_1.ManyToOne(function () { return user_1.User; }),
        __metadata("design:type", user_1.User)
    ], Issue.prototype, "user", void 0);
    __decorate([
        core_1.OneToMany(function () { return message_1.Message; }, function (message) { return message.issue; }),
        __metadata("design:type", Object)
    ], Issue.prototype, "messages", void 0);
    Issue = __decorate([
        core_1.Entity()
    ], Issue);
    return Issue;
}());
exports.Issue = Issue;
var IssueStatus;
(function (IssueStatus) {
    IssueStatus["NEW"] = "NEW";
    IssueStatus["DOING"] = "DOING";
    IssueStatus["DONE"] = "DONE";
})(IssueStatus = exports.IssueStatus || (exports.IssueStatus = {}));
