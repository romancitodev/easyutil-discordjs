import { EmbedBuilder } from "discord.js";
export interface BuilderOptions {
    embeds: EmbedBuilder[];
    options?: {
        message?: string;
        emotes?: {
            first?: string;
            left?: string;
            mid?: string;
            right?: string;
            last?: string;
        };
    };
}
