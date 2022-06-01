import { Client, Collection } from "discord.js";
import { Accounts } from "../../database/models/accounts";
import { StartggAPI } from "../startgg/api";
import { Tournament, User } from "../startgg/genql";

export class TournaBotClient extends Client {
    commands: Collection<string, Command>;

    async startReminderLoop() {
        const iterateNext = () => {
            count++;
            console.log(`Reminder loop iteration ${count}`);
            this.setReminders();
        }

        let count = 0;

        iterateNext();
        setInterval(iterateNext, 3600000);
    }

    private async setReminders() {
        const accounts = await Accounts.find({ remind: true });
        for (const account of accounts) {
            const data = await StartggAPI.getUserUpcomingTournaments(account.slug);
            if (!data) continue;
            const user = data.user as User;
            for (const tournament of user.tournaments.nodes) {
                const startAt = tournament.startAt * 1000;
                const difference = startAt - Date.now();
                if (difference <= 7200000 && difference >= 3600000) setTimeout(() => this.remind(account.discordId, tournament), difference - 3600000);
            }
        }
    }

    async remind(discordId: string, tournament: Tournament) {

    }
}

export interface Command {
    name: String;
    description: String;
    execute: Function;
    show: Boolean;
    commandExecute: Function;
    messageComponentExecute: Function;
    canRunInDMs: boolean;
    adminRequired: boolean;
    defer: boolean;
}
