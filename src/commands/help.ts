import { CommandInteraction, DMChannel, GuildMember, MessageComponentInteraction, SelectMenuInteraction } from "discord.js";
import { Messenger } from "../messaging";
import { HelpStructure } from "../types/help.types";

export default {
    name: 'help',
    adminRequired: false,
    canRunInDMs: true,
    defer: true,
    commandExecute: async (interaction: CommandInteraction, m: Messenger) => {
        interaction.editReply({ embeds: [HelpStructure.getEmbed('user', 0)], components: HelpStructure.getComponents('user', 0) })
            .catch(err => console.error('Interaction editReply error in help.ts'));
    },
    messageComponentExecute: async (interaction: MessageComponentInteraction | SelectMenuInteraction, args: string[], m: Messenger) => {
        if (args.length === 1) args.push('0');
        if (!args[2]) args[2] = '';

        const options: [string, number, string] = [args[0], parseInt(args[1]), args[2]];

        const interactionValues = (interaction as SelectMenuInteraction).values;
        if (interactionValues) {
            const featureSelection = interactionValues[0].split('_');
            if (featureSelection[0] === 'otherType') {
                options[0] = featureSelection[1];
                options[1] = 0;
            } else {
                options[1] = parseInt(featureSelection[1]);
                options[2] = featureSelection[0];
            }
        }

        interaction.update({ embeds: [HelpStructure.getEmbed(...options)], components: HelpStructure.getComponents(...options) })
            .catch(err => console.error('Interaction update error in help.ts'));
    }
}
