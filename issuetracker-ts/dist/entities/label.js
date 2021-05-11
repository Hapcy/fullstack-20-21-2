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
exports.Label = void 0;
var core_1 = require("@mikro-orm/core");
var issue_1 = require("./issue");
var Label = /** @class */ (function () {
    function Label() {
        this.issues = new core_1.Collection(this);
    }
    __decorate([
        core_1.PrimaryKey(),
        __metadata("design:type", Number)
    ], Label.prototype, "id", void 0);
    __decorate([
        core_1.Property(),
        __metadata("design:type", String)
    ], Label.prototype, "text", void 0);
    __decorate([
        core_1.ManyToMany(function () { return issue_1.Issue; }, function (issue) { return issue.labels; }),
        __metadata("design:type", Object)
    ], Label.prototype, "issues", void 0);
    Label = __decorate([
        core_1.Entity()
    ], Label);
    return Label;
}());
exports.Label = Label;
