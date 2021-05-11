"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issuesRouter = void 0;
var express_1 = require("express");
var issue_1 = require("../entities/issue");
var core_1 = require("@mikro-orm/core");
var authorize_1 = require("../security/authorize");
var user_1 = require("../entities/user");
var message_1 = require("../entities/message");
exports.issuesRouter = express_1.Router();
exports.issuesRouter
    .use(function (req, res, next) {
    req.issueRepository = req.orm.em.getRepository(issue_1.Issue);
    next();
})
    // összes lekérdezése
    .get('', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var issues, issues;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.user.role === user_1.UserRole.Admin)) return [3 /*break*/, 2];
                return [4 /*yield*/, req.issueRepository.findAll({
                        populate: ['labels'],
                    })];
            case 1:
                issues = _a.sent();
                res.send(issues);
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, req.issueRepository.find({
                    user: {
                        id: req.user.id,
                    }
                }, {
                    populate: ['labels'],
                })];
            case 3:
                issues = _a.sent();
                res.send(issues);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); })
    // egy konkrét lekérdezése
    .get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var issue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.issueRepository.findOne({ id: parseInt(req.params.id) }, {
                    populate: ['labels', 'user', 'messages', 'messages.user'],
                })];
            case 1:
                issue = _a.sent();
                if (!issue) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                if (req.user.role !== user_1.UserRole.Admin && req.user.id !== issue.user.id) {
                    return [2 /*return*/, res.sendStatus(403)];
                }
                res.send(issue);
                return [2 /*return*/];
        }
    });
}); })
    // új létrehozása
    .post('', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var issue, wrappedIssue, labels;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                issue = new issue_1.Issue();
                wrappedIssue = core_1.wrap(issue);
                // a request összes issueban is megtalálható propertyjét besettelem az objektumba
                wrappedIssue.assign(req.body, { em: req.orm.em });
                // User hozzácsatolása az issuehoz
                issue.user = req.orm.em.getReference(user_1.User, req.user.id);
                labels = issue.labels.getItems();
                if (labels) {
                    labels
                        .filter(function (label) { return label.id; })
                        .forEach(function (label) { return req.orm.em.merge(label); });
                }
                // lementi és beküldi a db-be
                return [4 /*yield*/, req.issueRepository.persistAndFlush(issue)];
            case 1:
                // lementi és beküldi a db-be
                _a.sent();
                res.send(issue);
                return [2 /*return*/];
        }
    });
}); })
    .put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var issue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.issueRepository.findOne({ id: parseInt(req.params.id) }, {
                    populate: ['labels', 'user', 'messages', 'messages.user'],
                })];
            case 1:
                issue = _a.sent();
                if (!issue) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                if (req.user.role !== user_1.UserRole.Admin && req.user.id !== issue.user.id) {
                    return [2 /*return*/, res.sendStatus(403)];
                }
                core_1.wrap(issue).assign({
                    title: req.body.title || issue.title,
                    description: req.body.description || issue.description,
                    place: req.body.place || issue.place,
                    labels: req.body.labels || issue.labels,
                    status: req.body.status || issue.status,
                }, { em: req.orm.em });
                return [4 /*yield*/, req.issueRepository.persistAndFlush(issue)];
            case 2:
                _a.sent();
                res.send(issue);
                return [2 /*return*/];
        }
    });
}); })
    .delete('/:id', authorize_1.authorize(user_1.UserRole.Admin), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedCount;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, ((_a = req.issueRepository) === null || _a === void 0 ? void 0 : _a.nativeDelete({ id: id }))];
            case 1:
                deletedCount = _b.sent();
                if (deletedCount) {
                    return [2 /*return*/, res.sendStatus(204)];
                }
                return [2 /*return*/, res.sendStatus(404)];
        }
    });
}); })
    .post('/:id/messages', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var issue, newMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.issueRepository.findOne({ id: parseInt(req.params.id) }, {
                    populate: ['labels', 'user', 'messages'],
                })];
            case 1:
                issue = _a.sent();
                if (!issue) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                if (req.user.role !== user_1.UserRole.Admin && req.user.id !== issue.user.id) {
                    return [2 /*return*/, res.sendStatus(403)];
                }
                newMessage = new message_1.Message();
                core_1.wrap(newMessage).assign(req.body);
                newMessage.user = req.orm.em.getReference(user_1.User, req.user.id);
                ;
                issue.messages.add(newMessage);
                return [4 /*yield*/, req.issueRepository.persistAndFlush(issue)];
            case 2:
                _a.sent();
                return [4 /*yield*/, core_1.wrap(newMessage).init(true, ['user'])];
            case 3:
                _a.sent();
                res.send(newMessage);
                return [2 /*return*/];
        }
    });
}); })
    .get('/:id/messages', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var issue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.issueRepository.findOne({ id: parseInt(req.params.id) }, {
                    populate: ['user', 'messages', 'messages.user'],
                })];
            case 1:
                issue = _a.sent();
                if (!issue) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                if (req.user.role !== user_1.UserRole.Admin && req.user.id !== issue.user.id) {
                    return [2 /*return*/, res.sendStatus(403)];
                }
                res.send(issue.messages);
                return [2 /*return*/];
        }
    });
}); });
