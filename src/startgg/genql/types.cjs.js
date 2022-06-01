module.exports = {
    "scalars": [
        2,
        3,
        5,
        7,
        8,
        9,
        11,
        17,
        19,
        24,
        29,
        39,
        42,
        51,
        66,
        69,
        73,
        111,
        126,
        131,
        133,
        134
    ],
    "types": {
        "Query": {
            "currentUser": [
                1
            ],
            "entrant": [
                23,
                {
                    "id": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "event": [
                18,
                {
                    "id": [
                        2
                    ],
                    "slug": [
                        5
                    ]
                }
            ],
            "league": [
                80,
                {
                    "id": [
                        2
                    ],
                    "slug": [
                        5
                    ]
                }
            ],
            "participant": [
                35,
                {
                    "id": [
                        2,
                        "ID!"
                    ],
                    "isAdmin": [
                        7
                    ]
                }
            ],
            "phase": [
                47,
                {
                    "id": [
                        2
                    ]
                }
            ],
            "phaseGroup": [
                41,
                {
                    "id": [
                        2
                    ]
                }
            ],
            "player": [
                37,
                {
                    "id": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "seed": [
                46,
                {
                    "id": [
                        2
                    ]
                }
            ],
            "set": [
                31,
                {
                    "id": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "shop": [
                100,
                {
                    "id": [
                        2
                    ],
                    "slug": [
                        5
                    ]
                }
            ],
            "stream": [
                65,
                {
                    "id": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "streamQueue": [
                64,
                {
                    "tournamentId": [
                        2,
                        "ID!"
                    ],
                    "includePlayerStreams": [
                        7
                    ]
                }
            ],
            "team": [
                71,
                {
                    "id": [
                        2
                    ],
                    "slug": [
                        5
                    ],
                    "inviteCode": [
                        5
                    ]
                }
            ],
            "tournament": [
                56,
                {
                    "id": [
                        2
                    ],
                    "slug": [
                        5
                    ]
                }
            ],
            "tournaments": [
                99,
                {
                    "query": [
                        107,
                        "TournamentQuery!"
                    ]
                }
            ],
            "user": [
                1,
                {
                    "id": [
                        2
                    ],
                    "slug": [
                        5
                    ]
                }
            ],
            "videogame": [
                87,
                {
                    "id": [
                        2
                    ],
                    "slug": [
                        5
                    ]
                }
            ],
            "videogames": [
                114,
                {
                    "query": [
                        112,
                        "VideogameQuery!"
                    ]
                }
            ],
            "__typename": [
                5
            ]
        },
        "User": {
            "id": [
                2
            ],
            "authorizations": [
                4,
                {
                    "types": [
                        3,
                        "[SocialConnectionType]"
                    ]
                }
            ],
            "bio": [
                5
            ],
            "birthday": [
                5
            ],
            "discriminator": [
                5
            ],
            "events": [
                15,
                {
                    "query": [
                        10
                    ]
                }
            ],
            "genderPronoun": [
                5
            ],
            "images": [
                33,
                {
                    "type": [
                        5
                    ]
                }
            ],
            "leagues": [
                95,
                {
                    "query": [
                        93
                    ]
                }
            ],
            "location": [
                96
            ],
            "name": [
                5
            ],
            "player": [
                37
            ],
            "slug": [
                5
            ],
            "tournaments": [
                99,
                {
                    "query": [
                        97
                    ]
                }
            ],
            "__typename": [
                5
            ]
        },
        "ID": {},
        "SocialConnectionType": {},
        "ProfileAuthorization": {
            "id": [
                2
            ],
            "externalId": [
                5
            ],
            "externalUsername": [
                5
            ],
            "stream": [
                6
            ],
            "type": [
                9
            ],
            "url": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "String": {},
        "Stream": {
            "id": [
                2
            ],
            "isOnline": [
                7
            ],
            "name": [
                5
            ],
            "type": [
                8
            ],
            "__typename": [
                5
            ]
        },
        "Boolean": {},
        "StreamType": {},
        "AuthorizationType": {},
        "UserEventsPaginationQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "filter": [
                12
            ],
            "__typename": [
                5
            ]
        },
        "Int": {},
        "UserEventsPaginationFilter": {
            "videogameId": [
                2
            ],
            "eventType": [
                11
            ],
            "minEntrantCount": [
                11
            ],
            "maxEntrantCount": [
                11
            ],
            "location": [
                13
            ],
            "search": [
                14
            ],
            "__typename": [
                5
            ]
        },
        "LocationFilterType": {
            "countryCode": [
                5
            ],
            "state": [
                5
            ],
            "city": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "PaginationSearchType": {
            "fieldsToSearch": [
                5
            ],
            "searchString": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "EventConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                18
            ],
            "__typename": [
                5
            ]
        },
        "PageInfo": {
            "total": [
                11
            ],
            "totalPages": [
                11
            ],
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "filter": [
                17
            ],
            "__typename": [
                5
            ]
        },
        "JSON": {},
        "Event": {
            "id": [
                2
            ],
            "checkInBuffer": [
                11
            ],
            "checkInDuration": [
                11
            ],
            "checkInEnabled": [
                7
            ],
            "competitionTier": [
                11
            ],
            "createdAt": [
                19
            ],
            "deckSubmissionDeadline": [
                19
            ],
            "entrantSizeMax": [
                11
            ],
            "entrantSizeMin": [
                11
            ],
            "entrants": [
                22,
                {
                    "query": [
                        20
                    ]
                }
            ],
            "hasDecks": [
                7
            ],
            "hasTasks": [
                7
            ],
            "images": [
                33,
                {
                    "type": [
                        5
                    ]
                }
            ],
            "isOnline": [
                7
            ],
            "league": [
                80
            ],
            "matchRulesMarkdown": [
                5
            ],
            "name": [
                5
            ],
            "numEntrants": [
                11
            ],
            "phaseGroups": [
                41
            ],
            "phases": [
                47,
                {
                    "state": [
                        51
                    ],
                    "phaseId": [
                        2
                    ]
                }
            ],
            "prizingInfo": [
                17
            ],
            "publishing": [
                17
            ],
            "rulesMarkdown": [
                5
            ],
            "rulesetId": [
                11
            ],
            "rulesetSettings": [
                17
            ],
            "sets": [
                30,
                {
                    "page": [
                        11
                    ],
                    "perPage": [
                        11
                    ],
                    "sortType": [
                        24
                    ],
                    "filters": [
                        25
                    ]
                }
            ],
            "slug": [
                5
            ],
            "standings": [
                78,
                {
                    "query": [
                        89,
                        "StandingPaginationQuery!"
                    ]
                }
            ],
            "startAt": [
                19
            ],
            "state": [
                51
            ],
            "stations": [
                62,
                {
                    "query": [
                        91
                    ]
                }
            ],
            "teamManagementDeadline": [
                19
            ],
            "teamNameAllowed": [
                7
            ],
            "teamRosterSize": [
                92
            ],
            "tournament": [
                56
            ],
            "type": [
                11
            ],
            "updatedAt": [
                19
            ],
            "useEventSeeds": [
                7
            ],
            "videogame": [
                87
            ],
            "waves": [
                52,
                {
                    "phaseId": [
                        2
                    ]
                }
            ],
            "__typename": [
                5
            ]
        },
        "Timestamp": {},
        "EventEntrantPageQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "filter": [
                21
            ],
            "__typename": [
                5
            ]
        },
        "EventEntrantPageQueryFilter": {
            "name": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "EntrantConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                23
            ],
            "__typename": [
                5
            ]
        },
        "Entrant": {
            "id": [
                2
            ],
            "event": [
                18
            ],
            "initialSeedNum": [
                11
            ],
            "isDisqualified": [
                7
            ],
            "name": [
                5
            ],
            "paginatedSets": [
                30,
                {
                    "page": [
                        11
                    ],
                    "perPage": [
                        11
                    ],
                    "sortType": [
                        24
                    ],
                    "filters": [
                        25
                    ]
                }
            ],
            "participants": [
                35
            ],
            "seeds": [
                46
            ],
            "skill": [
                11
            ],
            "standing": [
                54
            ],
            "stream": [
                65
            ],
            "streams": [
                65
            ],
            "team": [
                71
            ],
            "__typename": [
                5
            ]
        },
        "SetSortType": {},
        "SetFilters": {
            "entrantIds": [
                2
            ],
            "entrantSize": [
                11
            ],
            "hasVod": [
                7
            ],
            "hideEmpty": [
                7
            ],
            "showByes": [
                7
            ],
            "isEventOnline": [
                7
            ],
            "location": [
                26
            ],
            "participantIds": [
                2
            ],
            "phaseGroupIds": [
                2
            ],
            "phaseIds": [
                2
            ],
            "eventIds": [
                2
            ],
            "tournamentIds": [
                2
            ],
            "playerIds": [
                2
            ],
            "roundNumber": [
                11
            ],
            "state": [
                11
            ],
            "stationIds": [
                2
            ],
            "stationNumbers": [
                11
            ],
            "updatedAfter": [
                19
            ],
            "__typename": [
                5
            ]
        },
        "SetFilterLocation": {
            "state": [
                5
            ],
            "country": [
                5
            ],
            "distanceFrom": [
                27
            ],
            "__typename": [
                5
            ]
        },
        "SetFilterLocationDistanceFrom": {
            "point": [
                28
            ],
            "radius": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "SetFilterLocationDistanceFromPoint": {
            "lat": [
                29
            ],
            "lon": [
                29
            ],
            "__typename": [
                5
            ]
        },
        "Float": {},
        "SetConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                31
            ],
            "__typename": [
                5
            ]
        },
        "Set": {
            "id": [
                2
            ],
            "completedAt": [
                19
            ],
            "createdAt": [
                19
            ],
            "displayScore": [
                5,
                {
                    "mainEntrantId": [
                        2
                    ]
                }
            ],
            "event": [
                18
            ],
            "fullRoundText": [
                5
            ],
            "game": [
                32,
                {
                    "orderNum": [
                        11,
                        "Int!"
                    ]
                }
            ],
            "games": [
                32
            ],
            "hasPlaceholder": [
                7
            ],
            "identifier": [
                5
            ],
            "images": [
                33,
                {
                    "type": [
                        5
                    ]
                }
            ],
            "lPlacement": [
                11
            ],
            "phaseGroup": [
                41
            ],
            "round": [
                11
            ],
            "setGamesType": [
                11
            ],
            "slots": [
                79,
                {
                    "includeByes": [
                        7
                    ]
                }
            ],
            "startAt": [
                19
            ],
            "startedAt": [
                19
            ],
            "state": [
                11
            ],
            "station": [
                63
            ],
            "stream": [
                65
            ],
            "totalGames": [
                11
            ],
            "vodUrl": [
                5
            ],
            "wPlacement": [
                11
            ],
            "winnerId": [
                11
            ],
            "__typename": [
                5
            ]
        },
        "Game": {
            "id": [
                2
            ],
            "images": [
                33,
                {
                    "type": [
                        5
                    ]
                }
            ],
            "orderNum": [
                11
            ],
            "selections": [
                34
            ],
            "stage": [
                40
            ],
            "state": [
                11
            ],
            "winnerId": [
                11
            ],
            "__typename": [
                5
            ]
        },
        "Image": {
            "id": [
                2
            ],
            "height": [
                29
            ],
            "ratio": [
                29
            ],
            "type": [
                5
            ],
            "url": [
                5
            ],
            "width": [
                29
            ],
            "__typename": [
                5
            ]
        },
        "GameSelection": {
            "id": [
                2
            ],
            "entrant": [
                23
            ],
            "orderNum": [
                11
            ],
            "participant": [
                35
            ],
            "selectionType": [
                39
            ],
            "selectionValue": [
                11
            ],
            "__typename": [
                5
            ]
        },
        "Participant": {
            "id": [
                2
            ],
            "checkedIn": [
                7
            ],
            "checkedInAt": [
                19
            ],
            "connectedAccounts": [
                17
            ],
            "contactInfo": [
                36
            ],
            "email": [
                5
            ],
            "entrants": [
                23
            ],
            "events": [
                18
            ],
            "gamerTag": [
                5
            ],
            "images": [
                33,
                {
                    "type": [
                        5
                    ]
                }
            ],
            "player": [
                37
            ],
            "prefix": [
                5
            ],
            "requiredConnections": [
                4
            ],
            "user": [
                1
            ],
            "verified": [
                7
            ],
            "__typename": [
                5
            ]
        },
        "ContactInfo": {
            "id": [
                2
            ],
            "city": [
                5
            ],
            "country": [
                5
            ],
            "countryId": [
                11
            ],
            "name": [
                5
            ],
            "nameFirst": [
                5
            ],
            "nameLast": [
                5
            ],
            "state": [
                5
            ],
            "stateId": [
                11
            ],
            "zipcode": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "Player": {
            "id": [
                2
            ],
            "gamerTag": [
                5
            ],
            "prefix": [
                5
            ],
            "rankings": [
                38,
                {
                    "limit": [
                        11
                    ],
                    "videogameId": [
                        2
                    ]
                }
            ],
            "recentSets": [
                31,
                {
                    "opponentId": [
                        2
                    ]
                }
            ],
            "sets": [
                30,
                {
                    "page": [
                        11
                    ],
                    "perPage": [
                        11
                    ],
                    "filters": [
                        25
                    ]
                }
            ],
            "user": [
                1
            ],
            "__typename": [
                5
            ]
        },
        "PlayerRank": {
            "id": [
                2
            ],
            "rank": [
                11
            ],
            "title": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "GameSelectionType": {},
        "Stage": {
            "id": [
                2
            ],
            "name": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "PhaseGroup": {
            "id": [
                2
            ],
            "bracketType": [
                42
            ],
            "displayIdentifier": [
                5
            ],
            "firstRoundTime": [
                19
            ],
            "numRounds": [
                11
            ],
            "paginatedSeeds": [
                45,
                {
                    "query": [
                        43,
                        "SeedPaginationQuery!"
                    ],
                    "eventId": [
                        2
                    ]
                }
            ],
            "paginatedSets": [
                30,
                {
                    "page": [
                        11
                    ],
                    "perPage": [
                        11
                    ],
                    "sortType": [
                        24
                    ],
                    "filters": [
                        25
                    ]
                }
            ],
            "phase": [
                47
            ],
            "progressionsOut": [
                53
            ],
            "rounds": [
                76
            ],
            "seedMap": [
                17
            ],
            "seeds": [
                45,
                {
                    "query": [
                        43,
                        "SeedPaginationQuery!"
                    ],
                    "eventId": [
                        2
                    ]
                }
            ],
            "sets": [
                30,
                {
                    "page": [
                        11
                    ],
                    "perPage": [
                        11
                    ],
                    "sortType": [
                        24
                    ],
                    "filters": [
                        25
                    ]
                }
            ],
            "standings": [
                78,
                {
                    "query": [
                        77
                    ]
                }
            ],
            "startAt": [
                19
            ],
            "state": [
                11
            ],
            "tiebreakOrder": [
                17
            ],
            "wave": [
                52
            ],
            "__typename": [
                5
            ]
        },
        "BracketType": {},
        "SeedPaginationQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "filter": [
                44
            ],
            "__typename": [
                5
            ]
        },
        "SeedPageFilter": {
            "id": [
                2
            ],
            "entrantName": [
                5
            ],
            "checkInState": [
                11
            ],
            "phaseGroupId": [
                2
            ],
            "eventCheckInGroupId": [
                2
            ],
            "phaseId": [
                2
            ],
            "eventId": [
                2
            ],
            "search": [
                14
            ],
            "__typename": [
                5
            ]
        },
        "SeedConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                46
            ],
            "__typename": [
                5
            ]
        },
        "Seed": {
            "id": [
                2
            ],
            "checkedInParticipants": [
                17
            ],
            "entrant": [
                23
            ],
            "groupSeedNum": [
                11
            ],
            "isBye": [
                7
            ],
            "phase": [
                47
            ],
            "phaseGroup": [
                41
            ],
            "placeholderName": [
                5
            ],
            "placement": [
                11
            ],
            "players": [
                37
            ],
            "progressionSeedId": [
                11
            ],
            "progressionSource": [
                53
            ],
            "seedNum": [
                11
            ],
            "setRecordWithoutByes": [
                17,
                {
                    "phaseGroupId": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "standings": [
                54,
                {
                    "containerType": [
                        5
                    ]
                }
            ],
            "__typename": [
                5
            ]
        },
        "Phase": {
            "id": [
                2
            ],
            "bracketType": [
                42
            ],
            "event": [
                18
            ],
            "groupCount": [
                11
            ],
            "isExhibition": [
                7
            ],
            "name": [
                5
            ],
            "numSeeds": [
                11
            ],
            "paginatedSeeds": [
                45,
                {
                    "query": [
                        43,
                        "SeedPaginationQuery!"
                    ],
                    "eventId": [
                        2
                    ]
                }
            ],
            "phaseGroups": [
                50,
                {
                    "query": [
                        48
                    ]
                }
            ],
            "phaseOrder": [
                11
            ],
            "seeds": [
                45,
                {
                    "query": [
                        43,
                        "SeedPaginationQuery!"
                    ],
                    "eventId": [
                        2
                    ]
                }
            ],
            "sets": [
                30,
                {
                    "page": [
                        11
                    ],
                    "perPage": [
                        11
                    ],
                    "sortType": [
                        24
                    ],
                    "filters": [
                        25
                    ]
                }
            ],
            "state": [
                51
            ],
            "waves": [
                52
            ],
            "__typename": [
                5
            ]
        },
        "PhaseGroupPageQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "entrantIds": [
                2
            ],
            "filter": [
                49
            ],
            "__typename": [
                5
            ]
        },
        "PhaseGroupPageQueryFilter": {
            "id": [
                2
            ],
            "waveId": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "PhaseGroupConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                41
            ],
            "__typename": [
                5
            ]
        },
        "ActivityState": {},
        "Wave": {
            "id": [
                2
            ],
            "identifier": [
                5
            ],
            "startAt": [
                19
            ],
            "__typename": [
                5
            ]
        },
        "Progression": {
            "id": [
                2
            ],
            "originOrder": [
                11
            ],
            "originPhase": [
                47
            ],
            "originPhaseGroup": [
                41
            ],
            "originPlacement": [
                11
            ],
            "__typename": [
                5
            ]
        },
        "Standing": {
            "id": [
                2
            ],
            "container": [
                55
            ],
            "entrant": [
                23
            ],
            "isFinal": [
                7
            ],
            "metadata": [
                17
            ],
            "placement": [
                11
            ],
            "player": [
                37
            ],
            "standing": [
                11
            ],
            "stats": [
                74
            ],
            "totalPoints": [
                29
            ],
            "__typename": [
                5
            ]
        },
        "StandingContainer": {
            "on_Tournament": [
                56
            ],
            "on_Event": [
                18
            ],
            "on_PhaseGroup": [
                41
            ],
            "on_Set": [
                31
            ],
            "__typename": [
                5
            ]
        },
        "Tournament": {
            "id": [
                2
            ],
            "addrState": [
                5
            ],
            "admins": [
                1,
                {
                    "roles": [
                        5,
                        "[String]"
                    ]
                }
            ],
            "city": [
                5
            ],
            "countryCode": [
                5
            ],
            "createdAt": [
                19
            ],
            "currency": [
                5
            ],
            "endAt": [
                19
            ],
            "eventRegistrationClosesAt": [
                19
            ],
            "events": [
                18,
                {
                    "limit": [
                        11
                    ],
                    "filter": [
                        57
                    ]
                }
            ],
            "hasOfflineEvents": [
                7
            ],
            "hasOnlineEvents": [
                7
            ],
            "hashtag": [
                5
            ],
            "images": [
                33,
                {
                    "type": [
                        5
                    ]
                }
            ],
            "isOnline": [
                7
            ],
            "isRegistrationOpen": [
                7
            ],
            "lat": [
                29
            ],
            "links": [
                58
            ],
            "lng": [
                29
            ],
            "mapsPlaceId": [
                5
            ],
            "name": [
                5
            ],
            "numAttendees": [
                11
            ],
            "owner": [
                1
            ],
            "participants": [
                61,
                {
                    "query": [
                        59,
                        "ParticipantPaginationQuery!"
                    ],
                    "isAdmin": [
                        7
                    ]
                }
            ],
            "postalCode": [
                5
            ],
            "primaryContact": [
                5
            ],
            "primaryContactType": [
                5
            ],
            "publishing": [
                17
            ],
            "registrationClosesAt": [
                19
            ],
            "rules": [
                5
            ],
            "shortSlug": [
                5
            ],
            "slug": [
                5
            ],
            "startAt": [
                19
            ],
            "state": [
                11
            ],
            "stations": [
                62,
                {
                    "page": [
                        11
                    ],
                    "perPage": [
                        11
                    ]
                }
            ],
            "streamQueue": [
                64
            ],
            "streams": [
                65
            ],
            "teamCreationClosesAt": [
                19
            ],
            "teams": [
                70,
                {
                    "query": [
                        67,
                        "TeamPaginationQuery!"
                    ]
                }
            ],
            "timezone": [
                5
            ],
            "tournamentType": [
                11
            ],
            "updatedAt": [
                19
            ],
            "url": [
                5,
                {
                    "tab": [
                        5
                    ],
                    "relative": [
                        7
                    ]
                }
            ],
            "venueAddress": [
                5
            ],
            "venueName": [
                5
            ],
            "waves": [
                52
            ],
            "__typename": [
                5
            ]
        },
        "EventFilter": {
            "videogameId": [
                2
            ],
            "type": [
                11
            ],
            "published": [
                7
            ],
            "__typename": [
                5
            ]
        },
        "TournamentLinks": {
            "facebook": [
                5
            ],
            "discord": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "ParticipantPaginationQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "filter": [
                60
            ],
            "__typename": [
                5
            ]
        },
        "ParticipantPageFilter": {
            "id": [
                2
            ],
            "ids": [
                2
            ],
            "eventIds": [
                2
            ],
            "search": [
                14
            ],
            "gamerTag": [
                5
            ],
            "unpaid": [
                7
            ],
            "incompleteTeam": [
                7
            ],
            "missingDeck": [
                7
            ],
            "checkedIn": [
                7
            ],
            "notCheckedIn": [
                7
            ],
            "__typename": [
                5
            ]
        },
        "ParticipantConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                35
            ],
            "__typename": [
                5
            ]
        },
        "StationsConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                63
            ],
            "__typename": [
                5
            ]
        },
        "Stations": {
            "id": [
                2
            ],
            "canAutoAssign": [
                7
            ],
            "clusterNumber": [
                5
            ],
            "clusterPrefix": [
                11
            ],
            "enabled": [
                7
            ],
            "identifier": [
                11
            ],
            "numSetups": [
                11
            ],
            "number": [
                11
            ],
            "prefix": [
                5
            ],
            "queue": [
                17
            ],
            "queueDepth": [
                11
            ],
            "state": [
                11
            ],
            "updatedAt": [
                19
            ],
            "__typename": [
                5
            ]
        },
        "StreamQueue": {
            "id": [
                5
            ],
            "sets": [
                31
            ],
            "stream": [
                65
            ],
            "__typename": [
                5
            ]
        },
        "Streams": {
            "id": [
                2
            ],
            "enabled": [
                7
            ],
            "followerCount": [
                11
            ],
            "isOnline": [
                7
            ],
            "numSetups": [
                11
            ],
            "parentStreamId": [
                11
            ],
            "streamGame": [
                5
            ],
            "streamId": [
                5
            ],
            "streamLogo": [
                5
            ],
            "streamName": [
                5
            ],
            "streamSource": [
                66
            ],
            "streamStatus": [
                5
            ],
            "streamType": [
                11
            ],
            "streamTypeId": [
                11
            ],
            "__typename": [
                5
            ]
        },
        "StreamSource": {},
        "TeamPaginationQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "filter": [
                68
            ],
            "__typename": [
                5
            ]
        },
        "TeamPaginationFilter": {
            "globalTeamId": [
                2
            ],
            "eventState": [
                51
            ],
            "eventId": [
                2
            ],
            "eventIds": [
                2
            ],
            "minEntrantCount": [
                11
            ],
            "maxEntrantCount": [
                11
            ],
            "search": [
                14
            ],
            "type": [
                11
            ],
            "tournamentId": [
                2
            ],
            "memberStatus": [
                69
            ],
            "videogameId": [
                2
            ],
            "isLeague": [
                7
            ],
            "upcoming": [
                7
            ],
            "past": [
                7
            ],
            "rosterComplete": [
                7
            ],
            "rosterIncomplete": [
                7
            ],
            "__typename": [
                5
            ]
        },
        "TeamMemberStatus": {},
        "TeamConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                71
            ],
            "__typename": [
                5
            ]
        },
        "Team": {
            "id": [
                2
            ],
            "discriminator": [
                5
            ],
            "entrant": [
                23
            ],
            "event": [
                18
            ],
            "images": [
                33,
                {
                    "type": [
                        5
                    ]
                }
            ],
            "members": [
                72,
                {
                    "status": [
                        69,
                        "[TeamMemberStatus]"
                    ]
                }
            ],
            "name": [
                5
            ],
            "on_EventTeam": [
                127
            ],
            "on_GlobalTeam": [
                128
            ],
            "__typename": [
                5
            ]
        },
        "TeamMember": {
            "id": [
                2
            ],
            "isAlternate": [
                7
            ],
            "isCaptain": [
                7
            ],
            "memberType": [
                73
            ],
            "participant": [
                35
            ],
            "player": [
                37
            ],
            "status": [
                69
            ],
            "__typename": [
                5
            ]
        },
        "TeamMemberType": {},
        "StandingStats": {
            "score": [
                75
            ],
            "__typename": [
                5
            ]
        },
        "Score": {
            "label": [
                5
            ],
            "value": [
                29
            ],
            "displayValue": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "Round": {
            "id": [
                2
            ],
            "bestOf": [
                11
            ],
            "number": [
                11
            ],
            "startAt": [
                19
            ],
            "__typename": [
                5
            ]
        },
        "StandingGroupStandingPageFilter": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "StandingConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                54
            ],
            "__typename": [
                5
            ]
        },
        "SetSlot": {
            "id": [
                2
            ],
            "entrant": [
                23
            ],
            "prereqId": [
                5
            ],
            "prereqPlacement": [
                11
            ],
            "prereqType": [
                5
            ],
            "seed": [
                46
            ],
            "slotIndex": [
                11
            ],
            "standing": [
                54
            ],
            "__typename": [
                5
            ]
        },
        "League": {
            "id": [
                2
            ],
            "addrState": [
                5
            ],
            "city": [
                5
            ],
            "countryCode": [
                5
            ],
            "createdAt": [
                19
            ],
            "currency": [
                5
            ],
            "endAt": [
                19
            ],
            "entrantCount": [
                11
            ],
            "eventOwners": [
                82,
                {
                    "query": [
                        81
                    ]
                }
            ],
            "eventRegistrationClosesAt": [
                19
            ],
            "events": [
                15,
                {
                    "query": [
                        84
                    ]
                }
            ],
            "finalEventId": [
                11
            ],
            "hasOfflineEvents": [
                7
            ],
            "hasOnlineEvents": [
                7
            ],
            "hashtag": [
                5
            ],
            "images": [
                33,
                {
                    "type": [
                        5
                    ]
                }
            ],
            "isOnline": [
                7
            ],
            "lat": [
                29
            ],
            "links": [
                58
            ],
            "lng": [
                29
            ],
            "mapsPlaceId": [
                5
            ],
            "name": [
                5
            ],
            "numProgressingToFinalEvent": [
                11
            ],
            "numUniquePlayers": [
                11
            ],
            "postalCode": [
                5
            ],
            "primaryContact": [
                5
            ],
            "primaryContactType": [
                5
            ],
            "publishing": [
                17
            ],
            "registrationClosesAt": [
                19
            ],
            "rules": [
                5
            ],
            "shortSlug": [
                5
            ],
            "showStandings": [
                7
            ],
            "slug": [
                5
            ],
            "standings": [
                78,
                {
                    "query": [
                        77
                    ]
                }
            ],
            "startAt": [
                19
            ],
            "state": [
                11
            ],
            "teamCreationClosesAt": [
                19
            ],
            "tiers": [
                86
            ],
            "timezone": [
                5
            ],
            "tournamentType": [
                11
            ],
            "updatedAt": [
                19
            ],
            "url": [
                5,
                {
                    "tab": [
                        5
                    ],
                    "relative": [
                        7
                    ]
                }
            ],
            "venueAddress": [
                5
            ],
            "venueName": [
                5
            ],
            "videogames": [
                87
            ],
            "__typename": [
                5
            ]
        },
        "EventOwnersQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "EventOwnerConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                83
            ],
            "__typename": [
                5
            ]
        },
        "EventOwner": {
            "eventId": [
                2
            ],
            "email": [
                5
            ],
            "gamerTag": [
                5
            ],
            "fullName": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "LeagueEventsQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "filter": [
                85
            ],
            "__typename": [
                5
            ]
        },
        "LeagueEventsFilter": {
            "search": [
                14
            ],
            "pointMappingGroupIds": [
                2
            ],
            "tierIds": [
                2
            ],
            "userId": [
                2
            ],
            "upcoming": [
                7
            ],
            "leagueEntrantId": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "EventTier": {
            "id": [
                2
            ],
            "name": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "Videogame": {
            "id": [
                2
            ],
            "characters": [
                88
            ],
            "displayName": [
                5
            ],
            "images": [
                33,
                {
                    "type": [
                        5
                    ]
                }
            ],
            "name": [
                5
            ],
            "slug": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "Character": {
            "id": [
                2
            ],
            "images": [
                33,
                {
                    "type": [
                        5
                    ]
                }
            ],
            "name": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "StandingPaginationQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "filter": [
                90
            ],
            "__typename": [
                5
            ]
        },
        "StandingPageFilter": {
            "id": [
                2
            ],
            "ids": [
                2
            ],
            "search": [
                14
            ],
            "__typename": [
                5
            ]
        },
        "StationFilter": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "__typename": [
                5
            ]
        },
        "TeamRosterSize": {
            "maxAlternates": [
                11
            ],
            "maxPlayers": [
                11
            ],
            "minAlternates": [
                11
            ],
            "minPlayers": [
                11
            ],
            "__typename": [
                5
            ]
        },
        "UserLeaguesPaginationQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "filter": [
                94
            ],
            "__typename": [
                5
            ]
        },
        "UserLeaguesPaginationFilter": {
            "videogameId": [
                2
            ],
            "upcoming": [
                7
            ],
            "past": [
                7
            ],
            "search": [
                14
            ],
            "__typename": [
                5
            ]
        },
        "LeagueConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                80
            ],
            "__typename": [
                5
            ]
        },
        "Address": {
            "id": [
                2
            ],
            "city": [
                5
            ],
            "country": [
                5
            ],
            "countryId": [
                11
            ],
            "state": [
                5
            ],
            "stateId": [
                11
            ],
            "__typename": [
                5
            ]
        },
        "UserTournamentsPaginationQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "filter": [
                98
            ],
            "__typename": [
                5
            ]
        },
        "UserTournamentsPaginationFilter": {
            "past": [
                7
            ],
            "upcoming": [
                7
            ],
            "search": [
                14
            ],
            "videogameId": [
                2
            ],
            "tournamentView": [
                5
            ],
            "excludeId": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "TournamentConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                56
            ],
            "__typename": [
                5
            ]
        },
        "Shop": {
            "id": [
                2
            ],
            "levels": [
                102,
                {
                    "query": [
                        101
                    ]
                }
            ],
            "messages": [
                105,
                {
                    "query": [
                        104
                    ]
                }
            ],
            "name": [
                5
            ],
            "slug": [
                5
            ],
            "url": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "ShopLevelsQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "ShopLevelConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                103
            ],
            "__typename": [
                5
            ]
        },
        "ShopLevel": {
            "id": [
                2
            ],
            "currAmount": [
                29
            ],
            "description": [
                5
            ],
            "goalAmount": [
                29
            ],
            "images": [
                33,
                {
                    "type": [
                        5
                    ]
                }
            ],
            "name": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "ShopOrderMessagesQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "ShopOrderMessageConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                106
            ],
            "__typename": [
                5
            ]
        },
        "ShopOrderMessage": {
            "id": [
                2
            ],
            "gamertag": [
                5
            ],
            "message": [
                5
            ],
            "name": [
                5
            ],
            "player": [
                37
            ],
            "total": [
                29
            ],
            "__typename": [
                5
            ]
        },
        "TournamentQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "filter": [
                108
            ],
            "sort": [
                111
            ],
            "__typename": [
                5
            ]
        },
        "TournamentPageFilter": {
            "id": [
                2
            ],
            "ids": [
                2
            ],
            "ownerId": [
                2
            ],
            "isCurrentUserAdmin": [
                7
            ],
            "countryCode": [
                5
            ],
            "addrState": [
                5
            ],
            "location": [
                109
            ],
            "afterDate": [
                19
            ],
            "beforeDate": [
                19
            ],
            "computedUpdatedAt": [
                19
            ],
            "name": [
                5
            ],
            "venueName": [
                5
            ],
            "isFeatured": [
                7
            ],
            "isLeague": [
                7
            ],
            "hasBannerImages": [
                7
            ],
            "activeShops": [
                7
            ],
            "regOpen": [
                7
            ],
            "past": [
                7
            ],
            "published": [
                7
            ],
            "publiclySearchable": [
                7
            ],
            "staffPicks": [
                7
            ],
            "hasOnlineEvents": [
                7
            ],
            "topGames": [
                110
            ],
            "upcoming": [
                7
            ],
            "videogameIds": [
                2
            ],
            "sortByScore": [
                7
            ],
            "__typename": [
                5
            ]
        },
        "TournamentLocationFilter": {
            "distanceFrom": [
                5
            ],
            "distance": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "TopGameFilter": {
            "gameNums": [
                11
            ],
            "__typename": [
                5
            ]
        },
        "TournamentPaginationSort": {},
        "VideogameQuery": {
            "page": [
                11
            ],
            "perPage": [
                11
            ],
            "sortBy": [
                5
            ],
            "filter": [
                113
            ],
            "__typename": [
                5
            ]
        },
        "VideogamePageFilter": {
            "id": [
                2
            ],
            "name": [
                5
            ],
            "forUser": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "VideogameConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                87
            ],
            "__typename": [
                5
            ]
        },
        "Mutation": {
            "deletePhase": [
                7,
                {
                    "phaseId": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "deleteStation": [
                7,
                {
                    "stationId": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "deleteWave": [
                7,
                {
                    "waveId": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "resolveScheduleConflicts": [
                46,
                {
                    "tournamentId": [
                        2,
                        "ID!"
                    ],
                    "options": [
                        116
                    ]
                }
            ],
            "swapSeeds": [
                46,
                {
                    "phaseId": [
                        2,
                        "ID!"
                    ],
                    "seed1Id": [
                        2,
                        "ID!"
                    ],
                    "seed2Id": [
                        2,
                        "ID!"
                    ]
                }
            ],
            "updatePhaseGroups": [
                41,
                {
                    "groupConfigs": [
                        118,
                        "[PhaseGroupUpdateInput]!"
                    ]
                }
            ],
            "updatePhaseSeeding": [
                47,
                {
                    "phaseId": [
                        2,
                        "ID!"
                    ],
                    "seedMapping": [
                        119,
                        "[UpdatePhaseSeedInfo]!"
                    ],
                    "options": [
                        120
                    ]
                }
            ],
            "upsertPhase": [
                47,
                {
                    "phaseId": [
                        2
                    ],
                    "eventId": [
                        2
                    ],
                    "payload": [
                        121,
                        "PhaseUpsertInput!"
                    ]
                }
            ],
            "upsertStation": [
                63,
                {
                    "stationId": [
                        2
                    ],
                    "tournamentId": [
                        2
                    ],
                    "fields": [
                        122,
                        "StationUpsertInput!"
                    ]
                }
            ],
            "upsertWave": [
                52,
                {
                    "waveId": [
                        2
                    ],
                    "tournamentId": [
                        2
                    ],
                    "fields": [
                        123,
                        "WaveUpsertInput!"
                    ]
                }
            ],
            "__typename": [
                5
            ]
        },
        "ResolveConflictsOptions": {
            "lockedSeeds": [
                117
            ],
            "__typename": [
                5
            ]
        },
        "ResolveConflictsLockedSeedConfig": {
            "eventId": [
                2
            ],
            "numSeeds": [
                11
            ],
            "__typename": [
                5
            ]
        },
        "PhaseGroupUpdateInput": {
            "phaseGroupId": [
                2
            ],
            "stationId": [
                2
            ],
            "waveId": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "UpdatePhaseSeedInfo": {
            "seedId": [
                2
            ],
            "seedNum": [
                2
            ],
            "phaseGroupId": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "UpdatePhaseSeedingOptions": {
            "strictMode": [
                7
            ],
            "__typename": [
                5
            ]
        },
        "PhaseUpsertInput": {
            "name": [
                5
            ],
            "groupCount": [
                11
            ],
            "bracketType": [
                42
            ],
            "__typename": [
                5
            ]
        },
        "StationUpsertInput": {
            "number": [
                11
            ],
            "clusterId": [
                2
            ],
            "__typename": [
                5
            ]
        },
        "WaveUpsertInput": {
            "identifier": [
                5
            ],
            "startAt": [
                19
            ],
            "endAt": [
                19
            ],
            "__typename": [
                5
            ]
        },
        "ActionSet": {
            "id": [
                2
            ],
            "on_TeamActionSet": [
                136
            ],
            "__typename": [
                5
            ]
        },
        "BracketConfig": {
            "id": [
                2
            ],
            "bracketType": [
                42
            ],
            "on_RaceBracketConfig": [
                132
            ],
            "__typename": [
                5
            ]
        },
        "Comparator": {},
        "EventTeam": {
            "id": [
                2
            ],
            "discriminator": [
                5
            ],
            "entrant": [
                23
            ],
            "event": [
                18
            ],
            "globalTeam": [
                128
            ],
            "images": [
                33,
                {
                    "type": [
                        5
                    ]
                }
            ],
            "members": [
                72,
                {
                    "status": [
                        69,
                        "[TeamMemberStatus]"
                    ]
                }
            ],
            "name": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "GlobalTeam": {
            "id": [
                2
            ],
            "discriminator": [
                5
            ],
            "entrant": [
                23
            ],
            "event": [
                18
            ],
            "eventTeams": [
                129,
                {
                    "query": [
                        67
                    ]
                }
            ],
            "images": [
                33,
                {
                    "type": [
                        5
                    ]
                }
            ],
            "leagueTeams": [
                129,
                {
                    "query": [
                        67
                    ]
                }
            ],
            "members": [
                72,
                {
                    "status": [
                        69,
                        "[TeamMemberStatus]"
                    ]
                }
            ],
            "name": [
                5
            ],
            "__typename": [
                5
            ]
        },
        "EventTeamConnection": {
            "pageInfo": [
                16
            ],
            "nodes": [
                127
            ],
            "__typename": [
                5
            ]
        },
        "MatchConfig": {
            "id": [
                2
            ],
            "bracketType": [
                42
            ],
            "on_RaceMatchConfig": [
                135
            ],
            "__typename": [
                5
            ]
        },
        "MatchConfigVerificationMethod": {},
        "RaceBracketConfig": {
            "automaticEndTime": [
                19
            ],
            "id": [
                2
            ],
            "automaticStartTime": [
                19
            ],
            "bracketType": [
                42
            ],
            "goalTargetComparator": [
                126
            ],
            "goalTargetValue": [
                5
            ],
            "limitMode": [
                133
            ],
            "limitValue": [
                11
            ],
            "raceType": [
                134
            ],
            "__typename": [
                5
            ]
        },
        "RaceLimitMode": {},
        "RaceType": {},
        "RaceMatchConfig": {
            "id": [
                2
            ],
            "bracketType": [
                42
            ],
            "playerReportingEnabled": [
                7
            ],
            "verificationMethods": [
                131
            ],
            "verificationRequired": [
                7
            ],
            "__typename": [
                5
            ]
        },
        "TeamActionSet": {
            "id": [
                2
            ],
            "__typename": [
                5
            ]
        }
    }
}