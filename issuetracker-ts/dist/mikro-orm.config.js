"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var issue_1 = require("./entities/issue");
var label_1 = require("./entities/label");
var user_1 = require("./entities/user");
var message_1 = require("./entities/message");
var process_1 = require("process");
exports.default = {
    entities: [issue_1.Issue, label_1.Label, user_1.User, message_1.Message],
    dbName: process_1.env.NODE_ENV === 'test' ? 'issue-tracker.test.sqlite' : 'issue-tracker.sqlite',
    type: 'sqlite',
};
