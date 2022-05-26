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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavEmbedBuilder = void 0;
const discord_js_1 = require("discord.js");
class NavEmbedBuilder {
    constructor(embeds) {
        this.embeds = [];
        this.counter = 0;
        if (embeds.length < 2)
            throw new Error('NavEmbedBuilder requires at least 2 embeds');
        this.embeds = embeds;
    }
    start(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const l_button = new discord_js_1.ButtonBuilder()
                .setLabel('◀️​')
                .setCustomId(`left-${interaction.id}`)
                .setStyle(discord_js_1.ButtonStyle.Primary)
                .setDisabled(true);
            const r_button = new discord_js_1.ButtonBuilder()
                .setLabel('​▶️')
                .setCustomId(`right-${interaction.id}`)
                .setStyle(discord_js_1.ButtonStyle.Primary);
            const mid_button = new discord_js_1.ButtonBuilder()
                .setLabel('🗑️')
                .setCustomId(`mid-${interaction.id}`)
                .setStyle(discord_js_1.ButtonStyle.Danger);
            const buttons = [l_button, mid_button, r_button];
            const row = new discord_js_1.ActionRowBuilder().addComponents(buttons);
            const rep = interaction.reply({
                embeds: [
                    this.embeds[0].setFooter({
                        text: `page ${this.counter + 1} of ${this.embeds.length}`
                    })
                ],
                components: [row],
                fetchReply: true
            });
            const collector = (yield rep).createMessageComponentCollector({
                componentType: discord_js_1.ComponentType.Button,
                time: 60000,
                filter: i => i.user.id === interaction.user.id
            });
            collector === null || collector === void 0 ? void 0 : collector.on('collect', (i) => __awaiter(this, void 0, void 0, function* () {
                i.deferUpdate();
                if (i.customId == `mid-${interaction.id}`) {
                    collector.stop('pressed mid button');
                    return;
                }
                if (i.customId == `left-${interaction.id}`) {
                    this.counter--;
                    if (this.counter < 0)
                        this.counter = 0;
                }
                else if (i.customId == `right-${interaction.id}`) {
                    this.counter++;
                    if (this.counter >= this.embeds.length)
                        this.counter = this.embeds.length - 1;
                }
                if (this.counter === 0) {
                    l_button.setDisabled(true);
                    r_button.setDisabled(false);
                }
                if (this.counter === this.embeds.length - 1) {
                    l_button.setDisabled(false);
                    r_button.setDisabled(true);
                }
                if (this.counter > 0 && this.counter < this.embeds.length - 1) {
                    l_button.setDisabled(false);
                    r_button.setDisabled(false);
                }
                const buttons = [l_button, mid_button, r_button];
                const row = new discord_js_1.ActionRowBuilder().addComponents(buttons);
                if (interaction.id === interaction.id)
                    (yield rep).edit({
                        embeds: [
                            this.embeds[this.counter].setFooter({
                                text: `page ${this.counter} of ${this.embeds.length}`
                            })
                        ],
                        components: [row]
                    });
            }));
            collector === null || collector === void 0 ? void 0 : collector.on('end', (_collected, reason) => __awaiter(this, void 0, void 0, function* () {
                if (reason == 'pressed mid button') {
                    interaction.deleteReply();
                    return;
                }
                if (reason != 'pressed mid button')
                    interaction.editReply({ content: 'Buttons expired', components: [] });
            }));
        });
    }
}
exports.NavEmbedBuilder = NavEmbedBuilder;
