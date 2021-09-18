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
exports.DataCache = void 0;
var airtable = require('airtable');
var base = new airtable({ apiKey: 'keyJqUAOTD2NolCLF' }).base('appm8f92LjQairrC2');
var Player_1 = require("./types/Player");
// For now, this cache uses separate containers for every category of data the database has to offer
// Ideally, we'd like to be able to store data with a key, and to retrieve some data, we pass in the key,
// just to make it easier to pull the required data
// TODO: Determine if this is a good idea or not
var DataCache = /** @class */ (function () {
    function DataCache() {
        var _this = this;
        this.IsCacheAvailable = true;
        // this._allianceCache = [];
        this._playerCache = [];
        // When first starting the server, we want to construct our cache right away
        this.UpdateDataCache().then();
        DataCache.Log("Constructor has been called...");
        this._timerID = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        DataCache.Log("Timer...");
                        return [4 /*yield*/, this.UpdateDataCache()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }, 1800000); // TODO: Pull update rate from an external file
    }
    Object.defineProperty(DataCache, "Instance", {
        // Singleton
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataCache.prototype, "PlayerCache", {
        get: function () {
            return this._playerCache;
        },
        enumerable: false,
        configurable: true
    });
    // How do we store data on the database?
    // Per IK server, per alliance, all players in a table, all alliances in another table etc?
    DataCache.prototype.UpdateDataCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.IsCacheAvailable = false;
                        DataCache.Log("Started updated data cache...");
                        // TODO: Consider not awaiting these individual calls, simply store the promises and await them at the end
                        return [4 /*yield*/, this.FetchPlayerData()];
                    case 1:
                        // TODO: Consider not awaiting these individual calls, simply store the promises and await them at the end
                        _b.sent();
                        return [4 /*yield*/, this.FetchAllianceData()];
                    case 2:
                        _b.sent();
                        this.IsCacheAvailable = true;
                        DataCache.Log("Finished updating data cache.");
                        return [2 /*return*/];
                }
            });
        });
    };
    DataCache.Log = function (message) {
        console.log(message);
    };
    DataCache.LogError = function (message) {
        console.error(message);
    };
    DataCache.prototype.FetchPlayerData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var records;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        DataCache.Log("Started fetching player data...");
                        return [4 /*yield*/, base('Players').select({ view: "Grid view" }).all()];
                    case 1:
                        records = _b.sent();
                        // TODO: The alliance is a reference to the Alliances table, not the actual name of the alliance, fix this
                        records.forEach(function (record) {
                            var player = new Player_1.Player(record.get('frmAlliance'), record.get('Troop Power'), record.get('Tech Contributions'), record.get('Highest Power'), record.get('Defeat'), record.get('Dismantle Durability'), record.get('Rank'), record.get('NameOverride'), record.get('NameInterpreted'));
                            _this._playerCache.push(player);
                        });
                        DataCache.Log("Finished fetching player data.");
                        return [2 /*return*/];
                }
            });
        });
    };
    DataCache.prototype.FetchAllianceData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/];
            });
        });
    };
    var _a;
    _a = DataCache;
    // Singleton
    DataCache._instance = new _a();
    return DataCache;
}());
exports.DataCache = DataCache;
