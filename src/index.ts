import { ButtonStyle, ChatInputCommandInteraction, ComponentType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, MessageActionRowComponentBuilder} from "discord.js";
import { BuilderOptions } from "../helpers/BuilderTypes";

export class PaginationBuilder {
    private data: BuilderOptions;
    private embeds: EmbedBuilder[] = [];
    private counter: number = 0;
    constructor(data: BuilderOptions) {
        if (data.embeds.length < 2) throw new Error('NavEmbedBuilder requires at least 2 embeds');
        if (!data.embeds.every(embed => typeof embed === typeof EmbedBuilder)) throw new Error('All items of the array must be EmbedBuilder type')
        this.embeds = data.embeds;
        this.data = data
    }
    public async start(interaction: ChatInputCommandInteraction<'cached'>) {
        const l_button = new ButtonBuilder()
        .setLabel(this.data.options?.emotes?.left || '◀️​')
        .setCustomId(`left-${interaction.id}`)
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true)
        
        const r_button = new ButtonBuilder()
        .setLabel(this.data.options?.emotes?.right || '​▶️')
        .setCustomId(`right-${interaction.id}`)
        .setStyle(ButtonStyle.Primary)
        
        const mid_button = new ButtonBuilder()
        .setLabel(this.data.options?.emotes?.mid || '🗑️')
        .setCustomId(`mid-${interaction.id}`)
        .setStyle(ButtonStyle.Danger)
        
        const first_button = new ButtonBuilder()
        .setLabel(this.data.options?.emotes?.first || '⏪​')
        .setCustomId(`first-${interaction.id}`)
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true)

        const last_button = new ButtonBuilder()
        .setLabel(this.data.options?.emotes?.last || '⏩​')
        .setCustomId(`last-${interaction.id}`)
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true)

        const buttons = [first_button, l_button, mid_button, r_button, last_button];
        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(buttons);
        const rep = interaction.reply({
            embeds: [this.embeds[0].setFooter({
                text: `page ${this.counter + 1} of ${this.embeds.length}`
            })], components: [row], fetchReply: true
        });
        const collector = (await rep).createMessageComponentCollector({
            componentType: ComponentType.Button, time: 60000, filter: (i) => i.user.id === interaction.user.id
        });
        collector?.on('collect', async (i) => {
            i.deferUpdate();
            if (i.customId == `mid-${interaction.id}`) {
                collector.stop('pressed mid button');
                return;
            }
            if (i.customId == `left-${interaction.id}`) {
                this.counter--;
                if (this.counter < 0) this.counter = 0;
                
            } else  if (i.customId == `right-${interaction.id}`) {
                this.counter++;
                if (this.counter >= this.embeds.length) this.counter = this.embeds.length - 1;
            } else if (i.customId == `first-${interaction.id}`) {
                this.counter = 0
            } else if (i.customId == `last-${interaction.id}`) {
                this.counter = this.embeds.length - 1
            }


            if (this.counter === 0) { l_button.setDisabled(true); r_button.setDisabled(false); first_button.setDisabled(true); last_button.setDisabled(false) }
            if (this.counter === this.embeds.length - 1) { first_button.setDisabled(false); l_button.setDisabled(false); r_button.setDisabled(true); last_button.setDisabled(true)}
            if (this.counter > 0 && this.counter < this.embeds.length - 1) { first_button.setDisabled(false); l_button.setDisabled(false); r_button.setDisabled(false);last_button.setDisabled(false) }
            const buttons = [first_button, l_button, mid_button, r_button, last_button];
            const row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(buttons);
            if (interaction.id === interaction.id)
            (await rep).edit({ embeds: [this.embeds[this.counter].setFooter({
                text: `page ${this.counter + 1} of ${this.embeds.length}`
            })], components: [row] })
        })

        collector?.on('end', async (_collected, reason) => {
            if (reason === 'messageDelete') return
            if (reason === 'pressed mid button') { try {interaction.deleteReply()} catch {}; return; }
            if (reason !== 'pressed mid button') interaction.editReply({ content: this.data.options?.message || 'Buttons expired', components: []});
        })
    }
}