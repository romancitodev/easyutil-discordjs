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
exports.PaginationBuilder = void 0;
var discord_js_1 = require("discord.js");
var PaginationBuilder = /** @class */ (function () {
    function PaginationBuilder(data) {
        this.embeds = [];
        this.counter = 0;
        if (data.embeds.length < 2)
            throw new Error('NavEmbedBuilder requires at least 2 embeds');
        if (!data.embeds.every(function (embed) { return typeof embed === typeof discord_js_1.EmbedBuilder; }))
            throw new Error('All items of the array must be EmbedBuilder type');
        this.embeds = data.embeds;
        this.data = data;
    }
    PaginationBuilder.prototype.start = function (interaction) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function () {
            var l_button, r_button, mid_button, first_button, last_button, buttons, row, rep, collector;
            var _this = this;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        l_button = new discord_js_1.ButtonBuilder()
                            .setLabel(((_b = (_a = this.data.options) === null || _a === void 0 ? void 0 : _a.emotes) === null || _b === void 0 ? void 0 : _b.left) || '◀️​')
                            .setCustomId("left-".concat(interaction.id))
                            .setStyle(discord_js_1.ButtonStyle.Primary)
                            .setDisabled(true);
                        r_button = new discord_js_1.ButtonBuilder()
                            .setLabel(((_d = (_c = this.data.options) === null || _c === void 0 ? void 0 : _c.emotes) === null || _d === void 0 ? void 0 : _d.right) || '​▶️')
                            .setCustomId("right-".concat(interaction.id))
                            .setStyle(discord_js_1.ButtonStyle.Primary);
                        mid_button = new discord_js_1.ButtonBuilder()
                            .setLabel(((_f = (_e = this.data.options) === null || _e === void 0 ? void 0 : _e.emotes) === null || _f === void 0 ? void 0 : _f.mid) || '🗑️')
                            .setCustomId("mid-".concat(interaction.id))
                            .setStyle(discord_js_1.ButtonStyle.Danger);
                        first_button = new discord_js_1.ButtonBuilder()
                            .setLabel(((_h = (_g = this.data.options) === null || _g === void 0 ? void 0 : _g.emotes) === null || _h === void 0 ? void 0 : _h.first) || '⏪​')
                            .setCustomId("first-".concat(interaction.id))
                            .setStyle(discord_js_1.ButtonStyle.Primary)
                            .setDisabled(true);
                        last_button = new discord_js_1.ButtonBuilder()
                            .setLabel(((_k = (_j = this.data.options) === null || _j === void 0 ? void 0 : _j.emotes) === null || _k === void 0 ? void 0 : _k.last) || '⏩​')
                            .setCustomId("last-".concat(interaction.id))
                            .setStyle(discord_js_1.ButtonStyle.Primary)
                            .setDisabled(true);
                        buttons = [first_button, l_button, mid_button, r_button, last_button];
                        row = new discord_js_1.ActionRowBuilder().addComponents(buttons);
                        rep = interaction.reply({
                            embeds: [this.embeds[0].setFooter({
                                    text: "page ".concat(this.counter + 1, " of ").concat(this.embeds.length)
                                })], components: [row], fetchReply: true
                        });
                        return [4 /*yield*/, rep];
                    case 1:
                        collector = (_l.sent()).createMessageComponentCollector({
                            componentType: discord_js_1.ComponentType.Button, time: 60000, filter: function (i) { return i.user.id === interaction.user.id; }
                        });
                        collector === null || collector === void 0 ? void 0 : collector.on('collect', function (i) { return __awaiter(_this, void 0, void 0, function () {
                            var buttons, row;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        i.deferUpdate();
                                        if (i.customId == "mid-".concat(interaction.id)) {
                                            collector.stop('pressed mid button');
                                            return [2 /*return*/];
                                        }
                                        if (i.customId == "left-".concat(interaction.id)) {
                                            this.counter--;
                                            if (this.counter < 0)
                                                this.counter = 0;
                                        }
                                        else if (i.customId == "right-".concat(interaction.id)) {
                                            this.counter++;
                                            if (this.counter >= this.embeds.length)
                                                this.counter = this.embeds.length - 1;
                                        }
                                        else if (i.customId == "first-".concat(interaction.id)) {
                                            this.counter = 0;
                                        }
                                        else if (i.customId == "last-".concat(interaction.id)) {
                                            this.counter = this.embeds.length - 1;
                                        }
                                        if (this.counter === 0) {
                                            l_button.setDisabled(true);
                                            r_button.setDisabled(false);
                                            first_button.setDisabled(true);
                                            last_button.setDisabled(false);
                                        }
                                        if (this.counter === this.embeds.length - 1) {
                                            first_button.setDisabled(false);
                                            l_button.setDisabled(false);
                                            r_button.setDisabled(true);
                                            last_button.setDisabled(true);
                                        }
                                        if (this.counter > 0 && this.counter < this.embeds.length - 1) {
                                            first_button.setDisabled(false);
                                            l_button.setDisabled(false);
                                            r_button.setDisabled(false);
                                            last_button.setDisabled(false);
                                        }
                                        buttons = [first_button, l_button, mid_button, r_button, last_button];
                                        row = new discord_js_1.ActionRowBuilder().addComponents(buttons);
                                        if (!(interaction.id === interaction.id)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, rep];
                                    case 1:
                                        (_a.sent()).edit({ embeds: [this.embeds[this.counter].setFooter({
                                                    text: "page ".concat(this.counter + 1, " of ").concat(this.embeds.length)
                                                })], components: [row] });
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        collector === null || collector === void 0 ? void 0 : collector.on('end', function (_collected, reason) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                if (reason === 'messageDelete')
                                    return [2 /*return*/];
                                if (reason === 'pressed mid button') {
                                    try {
                                        interaction.deleteReply();
                                    }
                                    catch (_c) { }
                                    ;
                                    return [2 /*return*/];
                                }
                                if (reason !== 'pressed mid button')
                                    interaction.editReply({ content: ((_a = this.data.options) === null || _a === void 0 ? void 0 : _a.message) || 'Buttons expired', components: [] });
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    return PaginationBuilder;
}());
exports.PaginationBuilder = PaginationBuilder;
