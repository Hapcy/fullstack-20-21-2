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
exports.labelsRouter = void 0;
var express_1 = require("express");
var core_1 = require("@mikro-orm/core");
var label_1 = require("../entities/label");
exports.labelsRouter = express_1.Router();
exports.labelsRouter
    .use(function (req, res, next) {
    req.labelRepository = req.orm.em.getRepository(label_1.Label);
    next();
})
    // összes lekérdezése
    .get('', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, labels;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                text = req.query.text || '';
                return [4 /*yield*/, req.labelRepository.find({
                        text: { $like: "%" + text + "%" },
                    })];
            case 1:
                labels = _a.sent();
                res.send(labels);
                return [2 /*return*/];
        }
    });
}); })
    // új létrehozása
    .post('', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var label, wrappedLabel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                label = new label_1.Label();
                wrappedLabel = core_1.wrap(label);
                wrappedLabel.assign(req.body);
                // lementi és beküldi a db-be
                return [4 /*yield*/, req.labelRepository.persistAndFlush(label)];
            case 1:
                // lementi és beküldi a db-be
                _a.sent();
                res.send(label);
                return [2 /*return*/];
        }
    });
}); });
