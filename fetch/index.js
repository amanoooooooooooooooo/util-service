"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
exports.__esModule = true;
// import fetch from 'isomorphic-unfetch'
var fetchImport = require("isomorphic-unfetch");
var fetch = (fetchImport["default"] || fetchImport);
var obj2urlParams = function (obj) {
    if (obj === void 0) { obj = {}; }
    return Object.keys(obj).length === 0
        ? ''
        : Object.keys(obj)
            .filter(function (key) { return obj[key] !== undefined; })
            .reduce(function (str, key) { return "" + str + key + "=" + obj[key] + "&"; }, '')
            .slice(0, -1)
            .replace(/^/, '?');
};
function commonHeaders() {
    return {
        'content-type': 'application/json'
    };
}
function cost(startTime) {
    return (new Date().getTime() - startTime.getTime()) / 1000;
}
var Color;
(function (Color) {
    Color["blue"] = "color:blue";
    Color["red"] = "color:red";
})(Color || (Color = {}));
function filter200Status(r) {
    return __awaiter(this, void 0, void 0, function () {
        var text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(r.status !== 200)) return [3 /*break*/, 2];
                    return [4 /*yield*/, r.text()];
                case 1:
                    text = _a.sent();
                    return [2 /*return*/, Promise.reject(r.url + " error status " + r.status + " " + r.statusText + " " + text)
                        // throw new Error(`${r.url} error status ${r.status} ${r.statusText} ${text}`);
                    ];
                case 2: return [2 /*return*/, r.json()];
            }
        });
    });
}
var Fetch = /** @class */ (function () {
    function Fetch() {
    }
    Fetch.get = function (url, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var completeUrl, options, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        completeUrl = url + obj2urlParams(params);
                        options = { credentials: this.credentials };
                        return [4 /*yield*/, this.fetch(completeUrl, options)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Fetch.post = function (url, body) {
        if (body === void 0) { body = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var options, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug && console.debug('__post__:', url);
                        options = {
                            method: 'POST',
                            body: JSON.stringify(body),
                            headers: this.headers,
                            credentials: this.credentials
                        };
                        return [4 /*yield*/, this.fetch(url, options)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Fetch.put = function (url, body) {
        if (body === void 0) { body = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var options, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            method: 'PUT',
                            headers: this.headers,
                            body: JSON.stringify(body),
                            credentials: this.credentials
                        };
                        return [4 /*yield*/, this.fetch(url, options)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Fetch["delete"] = function (url, body) {
        if (body === void 0) { body = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var options, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            method: 'DELETE',
                            headers: this.headers,
                            body: JSON.stringify(body),
                            credentials: this.credentials
                        };
                        return [4 /*yield*/, this.fetch(url, options)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Fetch.fetch = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var start, mark, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = new Date();
                        mark = "__" + (options.method || 'GET').toLowerCase() + "__";
                        this.debug && console.debug('%s: %s', mark, url);
                        return [4 /*yield*/, fetch(url, options)
                                .then(filter200Status)["catch"](function (e) {
                                console.error('%c %s:%s Error Cost %f ms', Color.red, mark, url, cost(start), e);
                                throw e;
                            })];
                    case 1:
                        result = _a.sent();
                        this.debug && console.debug('%c %s: %s Success Cost %f ms res: %o', Color.blue, mark, url, cost(start), result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Fetch.headers = commonHeaders();
    Fetch.credentials = 'omit';
    Fetch.debug = true;
    return Fetch;
}());
exports["default"] = Fetch;
