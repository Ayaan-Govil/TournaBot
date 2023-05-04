import { createClient, QueryRequest } from './genql';
require('dotenv').config();

const client = createClient({
    url: process.env.STARTGG_API_URL,
    headers: {
        authorization: `Bearer ${process.env.STARTGG_TOKEN}`
    }
});

export namespace StartggAPI {
    export const getUser = async (slug: string) => {
        const request: QueryRequest = {
            user: [
                {
                    slug: slug
                },
                {
                    id: true,
                    player: {
                        id: true,
                        gamerTag: true
                    },
                    authorizations: [
                        {
                            types: ['TWITTER', 'TWITCH', 'XBOX', 'MIXER']
                        },
                        {
                            externalId: true,
                            externalUsername: true,
                            type: true
                        }
                    ]
                }
            ]
        }
        return await query(request);
    }

    export const getUserUpcomingTournaments = async (slug: string) => {
        const request: QueryRequest = {
            user: [
                {
                    slug: slug
                },
                {
                    tournaments: [
                        {
                            query: {
                                filter: {
                                    upcoming: true,
                                    past: false,
                                    tournamentView: 'competing'
                                }
                            }
                        },
                        {
                            nodes: {
                                slug: true,
                                name: true,
                                startAt: true,
                                registrationClosesAt: true,
                                isOnline: true,
                                state: true,
                                images: {
                                    height: true,
                                    width: true,
                                    url: true
                                },
                                events: {
                                    id: true,
                                    name: true,
                                    startAt: true,
                                    checkInEnabled: true,
                                    checkInBuffer: true,
                                    checkInDuration: true
                                },
                                streams: {
                                    id: true,
                                    isOnline: true,
                                    streamSource: true,
                                    streamGame: true,
                                    streamName: true
                                }
                            }
                        }
                    ]
                }
            ]
        }
        return await query(request);
    }
    export const getTournament = async (slug: string) => {
        const request: QueryRequest = {
            tournament: [
                {
                    slug: slug
                },
                {
                    slug: true,
                    name: true,
                    startAt: true,
                    registrationClosesAt: true,
                    isOnline: true,
                    state: true,
                    images: {
                        height: true,
                        width: true,
                        url: true
                    },
                    events: {
                        id: true,
                        name: true,
                        startAt: true,
                        checkInEnabled: true,
                        checkInBuffer: true,
                        checkInDuration: true
                    },
                    streams: {
                        id: true,
                        isOnline: true,
                        streamSource: true,
                        streamGame: true,
                        streamName: true
                    }
                }
            ]
        }
        return await query(request);
    }

    export const getMatchCallingSets = async (slug: string) => {
        const request: QueryRequest = {
            tournament: [
                {
                    slug: slug
                },
                {
                    startAt: true,
                    endAt: true,
                    events: {
                        name: true,
                        slug: true,
                        sets: [
                            {
                                sortType: 'RECENT',
                                filters: {
                                    state: [6]
                                }
                            },
                            {
                                nodes: {
                                    id: true,
                                    totalGames: true,
                                    fullRoundText: true,
                                    event: {
                                        slug: true,
                                        name: true
                                    },
                                    slots: {
                                        entrant: {
                                            id: true,
                                            name: true,
                                            initialSeedNum: true,
                                            participants: {
                                                user: {
                                                    slug: true,
                                                    authorizations: [
                                                        {
                                                            types: ['DISCORD']
                                                        },
                                                        {
                                                            externalId: true,
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        }
        return await query(request);
    }

    export const getMatchReportingSets = async (slug: string) => {
        const request: QueryRequest = {
            tournament: [
                {
                    slug: slug
                },
                {
                    startAt: true,
                    endAt: true,
                    events: {
                        name: true,
                        slug: true,
                        sets: [
                            {
                                sortType: 'CALL_ORDER',
                                filters: {
                                    state: [3]
                                }
                            },
                            {
                                nodes: {
                                    id: true,
                                    totalGames: true,
                                    fullRoundText: true,
                                    winnerId: true,
                                    event: {
                                        slug: true,
                                        name: true
                                    },
                                    games: {
                                        winnerId: true,
                                        selections: {
                                            selectionValue: true,
                                            entrant: {
                                                id: true
                                            }
                                        }
                                    },
                                    slots: {
                                        entrant: {
                                            id: true,
                                            name: true,
                                            initialSeedNum: true,
                                            participants: {
                                                user: {
                                                    slug: true,
                                                    authorizations: [
                                                        {
                                                            types: ['DISCORD']
                                                        },
                                                        {
                                                            externalId: true,
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        }
        return await query(request);
    }

    export const getSupportSets = async (tournamentSlug: string, playerId: string) => {
        const request: QueryRequest = {
            tournament: [
                {
                    slug: tournamentSlug
                },
                {
                    events: {
                        name: true,
                        slug: true,
                        sets: [
                            {
                                sortType: 'RECENT',
                                filters: {
                                    playerIds: [playerId]
                                }
                            },
                            {
                                nodes: {
                                    id: true,
                                    fullRoundText: true,
                                    slots: {
                                        entrant: {
                                            name: true,
                                            initialSeedNum: true,
                                            participants: {
                                                user: {
                                                    slug: true,
                                                    authorizations: [
                                                        {
                                                            types: ['DISCORD']
                                                        },
                                                        {
                                                            externalId: true,
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        }
        return await query(request);
    }

    export const getSupportSet = async (setId: number) => {
        const request: QueryRequest = {
            set: [
                {
                    id: setId.toString()
                },
                {
                    id: true,
                    event: {
                        slug: true,
                        name: true
                    },
                    fullRoundText: true,
                    slots: {
                        entrant: {
                            name: true,
                            initialSeedNum: true,
                            participants: {
                                user: {
                                    slug: true,
                                    authorizations: [
                                        {
                                            types: ['DISCORD']
                                        },
                                        {
                                            externalId: true,
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            ]
        }
        return await query(request);
    }

    const exampleQuery = async () => {
        const request: QueryRequest = {

        }
        return await query(request);
    }

    const query = async (request: QueryRequest) => {
        return await client.query(request)
            .catch(err => console.error('Start.gg API Query', err)) || null;
    }
}
