import { CommandInteraction, DMChannel, GuildMember, MessageComponentInteraction, SelectMenuInteraction } from "discord.js";
import { Accounts } from "../../database/models/accounts";
import { Messenger } from "../messaging";
import { GuildManager } from "../types/guild.types";

export default {
    name: 'reminders',
    adminRequired: false,
    canRunInDMs: true,
    defer: true,
    commandExecute: async (interaction: CommandInteraction, m: Messenger) => {
        if (interaction.inGuild()) {
            const guild = await GuildManager.get(interaction.guildId);
            m.setLocale(guild.locale);
        }

        const subCommandName = interaction.options.data[0].name;
        switch (subCommandName) {
            case 'toggle':
                const findResponse = await Accounts.findOne({ discordId: interaction.user.id });
                if (!findResponse) return m.editReply('**Your start.gg and Discord accounts must be linked to use this command.** You can use `/account link` to link your accounts.');

                const toggle = (interaction.options.get('toggle').value === 'true');
                const updateResponse = await Accounts.findOneAndUpdate({ discordId: interaction.user.id }, { remind: toggle }, { new: true });

                return m.editReply(`**Success!** Your automatic tournament reminders have been toggled \`${toggle ? 'on' : 'off'}\`!`);
        }
    },
    messageComponentExecute: async (interaction: MessageComponentInteraction | SelectMenuInteraction, args: string[], m: Messenger) => {

    }
}
