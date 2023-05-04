import { CommandInteraction, DMChannel, GuildMember, MessageComponentInteraction, SelectMenuInteraction } from "discord.js";
import { Messenger } from "../messaging";

export default {
    name: '',
    adminRequired: false,
    canRunInDMs: false,
    defer: true,
    commandExecute: async (interaction: CommandInteraction, m: Messenger) => {
        const subCommandName = interaction.options.data[0].name;
        switch (subCommandName) {

        }
    },
    messageComponentExecute: async (interaction: MessageComponentInteraction | SelectMenuInteraction, args: string[], m: Messenger) => {

    }
}
