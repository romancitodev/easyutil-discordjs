import { ChatInputCommandInteraction } from "discord.js";
import { BuilderOptions } from "./helpers/BuilderTypes";
export declare class PaginationBuilder {
    private data;
    private embeds;
    private counter;
    constructor(data: BuilderOptions);
    start(interaction: ChatInputCommandInteraction<'cached'>): Promise<void>;
}
