import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
export declare class NavEmbedBuilder {
    private embeds;
    private counter;
    constructor(embeds: EmbedBuilder[]);
    start(interaction: ChatInputCommandInteraction<'cached'>): Promise<void>;
}
