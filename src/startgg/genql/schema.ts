import { FieldsSelection, Observable } from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
    Int: number,
    JSON: any,
    Timestamp: any,
    Float: number,
}

export interface Query {
    /** Returns the authenticated user */
    currentUser?: User
    /** Returns an entrant given its id */
    entrant?: Entrant
    /** Returns an event given its id or slug */
    event?: Event
    /** Returns a league given its id or slug */
    league?: League
    /** Returns a participant given its id */
    participant?: Participant
    /** Returns a phase given its id */
    phase?: Phase
    /** Returns a phase group given its id */
    phaseGroup?: PhaseGroup
    /** Returns a player given an id */
    player?: Player
    /** Returns a phase seed given its id */
    seed?: Seed
    /** Returns a set given its id */
    set?: Set
    /** A shop entity */
    shop?: Shop
    /** Returns an stream given its id */
    stream?: Streams
    /** Returns all the stream queues for a given tournament */
    streamQueue?: (StreamQueue | undefined)[]
    /** Returns a team given its id */
    team?: Team
    /** Returns a tournament given its id or slug */
    tournament?: Tournament
    /** Paginated, filterable list of tournaments */
    tournaments?: TournamentConnection
    /** Returns a user given a user slug of the form user/abc123, or id */
    user?: User
    /** Returns a videogame given its id */
    videogame?: Videogame
    /** Returns paginated list of videogames matching the search criteria. */
    videogames?: VideogameConnection
    __typename: 'Query'
}


/** A user */
export interface User {
    id?: Scalars['ID']
    /** Authorizations to external services (i.e. Twitch, Twitter) */
    authorizations?: (ProfileAuthorization | undefined)[]
    bio?: Scalars['String']
    /** Public facing user birthday that respects user publishing settings */
    birthday?: Scalars['String']
    /** Uniquely identifying token for user. Same as the hashed part of the slug */
    discriminator?: Scalars['String']
    /** Events this user has competed in */
    events?: EventConnection
    genderPronoun?: Scalars['String']
    images?: (Image | undefined)[]
    /** Leagues this user has competed in */
    leagues?: LeagueConnection
    /** Public location info for this user */
    location?: Address
    /** Public facing user name that respects user publishing settings */
    name?: Scalars['String']
    /** player for user */
    player?: Player
    slug?: Scalars['String']
    /** Tournaments this user is organizing or competing in */
    tournaments?: TournamentConnection
    __typename: 'User'
}


/** Represents the name of the third-party social service (e.g Twitter) for OAuth */
export type SocialConnectionType = 'TWITTER' | 'TWITCH' | 'DISCORD' | 'MIXER' | 'XBOX'


/** An OAuth ProfileAuthorization object */
export interface ProfileAuthorization {
    id?: Scalars['ID']
    /** The id given by the external service */
    externalId?: Scalars['String']
    /** The username given by the external service (including discriminator if discord) */
    externalUsername?: Scalars['String']
    stream?: Stream
    /** The name of the external service providing this auth i.e. "twitch" */
    type?: AuthorizationType
    url?: Scalars['String']
    __typename: 'ProfileAuthorization'
}


/** A Stream object */
export interface Stream {
    id?: Scalars['ID']
    /** Whether the stream is currently live. May be slightly delayed. */
    isOnline?: Scalars['Boolean']
    /** The name of the stream */
    name?: Scalars['String']
    /** The name of the external service providing this auth i.e. "twitch" */
    type?: StreamType
    __typename: 'Stream'
}


/** Represents the type of stream service */
export type StreamType = 'TWITCH' | 'MIXER'


/** Represents the name of the third-party service (e.g Twitter) for OAuth */
export type AuthorizationType = 'TWITTER' | 'TWITCH' | 'STEAM' | 'DISCORD' | 'XBOX' | 'MIXER'

export interface EventConnection {
    pageInfo?: PageInfo
    nodes?: (Event | undefined)[]
    __typename: 'EventConnection'
}

export interface PageInfo {
    total?: Scalars['Int']
    totalPages?: Scalars['Int']
    page?: Scalars['Int']
    perPage?: Scalars['Int']
    sortBy?: Scalars['String']
    filter?: Scalars['JSON']
    __typename: 'PageInfo'
}


/** An event in a tournament */
export interface Event {
    id?: Scalars['ID']
    /** How long before the event start will the check-in end (in seconds) */
    checkInBuffer?: Scalars['Int']
    /** How long the event check-in will last (in seconds) */
    checkInDuration?: Scalars['Int']
    /** Whether check-in is enabled for this event */
    checkInEnabled?: Scalars['Boolean']
    /** Rough categorization of event tier, denoting relative importance in the competitive scene */
    competitionTier?: Scalars['Int']
    /** When the event was created (unix timestamp) */
    createdAt?: Scalars['Timestamp']
    /** Last date attendees are able to create teams for team events */
    deckSubmissionDeadline?: Scalars['Timestamp']
    /**
     * @deprecated Migrate to teamRosterSize
     * Maximum number of participants each Entrant can have
     */
    entrantSizeMax?: Scalars['Int']
    /**
     * @deprecated Migrate to teamRosterSize
     * Minimum number of participants each Entrant can have
     */
    entrantSizeMin?: Scalars['Int']
    /** The entrants that belong to an event, paginated by filter criteria */
    entrants?: EntrantConnection
    /** Whether the event has decks */
    hasDecks?: Scalars['Boolean']
    /** Are player tasks enabled for this event */
    hasTasks?: Scalars['Boolean']
    images?: (Image | undefined)[]
    /** Whether the event is an online event or not */
    isOnline?: Scalars['Boolean']
    league?: League
    /** Markdown field for match rules/instructions */
    matchRulesMarkdown?: Scalars['String']
    /** Title of event set by organizer */
    name?: Scalars['String']
    /** Gets the number of entrants in this event */
    numEntrants?: Scalars['Int']
    /** The phase groups that belong to an event. */
    phaseGroups?: (PhaseGroup | undefined)[]
    /** The phases that belong to an event. */
    phases?: (Phase | undefined)[]
    /** TO settings for prizing */
    prizingInfo?: Scalars['JSON']
    publishing?: Scalars['JSON']
    /** Markdown field for event rules/instructions */
    rulesMarkdown?: Scalars['String']
    /** Id of the event ruleset */
    rulesetId?: Scalars['Int']
    /**
     * @deprecated Use ruleset
     * Settings pulled from the event ruleset, if one exists
     */
    rulesetSettings?: Scalars['JSON']
    /** Paginated sets for this Event */
    sets?: SetConnection
    slug?: Scalars['String']
    /** Paginated list of standings */
    standings?: StandingConnection
    /** When does this event start? */
    startAt?: Scalars['Timestamp']
    /** The state of the Event. */
    state?: ActivityState
    /** Paginated stations on this event */
    stations?: StationsConnection
    /** Last date attendees are able to create teams for team events */
    teamManagementDeadline?: Scalars['Timestamp']
    /** If this is a teams event, returns whether or not teams can set custom names */
    teamNameAllowed?: Scalars['Boolean']
    /** Team roster size requirements */
    teamRosterSize?: TeamRosterSize
    tournament?: Tournament
    /** The type of the event, whether an entrant will have one participant or multiple */
    type?: Scalars['Int']
    /** When the event was last modified (unix timestamp) */
    updatedAt?: Scalars['Timestamp']
    /** Whether the event uses the new EventSeeds for seeding */
    useEventSeeds?: Scalars['Boolean']
    videogame?: Videogame
    /** The waves being used by the event */
    waves?: (Wave | undefined)[]
    __typename: 'Event'
}

export interface EntrantConnection {
    pageInfo?: PageInfo
    nodes?: (Entrant | undefined)[]
    __typename: 'EntrantConnection'
}


/** An entrant in an event */
export interface Entrant {
    id?: Scalars['ID']
    event?: Event
    /** Entrant's seed number in the first phase of the event. */
    initialSeedNum?: Scalars['Int']
    isDisqualified?: Scalars['Boolean']
    /** The entrant name as it appears in bracket: gamerTag of the participant or team name */
    name?: Scalars['String']
    /** Paginated sets for this entrant */
    paginatedSets?: SetConnection
    participants?: (Participant | undefined)[]
    seeds?: (Seed | undefined)[]
    skill?: Scalars['Int']
    /** Standing for this entrant given an event. All entrants queried must be in the same event (for now). */
    standing?: Standing
    /** @deprecated DEPRECATED. Use streams instead, which supports multiple stream types and teams. */
    stream?: Streams
    streams?: (Streams | undefined)[]
    /** Team linked to this entrant, if one exists */
    team?: Team
    __typename: 'Entrant'
}


/** Different sort type configurations used when displaying multiple sets */
export type SetSortType = 'NONE' | 'CALL_ORDER' | 'MAGIC' | 'RECENT' | 'STANDARD' | 'ROUND'

export interface SetConnection {
    pageInfo?: PageInfo
    nodes?: (Set | undefined)[]
    __typename: 'SetConnection'
}


/** A set */
export interface Set {
    id?: Scalars['ID']
    /** The time this set was marked as completed */
    completedAt?: Scalars['Timestamp']
    /** The time this set was created */
    createdAt?: Scalars['Timestamp']
    displayScore?: Scalars['String']
    /** Event that this set belongs to. */
    event?: Event
    /** Full round text of this set. */
    fullRoundText?: Scalars['String']
    game?: Game
    games?: (Game | undefined)[]
    /** Whether this set contains a placeholder entrant */
    hasPlaceholder?: Scalars['Boolean']
    /** The letters that describe a unique identifier within the pool. Eg. F, AT */
    identifier?: Scalars['String']
    images?: (Image | undefined)[]
    lPlacement?: Scalars['Int']
    /** Phase group that this Set belongs to. */
    phaseGroup?: PhaseGroup
    /** The round number of the set. Negative numbers are losers bracket */
    round?: Scalars['Int']
    /**
     * Indicates whether the set is in best of or total games mode. This instructs
     * which field is used to figure out how many games are in this set.
     */
    setGamesType?: Scalars['Int']
    /** A possible spot in a set. Use this to get all entrants in a set. Use this for all bracket types (FFA, elimination, etc) */
    slots?: (SetSlot | undefined)[]
    /** The start time of the Set. If there is no startAt time on the Set, will pull it from phaseGroup rounds configuration. */
    startAt?: Scalars['Timestamp']
    startedAt?: Scalars['Timestamp']
    state?: Scalars['Int']
    /** Tournament event station for a set */
    station?: Stations
    /** Tournament event stream for a set */
    stream?: Streams
    /** If setGamesType is in total games mode, this defined the number of games in the set. */
    totalGames?: Scalars['Int']
    /** Url of a VOD for this set */
    vodUrl?: Scalars['String']
    wPlacement?: Scalars['Int']
    winnerId?: Scalars['Int']
    __typename: 'Set'
}


/** A game represents a single game within a set. */
export interface Game {
    id?: Scalars['ID']
    images?: (Image | undefined)[]
    orderNum?: Scalars['Int']
    /** Selections for this game such as character, etc. */
    selections?: (GameSelection | undefined)[]
    /** The stage that this game was played on (if applicable) */
    stage?: Stage
    state?: Scalars['Int']
    winnerId?: Scalars['Int']
    __typename: 'Game'
}


/** An image */
export interface Image {
    id?: Scalars['ID']
    height?: Scalars['Float']
    ratio?: Scalars['Float']
    type?: Scalars['String']
    url?: Scalars['String']
    width?: Scalars['Float']
    __typename: 'Image'
}


/** A selection for this game. i.e. character/stage selection, etc */
export interface GameSelection {
    id?: Scalars['ID']
    /** The entrant who this selection is for */
    entrant?: Entrant
    orderNum?: Scalars['Int']
    /**
     * The participant who this selection is for. This is only populated if there are
     * selections for multiple participants of a single entrant
     */
    participant?: Participant
    selectionType?: GameSelectionType
    selectionValue?: Scalars['Int']
    __typename: 'GameSelection'
}


/** A participant of a tournament; either a spectator or competitor */
export interface Participant {
    id?: Scalars['ID']
    /** If this participant was checked-in by admin */
    checkedIn?: Scalars['Boolean']
    /** The time this participant was checked-in by admin */
    checkedInAt?: Scalars['Timestamp']
    /** Info for connected accounts to external services. */
    connectedAccounts?: Scalars['JSON']
    /**
     * Contact Info selected during registration. Falls back to User.location and/or
     * User.name if necessary. These fields are for admin use only and do not respect
     * user privacy settings. DO NOT display this information publicly.
     */
    contactInfo?: ContactInfo
    /** Email of the user, only available to admins within 18 months of tournament */
    email?: Scalars['String']
    entrants?: (Entrant | undefined)[]
    /** The events this participant registered for. */
    events?: (Event | undefined)[]
    /** The tag that was used in registration e.g. Mang0 */
    gamerTag?: Scalars['String']
    images?: (Image | undefined)[]
    player?: Player
    /** The prefix that was used in registration e.g. C9 */
    prefix?: Scalars['String']
    /** Admin only field for required social connections */
    requiredConnections?: (ProfileAuthorization | undefined)[]
    /** The user this participant is associated to. */
    user?: User
    /** If this participant is verified as actually being in the tournament */
    verified?: Scalars['Boolean']
    __typename: 'Participant'
}


/** Name, address, etc */
export interface ContactInfo {
    id?: Scalars['ID']
    /** Participant City Name */
    city?: Scalars['String']
    /** Participant Country Name */
    country?: Scalars['String']
    /** Participant Country (region) id */
    countryId?: Scalars['Int']
    name?: Scalars['String']
    /** First Name */
    nameFirst?: Scalars['String']
    /** Last Name */
    nameLast?: Scalars['String']
    /** Participant State Name */
    state?: Scalars['String']
    /** Participant State (region) id */
    stateId?: Scalars['Int']
    /** Zip or Postal Code */
    zipcode?: Scalars['String']
    __typename: 'ContactInfo'
}


/** A player */
export interface Player {
    id?: Scalars['ID']
    gamerTag?: Scalars['String']
    prefix?: Scalars['String']
    /** Most recent active & published rankings */
    rankings?: (PlayerRank | undefined)[]
    /**
     * @deprecated Use the sets field instead.
     * Recent sets for this player.
     */
    recentSets?: (Set | undefined)[]
    /** Set history for this player. */
    sets?: SetConnection
    user?: User
    __typename: 'Player'
}


/** A player's ranks */
export interface PlayerRank {
    id?: Scalars['ID']
    /** The player's placement on the ranking */
    rank?: Scalars['Int']
    title?: Scalars['String']
    __typename: 'PlayerRank'
}


/** The type of selection i.e. is it for a character or something else */
export type GameSelectionType = 'CHARACTER'


/** Video Stage */
export interface Stage {
    id?: Scalars['ID']
    /** Stage name */
    name?: Scalars['String']
    __typename: 'Stage'
}


/** A group within a phase */
export interface PhaseGroup {
    id?: Scalars['ID']
    /** The bracket type of this group's phase. */
    bracketType?: BracketType
    /** Unique identifier for this group within the context of its phase */
    displayIdentifier?: Scalars['String']
    /** For the given phase group, this is the start time of the first round that occurs in the group. */
    firstRoundTime?: Scalars['Timestamp']
    numRounds?: Scalars['Int']
    /** @deprecated Please use 'seeds', which is now paginated */
    paginatedSeeds?: SeedConnection
    /**
     * @deprecated Please use 'sets', which is now paginated
     * Paginated sets on this phaseGroup
     */
    paginatedSets?: SetConnection
    /** The phase associated with this phase group */
    phase?: Phase
    /** The progressions out of this phase group */
    progressionsOut?: (Progression | undefined)[]
    rounds?: (Round | undefined)[]
    seedMap?: Scalars['JSON']
    /** Paginated seeds for this phase group */
    seeds?: SeedConnection
    /** Paginated sets on this phaseGroup */
    sets?: SetConnection
    /** Paginated list of standings */
    standings?: StandingConnection
    /** Unix time the group is scheduled to start. This info could also be on the wave instead. */
    startAt?: Scalars['Timestamp']
    state?: Scalars['Int']
    tiebreakOrder?: Scalars['JSON']
    wave?: Wave
    __typename: 'PhaseGroup'
}


/** The type of Bracket format that a Phase is configured with. */
export type BracketType = 'SINGLE_ELIMINATION' | 'DOUBLE_ELIMINATION' | 'ROUND_ROBIN' | 'SWISS' | 'EXHIBITION' | 'CUSTOM_SCHEDULE' | 'MATCHMAKING' | 'ELIMINATION_ROUNDS' | 'RACE' | 'CIRCUIT'

export interface SeedConnection {
    pageInfo?: PageInfo
    nodes?: (Seed | undefined)[]
    __typename: 'SeedConnection'
}


/** A seed for an entrant */
export interface Seed {
    id?: Scalars['ID']
    /** Map of Participant ID to checked in boolean */
    checkedInParticipants?: Scalars['JSON']
    entrant?: Entrant
    groupSeedNum?: Scalars['Int']
    isBye?: Scalars['Boolean']
    phase?: Phase
    phaseGroup?: PhaseGroup
    placeholderName?: Scalars['String']
    placement?: Scalars['Int']
    /** The player(s) associated with this seed's entrant */
    players?: (Player | undefined)[]
    progressionSeedId?: Scalars['Int']
    /** Source progression information */
    progressionSource?: Progression
    seedNum?: Scalars['Int']
    /** Entrant's win/loss record for this standing. Scores do not include byes. */
    setRecordWithoutByes?: Scalars['JSON']
    standings?: (Standing | undefined)[]
    __typename: 'Seed'
}


/** A phase in an event */
export interface Phase {
    id?: Scalars['ID']
    /** The bracket type of this phase. */
    bracketType?: BracketType
    /** The Event that this phase belongs to */
    event?: Event
    /** Number of phase groups in this phase */
    groupCount?: Scalars['Int']
    /** Is the phase an exhibition or not. */
    isExhibition?: Scalars['Boolean']
    /** Name of phase e.g. Round 1 Pools */
    name?: Scalars['String']
    /** The number of seeds this phase contains. */
    numSeeds?: Scalars['Int']
    /** @deprecated Please use 'seeds' instead */
    paginatedSeeds?: SeedConnection
    /** Phase groups under this phase, paginated */
    phaseGroups?: PhaseGroupConnection
    /** The relative order of this phase within an event */
    phaseOrder?: Scalars['Int']
    /** Paginated seeds for this phase */
    seeds?: SeedConnection
    /** Paginated sets for this Phase */
    sets?: SetConnection
    /** State of the phase */
    state?: ActivityState
    waves?: (Wave | undefined)[]
    __typename: 'Phase'
}

export interface PhaseGroupConnection {
    pageInfo?: PageInfo
    nodes?: (PhaseGroup | undefined)[]
    __typename: 'PhaseGroupConnection'
}


/** Represents the state of an activity */
export type ActivityState = 'CREATED' | 'ACTIVE' | 'COMPLETED' | 'READY' | 'INVALID' | 'CALLED' | 'QUEUED'


/** A wave in a tournament */
export interface Wave {
    id?: Scalars['ID']
    /** The Wave Identifier */
    identifier?: Scalars['String']
    /** Unix time the wave is scheduled to start. */
    startAt?: Scalars['Timestamp']
    __typename: 'Wave'
}


/** A connection between a placement in an origin phase group to a destination seed. */
export interface Progression {
    id?: Scalars['ID']
    originOrder?: Scalars['Int']
    originPhase?: Phase
    originPhaseGroup?: PhaseGroup
    originPlacement?: Scalars['Int']
    __typename: 'Progression'
}


/** A standing indicates the placement of something within a container. */
export interface Standing {
    id?: Scalars['ID']
    /**
     * The containing entity that contextualizes this standing. Event standings, for
     * example, represent an entrant's standing in the entire event vs. Set standings
     * which is an entrant's standing in only a single set within an event.
     */
    container?: StandingContainer
    /** If the entity this standing is assigned to can be resolved into an entrant, this will provide the entrant. */
    entrant?: Entrant
    isFinal?: Scalars['Boolean']
    /** Metadata that goes along with this standing. Can take on different forms based on standing group type and settings. */
    metadata?: Scalars['JSON']
    placement?: Scalars['Int']
    /** The player(s) tied to this standing's entity */
    player?: Player
    /** @deprecated The "placement" field is identical and will eventually replace "standing" */
    standing?: Scalars['Int']
    stats?: StandingStats
    totalPoints?: Scalars['Float']
    __typename: 'Standing'
}


/** The containing entity that this standing is for */
export type StandingContainer = (Tournament | Event | PhaseGroup | Set) & { __isUnion?: true }


/** A tournament */
export interface Tournament {
    id?: Scalars['ID']
    addrState?: Scalars['String']
    /** Admin-only view of admins for this tournament */
    admins?: (User | undefined)[]
    city?: Scalars['String']
    countryCode?: Scalars['String']
    /** When the tournament was created (unix timestamp) */
    createdAt?: Scalars['Timestamp']
    currency?: Scalars['String']
    /** When the tournament ends */
    endAt?: Scalars['Timestamp']
    /** When does event registration close */
    eventRegistrationClosesAt?: Scalars['Timestamp']
    events?: (Event | undefined)[]
    /** True if tournament has at least one offline event */
    hasOfflineEvents?: Scalars['Boolean']
    hasOnlineEvents?: Scalars['Boolean']
    hashtag?: Scalars['String']
    images?: (Image | undefined)[]
    /** True if tournament has at least one online event */
    isOnline?: Scalars['Boolean']
    /** Is tournament registration open */
    isRegistrationOpen?: Scalars['Boolean']
    lat?: Scalars['Float']
    links?: TournamentLinks
    lng?: Scalars['Float']
    mapsPlaceId?: Scalars['String']
    /** The tournament name */
    name?: Scalars['String']
    /** Number of attendees including spectators, if public */
    numAttendees?: Scalars['Int']
    /** The user who created the tournament */
    owner?: User
    /** Paginated, queryable list of participants */
    participants?: ParticipantConnection
    postalCode?: Scalars['String']
    primaryContact?: Scalars['String']
    primaryContactType?: Scalars['String']
    /** Publishing settings for this tournament */
    publishing?: Scalars['JSON']
    /** When does registration for the tournament end */
    registrationClosesAt?: Scalars['Timestamp']
    rules?: Scalars['String']
    /** The short slug used to form the url */
    shortSlug?: Scalars['String']
    /** The slug used to form the url */
    slug?: Scalars['String']
    /** When the tournament Starts */
    startAt?: Scalars['Timestamp']
    /** State of the tournament, can be ActivityState::CREATED, ActivityState::ACTIVE, or ActivityState::COMPLETED */
    state?: Scalars['Int']
    stations?: StationsConnection
    streamQueue?: (StreamQueue | undefined)[]
    streams?: (Streams | undefined)[]
    /** When is the team creation deadline */
    teamCreationClosesAt?: Scalars['Timestamp']
    /** Paginated, queryable list of teams */
    teams?: TeamConnection
    /** The timezone of the tournament */
    timezone?: Scalars['String']
    /** The type of tournament from TournamentType */
    tournamentType?: Scalars['Int']
    /** When the tournament was last modified (unix timestamp) */
    updatedAt?: Scalars['Timestamp']
    /** Build Tournament URL */
    url?: Scalars['String']
    venueAddress?: Scalars['String']
    venueName?: Scalars['String']
    /** List of all waves in this tournament */
    waves?: (Wave | undefined)[]
    __typename: 'Tournament'
}

export interface TournamentLinks {
    facebook?: Scalars['String']
    discord?: Scalars['String']
    __typename: 'TournamentLinks'
}

export interface ParticipantConnection {
    pageInfo?: PageInfo
    nodes?: (Participant | undefined)[]
    __typename: 'ParticipantConnection'
}

export interface StationsConnection {
    pageInfo?: PageInfo
    nodes?: (Stations | undefined)[]
    __typename: 'StationsConnection'
}


/** Stations, such as a stream setup, at an event */
export interface Stations {
    id?: Scalars['ID']
    canAutoAssign?: Scalars['Boolean']
    clusterNumber?: Scalars['String']
    clusterPrefix?: Scalars['Int']
    enabled?: Scalars['Boolean']
    identifier?: Scalars['Int']
    numSetups?: Scalars['Int']
    number?: Scalars['Int']
    prefix?: Scalars['String']
    queue?: Scalars['JSON']
    queueDepth?: Scalars['Int']
    state?: Scalars['Int']
    updatedAt?: Scalars['Timestamp']
    __typename: 'Stations'
}


/** A Stream queue object */
export interface StreamQueue {
    id?: Scalars['String']
    /** The sets on the stream */
    sets?: (Set | undefined)[]
    /** The stream on the queue */
    stream?: Streams
    __typename: 'StreamQueue'
}


/** Tournament Stream */
export interface Streams {
    id?: Scalars['ID']
    enabled?: Scalars['Boolean']
    followerCount?: Scalars['Int']
    isOnline?: Scalars['Boolean']
    numSetups?: Scalars['Int']
    parentStreamId?: Scalars['Int']
    streamGame?: Scalars['String']
    streamId?: Scalars['String']
    streamLogo?: Scalars['String']
    streamName?: Scalars['String']
    streamSource?: StreamSource
    streamStatus?: Scalars['String']
    streamType?: Scalars['Int']
    streamTypeId?: Scalars['Int']
    __typename: 'Streams'
}


/** Represents the source of a stream */
export type StreamSource = 'TWITCH' | 'HITBOX' | 'STREAMME' | 'MIXER'


/** Membership status of a team member */
export type TeamMemberStatus = 'UNKNOWN' | 'ACCEPTED' | 'INVITED' | 'REQUEST' | 'ALUM' | 'HIATUS' | 'OPEN_SPOT'

export interface TeamConnection {
    pageInfo?: PageInfo
    nodes?: (Team | undefined)[]
    __typename: 'TeamConnection'
}


/** A team, either at the global level or within the context of an event */
export type Team = (EventTeam | GlobalTeam) & { __isUnion?: true }


/** A member of a team */
export interface TeamMember {
    id?: Scalars['ID']
    isAlternate?: Scalars['Boolean']
    isCaptain?: Scalars['Boolean']
    /** The type of the team member */
    memberType?: TeamMemberType
    participant?: Participant
    player?: Player
    /** The status of the team member */
    status?: TeamMemberStatus
    __typename: 'TeamMember'
}


/** Membership type of a team member */
export type TeamMemberType = 'PLAYER' | 'STAFF'


/** Any stats related to this standing. This type is experimental and very likely to change in the future. */
export interface StandingStats {
    score?: Score
    __typename: 'StandingStats'
}


/**
 * The score that led to this standing being awarded. The meaning of this field can
 * vary by standing type and is not used for some standing types.
 */
export interface Score {
    /** The name of this score. e.g. "Kills" or "Stocks" */
    label?: Scalars['String']
    /** The raw score value */
    value?: Scalars['Float']
    /** Like value, but formatted for race format events. Formatted according to the race config for the front end to use. */
    displayValue?: Scalars['String']
    __typename: 'Score'
}


/** A round within a phase group */
export interface Round {
    id?: Scalars['ID']
    /**
     * If applicable, bestOf is the number of games
     * 									one must win a majority out of to win a set in this round
     */
    bestOf?: Scalars['Int']
    /** Indicates this round's order in the phase group */
    number?: Scalars['Int']
    /** The time that this round is scheduled to start at */
    startAt?: Scalars['Timestamp']
    __typename: 'Round'
}

export interface StandingConnection {
    pageInfo?: PageInfo
    nodes?: (Standing | undefined)[]
    __typename: 'StandingConnection'
}


/** A slot in a set where a seed currently or will eventually exist in order to participate in the set. */
export interface SetSlot {
    id?: Scalars['ID']
    entrant?: Entrant
    /** Pairs with prereqType, is the ID of the prereq. */
    prereqId?: Scalars['String']
    /** Given a set prereq type, defines the placement required in the origin set to end up in this slot. */
    prereqPlacement?: Scalars['Int']
    /** Describes where the entity in this slot comes from. */
    prereqType?: Scalars['String']
    seed?: Seed
    /** The index of the slot. Unique per set. */
    slotIndex?: Scalars['Int']
    /** The standing within this set for the seed currently assigned to this slot. */
    standing?: Standing
    __typename: 'SetSlot'
}


/** A league */
export interface League {
    id?: Scalars['ID']
    addrState?: Scalars['String']
    city?: Scalars['String']
    countryCode?: Scalars['String']
    /** When the tournament was created (unix timestamp) */
    createdAt?: Scalars['Timestamp']
    currency?: Scalars['String']
    /** When the tournament ends */
    endAt?: Scalars['Timestamp']
    entrantCount?: Scalars['Int']
    eventOwners?: EventOwnerConnection
    /** When does event registration close */
    eventRegistrationClosesAt?: Scalars['Timestamp']
    /** Paginated list of events in a league */
    events?: EventConnection
    /**
     * @deprecated No longer used
     * Hacked "progression" into this final event
     */
    finalEventId?: Scalars['Int']
    /** True if tournament has at least one offline event */
    hasOfflineEvents?: Scalars['Boolean']
    hasOnlineEvents?: Scalars['Boolean']
    hashtag?: Scalars['String']
    images?: (Image | undefined)[]
    /** True if tournament has at least one online event */
    isOnline?: Scalars['Boolean']
    lat?: Scalars['Float']
    links?: TournamentLinks
    lng?: Scalars['Float']
    mapsPlaceId?: Scalars['String']
    /** The tournament name */
    name?: Scalars['String']
    /**
     * @deprecated No longer used
     * Top X number of people in the standings who progress to final event
     */
    numProgressingToFinalEvent?: Scalars['Int']
    numUniquePlayers?: Scalars['Int']
    postalCode?: Scalars['String']
    primaryContact?: Scalars['String']
    primaryContactType?: Scalars['String']
    /** Publishing settings for this tournament */
    publishing?: Scalars['JSON']
    /** When does registration for the tournament end */
    registrationClosesAt?: Scalars['Timestamp']
    rules?: Scalars['String']
    /** The short slug used to form the url */
    shortSlug?: Scalars['String']
    /** Whether standings for this league should be visible */
    showStandings?: Scalars['Boolean']
    slug?: Scalars['String']
    /** Paginated list of standings */
    standings?: StandingConnection
    /** When the tournament Starts */
    startAt?: Scalars['Timestamp']
    /** State of the tournament, can be ActivityState::CREATED, ActivityState::ACTIVE, or ActivityState::COMPLETED */
    state?: Scalars['Int']
    /** When is the team creation deadline */
    teamCreationClosesAt?: Scalars['Timestamp']
    tiers?: (EventTier | undefined)[]
    /** The timezone of the tournament */
    timezone?: Scalars['String']
    /** The type of tournament from TournamentType */
    tournamentType?: Scalars['Int']
    /** When the tournament was last modified (unix timestamp) */
    updatedAt?: Scalars['Timestamp']
    /** Build Tournament URL */
    url?: Scalars['String']
    venueAddress?: Scalars['String']
    venueName?: Scalars['String']
    videogames?: (Videogame | undefined)[]
    __typename: 'League'
}

export interface EventOwnerConnection {
    pageInfo?: PageInfo
    nodes?: (EventOwner | undefined)[]
    __typename: 'EventOwnerConnection'
}


/** Name and Gamertag of the owner of an event in a league */
export interface EventOwner {
    eventId?: Scalars['ID']
    email?: Scalars['String']
    gamerTag?: Scalars['String']
    fullName?: Scalars['String']
    __typename: 'EventOwner'
}


/** Used for league application tiers */
export interface EventTier {
    id?: Scalars['ID']
    /** Name of this tier */
    name?: Scalars['String']
    __typename: 'EventTier'
}


/** A videogame */
export interface Videogame {
    id?: Scalars['ID']
    /** All characters for this videogame */
    characters?: (Character | undefined)[]
    displayName?: Scalars['String']
    images?: (Image | undefined)[]
    name?: Scalars['String']
    slug?: Scalars['String']
    __typename: 'Videogame'
}


/** A character in a videogame */
export interface Character {
    id?: Scalars['ID']
    images?: (Image | undefined)[]
    /** Name of Character */
    name?: Scalars['String']
    __typename: 'Character'
}


/** Team roster size requirements */
export interface TeamRosterSize {
    maxAlternates?: Scalars['Int']
    maxPlayers?: Scalars['Int']
    minAlternates?: Scalars['Int']
    minPlayers?: Scalars['Int']
    __typename: 'TeamRosterSize'
}

export interface LeagueConnection {
    pageInfo?: PageInfo
    nodes?: (League | undefined)[]
    __typename: 'LeagueConnection'
}


/** A user's address */
export interface Address {
    id?: Scalars['ID']
    city?: Scalars['String']
    country?: Scalars['String']
    countryId?: Scalars['Int']
    state?: Scalars['String']
    stateId?: Scalars['Int']
    __typename: 'Address'
}

export interface TournamentConnection {
    pageInfo?: PageInfo
    nodes?: (Tournament | undefined)[]
    __typename: 'TournamentConnection'
}


/** A shop */
export interface Shop {
    id?: Scalars['ID']
    levels?: ShopLevelConnection
    messages?: ShopOrderMessageConnection
    name?: Scalars['String']
    slug?: Scalars['String']
    url?: Scalars['String']
    __typename: 'Shop'
}

export interface ShopLevelConnection {
    pageInfo?: PageInfo
    nodes?: (ShopLevel | undefined)[]
    __typename: 'ShopLevelConnection'
}


/** A shop level */
export interface ShopLevel {
    id?: Scalars['ID']
    currAmount?: Scalars['Float']
    description?: Scalars['String']
    goalAmount?: Scalars['Float']
    images?: (Image | undefined)[]
    name?: Scalars['String']
    __typename: 'ShopLevel'
}

export interface ShopOrderMessageConnection {
    pageInfo?: PageInfo
    nodes?: (ShopOrderMessage | undefined)[]
    __typename: 'ShopOrderMessageConnection'
}


/** The message and player info for a shop order */
export interface ShopOrderMessage {
    id?: Scalars['ID']
    /** The player's gamertag. Returns null if anonymous message type */
    gamertag?: Scalars['String']
    /** The order message */
    message?: Scalars['String']
    /** The player's name. Returns null unless name & tag display is selected */
    name?: Scalars['String']
    /** The player who left the comment */
    player?: Player
    /** The total order amount */
    total?: Scalars['Float']
    __typename: 'ShopOrderMessage'
}

export type TournamentPaginationSort = 'startAt' | 'endAt' | 'eventRegistrationClosesAt' | 'computedUpdatedAt'

export interface VideogameConnection {
    pageInfo?: PageInfo
    nodes?: (Videogame | undefined)[]
    __typename: 'VideogameConnection'
}

export interface Mutation {
    /** Delete a phase by id */
    deletePhase?: Scalars['Boolean']
    /** Delete a station by id */
    deleteStation?: Scalars['Boolean']
    /** Delete a wave by id */
    deleteWave?: Scalars['Boolean']
    /** Automatically attempt to resolve all schedule conflicts. Returns a list of changed seeds */
    resolveScheduleConflicts?: (Seed | undefined)[]
    /** Swap two seed ids in a phase */
    swapSeeds?: (Seed | undefined)[]
    /** Update set of phase groups in a phase */
    updatePhaseGroups?: (PhaseGroup | undefined)[]
    /** Update the seeding for a phase */
    updatePhaseSeeding?: Phase
    /** Create or update a Phase */
    upsertPhase?: Phase
    /** Add or update a station by id */
    upsertStation?: Stations
    /** Add or update a wave by id */
    upsertWave?: Wave
    __typename: 'Mutation'
}


/** A set of actions available for an entity to take */
export type ActionSet = (TeamActionSet) & { __isUnion?: true }


/** Bracket-specific configuration */
export type BracketConfig = (RaceBracketConfig) & { __isUnion?: true }


/** Comparison operator */
export type Comparator = 'GREATER_THAN' | 'GREATER_THAN_OR_EQUAL' | 'EQUAL' | 'LESS_THAN_OR_EQUAL' | 'LESS_THAN'


/** An event-level Team, in the context of some competition */
export interface EventTeam {
    id?: Scalars['ID']
    /** Uniquely identifying token for team. Same as the hashed part of the slug */
    discriminator?: Scalars['String']
    /** @deprecated Use the entrant field off the EventTeam type */
    entrant?: Entrant
    /** @deprecated Use the event field off the EventTeam type */
    event?: Event
    globalTeam?: GlobalTeam
    images?: (Image | undefined)[]
    members?: (TeamMember | undefined)[]
    name?: Scalars['String']
    __typename: 'EventTeam'
}


/** Global Team */
export interface GlobalTeam {
    id?: Scalars['ID']
    /** Uniquely identifying token for team. Same as the hashed part of the slug */
    discriminator?: Scalars['String']
    /** @deprecated Use the entrant field off the EventTeam type */
    entrant?: Entrant
    /** @deprecated Use the event field off the EventTeam type */
    event?: Event
    eventTeams?: EventTeamConnection
    images?: (Image | undefined)[]
    /** Leagues-level teams for leagues this team is competing in */
    leagueTeams?: EventTeamConnection
    members?: (TeamMember | undefined)[]
    name?: Scalars['String']
    __typename: 'GlobalTeam'
}

export interface EventTeamConnection {
    pageInfo?: PageInfo
    nodes?: (EventTeam | undefined)[]
    __typename: 'EventTeamConnection'
}


/** Match-level configuration */
export type MatchConfig = (RaceMatchConfig) & { __isUnion?: true }


/** Different options available for verifying player-reported match results */
export type MatchConfigVerificationMethod = 'TWITCH' | 'STREAM_ME' | 'ANY' | 'MIXER' | 'YOUTUBE'


/** Race specific bracket configuration */
export interface RaceBracketConfig {
    automaticEndTime?: Scalars['Timestamp']
    id?: Scalars['ID']
    automaticStartTime?: Scalars['Timestamp']
    bracketType?: BracketType
    goalTargetComparator?: Comparator
    goalTargetValue?: Scalars['String']
    limitMode?: RaceLimitMode
    limitValue?: Scalars['Int']
    raceType?: RaceType
    __typename: 'RaceBracketConfig'
}


/** Enforces limits on the amount of allowable Race submissions */
export type RaceLimitMode = 'BEST_ALL' | 'FIRST_ALL' | 'PLAYTIME'


/** Race type */
export type RaceType = 'GOALS' | 'TIMED'


/** Race specific match configuration */
export interface RaceMatchConfig {
    id?: Scalars['ID']
    bracketType?: BracketType
    /** Can players report results? */
    playerReportingEnabled?: Scalars['Boolean']
    /** Accepted methods of verification that players can use */
    verificationMethods?: (MatchConfigVerificationMethod | undefined)[]
    /** Are players required to submit verification of their reported results? */
    verificationRequired?: Scalars['Boolean']
    __typename: 'RaceMatchConfig'
}


/** A set of actions available for a team to take */
export interface TeamActionSet {
    id?: Scalars['ID']
    __typename: 'TeamActionSet'
}

export interface QueryRequest {
    /** Returns the authenticated user */
    currentUser?: UserRequest
    /** Returns an entrant given its id */
    entrant?: [{ id: Scalars['ID'] }, EntrantRequest]
    /** Returns an event given its id or slug */
    event?: [{ id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }, EventRequest] | EventRequest
    /** Returns a league given its id or slug */
    league?: [{ id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }, LeagueRequest] | LeagueRequest
    /** Returns a participant given its id */
    participant?: [{ id: Scalars['ID'], isAdmin?: (Scalars['Boolean'] | null) }, ParticipantRequest]
    /** Returns a phase given its id */
    phase?: [{ id?: (Scalars['ID'] | null) }, PhaseRequest] | PhaseRequest
    /** Returns a phase group given its id */
    phaseGroup?: [{ id?: (Scalars['ID'] | null) }, PhaseGroupRequest] | PhaseGroupRequest
    /** Returns a player given an id */
    player?: [{ id: Scalars['ID'] }, PlayerRequest]
    /** Returns a phase seed given its id */
    seed?: [{ id?: (Scalars['ID'] | null) }, SeedRequest] | SeedRequest
    /** Returns a set given its id */
    set?: [{ id: Scalars['ID'] }, SetRequest]
    /** A shop entity */
    shop?: [{ id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }, ShopRequest] | ShopRequest
    /** Returns an stream given its id */
    stream?: [{ id: Scalars['ID'] }, StreamsRequest]
    /** Returns all the stream queues for a given tournament */
    streamQueue?: [{ tournamentId: Scalars['ID'], includePlayerStreams?: (Scalars['Boolean'] | null) }, StreamQueueRequest]
    /** Returns a team given its id */
    team?: [{ id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null), inviteCode?: (Scalars['String'] | null) }, TeamRequest] | TeamRequest
    /** Returns a tournament given its id or slug */
    tournament?: [{ id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }, TournamentRequest] | TournamentRequest
    /** Paginated, filterable list of tournaments */
    tournaments?: [{ query: TournamentQuery }, TournamentConnectionRequest]
    /** Returns a user given a user slug of the form user/abc123, or id */
    user?: [{ id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }, UserRequest] | UserRequest
    /** Returns a videogame given its id */
    videogame?: [{ id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }, VideogameRequest] | VideogameRequest
    /** Returns paginated list of videogames matching the search criteria. */
    videogames?: [{ query: VideogameQuery }, VideogameConnectionRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A user */
export interface UserRequest {
    id?: boolean | number
    /** Authorizations to external services (i.e. Twitch, Twitter) */
    authorizations?: [{ types?: ((SocialConnectionType | null)[] | null) }, ProfileAuthorizationRequest] | ProfileAuthorizationRequest
    bio?: boolean | number
    /** Public facing user birthday that respects user publishing settings */
    birthday?: boolean | number
    /** Uniquely identifying token for user. Same as the hashed part of the slug */
    discriminator?: boolean | number
    /** Events this user has competed in */
    events?: [{ query?: (UserEventsPaginationQuery | null) }, EventConnectionRequest] | EventConnectionRequest
    genderPronoun?: boolean | number
    images?: [{ type?: (Scalars['String'] | null) }, ImageRequest] | ImageRequest
    /** Leagues this user has competed in */
    leagues?: [{ query?: (UserLeaguesPaginationQuery | null) }, LeagueConnectionRequest] | LeagueConnectionRequest
    /** Public location info for this user */
    location?: AddressRequest
    /** Public facing user name that respects user publishing settings */
    name?: boolean | number
    /** player for user */
    player?: PlayerRequest
    slug?: boolean | number
    /** Tournaments this user is organizing or competing in */
    tournaments?: [{ query?: (UserTournamentsPaginationQuery | null) }, TournamentConnectionRequest] | TournamentConnectionRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** An OAuth ProfileAuthorization object */
export interface ProfileAuthorizationRequest {
    id?: boolean | number
    /** The id given by the external service */
    externalId?: boolean | number
    /** The username given by the external service (including discriminator if discord) */
    externalUsername?: boolean | number
    stream?: StreamRequest
    /** The name of the external service providing this auth i.e. "twitch" */
    type?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A Stream object */
export interface StreamRequest {
    id?: boolean | number
    /** Whether the stream is currently live. May be slightly delayed. */
    isOnline?: boolean | number
    /** The name of the stream */
    name?: boolean | number
    /** The name of the external service providing this auth i.e. "twitch" */
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserEventsPaginationQuery {
    page?: (Scalars['Int'] | null),
    /** How many nodes to return for the page. Maximum value of 500 */
    perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null), filter?: (UserEventsPaginationFilter | null)
}

export interface UserEventsPaginationFilter { videogameId?: ((Scalars['ID'] | null)[] | null), eventType?: (Scalars['Int'] | null), minEntrantCount?: (Scalars['Int'] | null), maxEntrantCount?: (Scalars['Int'] | null), location?: (LocationFilterType | null), search?: (PaginationSearchType | null) }

export interface LocationFilterType { countryCode?: (Scalars['String'] | null), state?: (Scalars['String'] | null), city?: (Scalars['String'] | null) }

export interface PaginationSearchType { fieldsToSearch?: ((Scalars['String'] | null)[] | null), searchString?: (Scalars['String'] | null) }

export interface EventConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: EventRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PageInfoRequest {
    total?: boolean | number
    totalPages?: boolean | number
    page?: boolean | number
    perPage?: boolean | number
    sortBy?: boolean | number
    filter?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** An event in a tournament */
export interface EventRequest {
    id?: boolean | number
    /** How long before the event start will the check-in end (in seconds) */
    checkInBuffer?: boolean | number
    /** How long the event check-in will last (in seconds) */
    checkInDuration?: boolean | number
    /** Whether check-in is enabled for this event */
    checkInEnabled?: boolean | number
    /** Rough categorization of event tier, denoting relative importance in the competitive scene */
    competitionTier?: boolean | number
    /** When the event was created (unix timestamp) */
    createdAt?: boolean | number
    /** Last date attendees are able to create teams for team events */
    deckSubmissionDeadline?: boolean | number
    /**
     * @deprecated Migrate to teamRosterSize
     * Maximum number of participants each Entrant can have
     */
    entrantSizeMax?: boolean | number
    /**
     * @deprecated Migrate to teamRosterSize
     * Minimum number of participants each Entrant can have
     */
    entrantSizeMin?: boolean | number
    /** The entrants that belong to an event, paginated by filter criteria */
    entrants?: [{ query?: (EventEntrantPageQuery | null) }, EntrantConnectionRequest] | EntrantConnectionRequest
    /** Whether the event has decks */
    hasDecks?: boolean | number
    /** Are player tasks enabled for this event */
    hasTasks?: boolean | number
    images?: [{ type?: (Scalars['String'] | null) }, ImageRequest] | ImageRequest
    /** Whether the event is an online event or not */
    isOnline?: boolean | number
    league?: LeagueRequest
    /** Markdown field for match rules/instructions */
    matchRulesMarkdown?: boolean | number
    /** Title of event set by organizer */
    name?: boolean | number
    /** Gets the number of entrants in this event */
    numEntrants?: boolean | number
    /** The phase groups that belong to an event. */
    phaseGroups?: PhaseGroupRequest
    /** The phases that belong to an event. */
    phases?: [{
        /** Filter phases by state. If not specified will default to all phases */
        state?: (ActivityState | null),
        /** Optionally only return results for this phase */
        phaseId?: (Scalars['ID'] | null)
    }, PhaseRequest] | PhaseRequest
    /** TO settings for prizing */
    prizingInfo?: boolean | number
    publishing?: boolean | number
    /** Markdown field for event rules/instructions */
    rulesMarkdown?: boolean | number
    /** Id of the event ruleset */
    rulesetId?: boolean | number
    /**
     * @deprecated Use ruleset
     * Settings pulled from the event ruleset, if one exists
     */
    rulesetSettings?: boolean | number
    /** Paginated sets for this Event */
    sets?: [{
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }, SetConnectionRequest] | SetConnectionRequest
    slug?: boolean | number
    /** Paginated list of standings */
    standings?: [{ query: StandingPaginationQuery }, StandingConnectionRequest]
    /** When does this event start? */
    startAt?: boolean | number
    /** The state of the Event. */
    state?: boolean | number
    /** Paginated stations on this event */
    stations?: [{ query?: (StationFilter | null) }, StationsConnectionRequest] | StationsConnectionRequest
    /** Last date attendees are able to create teams for team events */
    teamManagementDeadline?: boolean | number
    /** If this is a teams event, returns whether or not teams can set custom names */
    teamNameAllowed?: boolean | number
    /** Team roster size requirements */
    teamRosterSize?: TeamRosterSizeRequest
    tournament?: TournamentRequest
    /** The type of the event, whether an entrant will have one participant or multiple */
    type?: boolean | number
    /** When the event was last modified (unix timestamp) */
    updatedAt?: boolean | number
    /** Whether the event uses the new EventSeeds for seeding */
    useEventSeeds?: boolean | number
    videogame?: VideogameRequest
    /** The waves being used by the event */
    waves?: [{
        /** Waves filtered by phaseId, returns all if not set. */
        phaseId?: (Scalars['ID'] | null)
    }, WaveRequest] | WaveRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EventEntrantPageQuery { page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null), filter?: (EventEntrantPageQueryFilter | null) }

export interface EventEntrantPageQueryFilter { name?: (Scalars['String'] | null) }

export interface EntrantConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: EntrantRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** An entrant in an event */
export interface EntrantRequest {
    id?: boolean | number
    event?: EventRequest
    /** Entrant's seed number in the first phase of the event. */
    initialSeedNum?: boolean | number
    isDisqualified?: boolean | number
    /** The entrant name as it appears in bracket: gamerTag of the participant or team name */
    name?: boolean | number
    /** Paginated sets for this entrant */
    paginatedSets?: [{
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }, SetConnectionRequest] | SetConnectionRequest
    participants?: ParticipantRequest
    seeds?: SeedRequest
    skill?: boolean | number
    /** Standing for this entrant given an event. All entrants queried must be in the same event (for now). */
    standing?: StandingRequest
    /** @deprecated DEPRECATED. Use streams instead, which supports multiple stream types and teams. */
    stream?: StreamsRequest
    streams?: StreamsRequest
    /** Team linked to this entrant, if one exists */
    team?: TeamRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SetFilters {
    /** Only return Sets for these Entrants */
    entrantIds?: ((Scalars['ID'] | null)[] | null),
    /** Only return Sets for this Entrant size. For example, to fetch 1v1 Sets only, filter by an entrantSize of 1 */
    entrantSize?: ((Scalars['Int'] | null)[] | null),
    /** Only return Sets that have an attached VOD */
    hasVod?: (Scalars['Boolean'] | null),
    /** Do not return empty Sets. For example, set this to true to filter out sets that are waiting for progressions. */
    hideEmpty?: (Scalars['Boolean'] | null),
    /** Return sets that contain a bye */
    showByes?: (Scalars['Boolean'] | null),
    /** Only return Sets that are in an Online event. If omitted, Sets for both online and offline Events are returned */
    isEventOnline?: (Scalars['Boolean'] | null),
    /** Only return Sets in certain geographical areas. */
    location?: (SetFilterLocation | null),
    /** Only return Sets for these Participants */
    participantIds?: ((Scalars['ID'] | null)[] | null),
    /** Only return Sets in these PhaseGroups */
    phaseGroupIds?: ((Scalars['ID'] | null)[] | null),
    /** Only return Sets in these Phases */
    phaseIds?: ((Scalars['ID'] | null)[] | null),
    /** Only return Sets in these Events */
    eventIds?: ((Scalars['ID'] | null)[] | null),
    /** Only return Sets in these Tournaments */
    tournamentIds?: ((Scalars['ID'] | null)[] | null),
    /** Only return Sets for these Players */
    playerIds?: ((Scalars['ID'] | null)[] | null),
    /** Only return Sets for these Rounds */
    roundNumber?: (Scalars['Int'] | null),
    /** Only returns Sets that are in these states */
    state?: ((Scalars['Int'] | null)[] | null),
    /** Only return Sets that are assigned to these Station IDs */
    stationIds?: ((Scalars['ID'] | null)[] | null),
    /** Only return Sets that are assigned to these Station numbers */
    stationNumbers?: ((Scalars['Int'] | null)[] | null),
    /** Only return sets created or updated since this timestamp */
    updatedAfter?: (Scalars['Timestamp'] | null)
}


/** Filter Sets by geographical constraints. */
export interface SetFilterLocation {
    /** Only return Sets in this state. Only applicable to US states */
    state?: (Scalars['String'] | null),
    /** Only return Sets in this country. Expects a valid two-letter country code */
    country?: (Scalars['String'] | null), distanceFrom?: (SetFilterLocationDistanceFrom | null)
}


/** Only return Sets that are a certain distance away from a specified point */
export interface SetFilterLocationDistanceFrom {
    /** Point at which to perform distance calculation */
    point?: (SetFilterLocationDistanceFromPoint | null),
    /** Distance from the point to include results in */
    radius?: (Scalars['String'] | null)
}

export interface SetFilterLocationDistanceFromPoint { lat?: (Scalars['Float'] | null), lon?: (Scalars['Float'] | null) }

export interface SetConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: SetRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A set */
export interface SetRequest {
    id?: boolean | number
    /** The time this set was marked as completed */
    completedAt?: boolean | number
    /** The time this set was created */
    createdAt?: boolean | number
    displayScore?: [{ mainEntrantId?: (Scalars['ID'] | null) }] | boolean | number
    /** Event that this set belongs to. */
    event?: EventRequest
    /** Full round text of this set. */
    fullRoundText?: boolean | number
    game?: [{ orderNum: Scalars['Int'] }, GameRequest]
    games?: GameRequest
    /** Whether this set contains a placeholder entrant */
    hasPlaceholder?: boolean | number
    /** The letters that describe a unique identifier within the pool. Eg. F, AT */
    identifier?: boolean | number
    images?: [{ type?: (Scalars['String'] | null) }, ImageRequest] | ImageRequest
    lPlacement?: boolean | number
    /** Phase group that this Set belongs to. */
    phaseGroup?: PhaseGroupRequest
    /** The round number of the set. Negative numbers are losers bracket */
    round?: boolean | number
    /**
     * Indicates whether the set is in best of or total games mode. This instructs
     * which field is used to figure out how many games are in this set.
     */
    setGamesType?: boolean | number
    /** A possible spot in a set. Use this to get all entrants in a set. Use this for all bracket types (FFA, elimination, etc) */
    slots?: [{ includeByes?: (Scalars['Boolean'] | null) }, SetSlotRequest] | SetSlotRequest
    /** The start time of the Set. If there is no startAt time on the Set, will pull it from phaseGroup rounds configuration. */
    startAt?: boolean | number
    startedAt?: boolean | number
    state?: boolean | number
    /** Tournament event station for a set */
    station?: StationsRequest
    /** Tournament event stream for a set */
    stream?: StreamsRequest
    /** If setGamesType is in total games mode, this defined the number of games in the set. */
    totalGames?: boolean | number
    /** Url of a VOD for this set */
    vodUrl?: boolean | number
    wPlacement?: boolean | number
    winnerId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A game represents a single game within a set. */
export interface GameRequest {
    id?: boolean | number
    images?: [{ type?: (Scalars['String'] | null) }, ImageRequest] | ImageRequest
    orderNum?: boolean | number
    /** Selections for this game such as character, etc. */
    selections?: GameSelectionRequest
    /** The stage that this game was played on (if applicable) */
    stage?: StageRequest
    state?: boolean | number
    winnerId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** An image */
export interface ImageRequest {
    id?: boolean | number
    height?: boolean | number
    ratio?: boolean | number
    type?: boolean | number
    url?: boolean | number
    width?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A selection for this game. i.e. character/stage selection, etc */
export interface GameSelectionRequest {
    id?: boolean | number
    /** The entrant who this selection is for */
    entrant?: EntrantRequest
    orderNum?: boolean | number
    /**
     * The participant who this selection is for. This is only populated if there are
     * selections for multiple participants of a single entrant
     */
    participant?: ParticipantRequest
    selectionType?: boolean | number
    selectionValue?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A participant of a tournament; either a spectator or competitor */
export interface ParticipantRequest {
    id?: boolean | number
    /** If this participant was checked-in by admin */
    checkedIn?: boolean | number
    /** The time this participant was checked-in by admin */
    checkedInAt?: boolean | number
    /** Info for connected accounts to external services. */
    connectedAccounts?: boolean | number
    /**
     * Contact Info selected during registration. Falls back to User.location and/or
     * User.name if necessary. These fields are for admin use only and do not respect
     * user privacy settings. DO NOT display this information publicly.
     */
    contactInfo?: ContactInfoRequest
    /** Email of the user, only available to admins within 18 months of tournament */
    email?: boolean | number
    entrants?: EntrantRequest
    /** The events this participant registered for. */
    events?: EventRequest
    /** The tag that was used in registration e.g. Mang0 */
    gamerTag?: boolean | number
    images?: [{ type?: (Scalars['String'] | null) }, ImageRequest] | ImageRequest
    player?: PlayerRequest
    /** The prefix that was used in registration e.g. C9 */
    prefix?: boolean | number
    /** Admin only field for required social connections */
    requiredConnections?: ProfileAuthorizationRequest
    /** The user this participant is associated to. */
    user?: UserRequest
    /** If this participant is verified as actually being in the tournament */
    verified?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Name, address, etc */
export interface ContactInfoRequest {
    id?: boolean | number
    /** Participant City Name */
    city?: boolean | number
    /** Participant Country Name */
    country?: boolean | number
    /** Participant Country (region) id */
    countryId?: boolean | number
    name?: boolean | number
    /** First Name */
    nameFirst?: boolean | number
    /** Last Name */
    nameLast?: boolean | number
    /** Participant State Name */
    state?: boolean | number
    /** Participant State (region) id */
    stateId?: boolean | number
    /** Zip or Postal Code */
    zipcode?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A player */
export interface PlayerRequest {
    id?: boolean | number
    gamerTag?: boolean | number
    prefix?: boolean | number
    /** Most recent active & published rankings */
    rankings?: [{ limit?: (Scalars['Int'] | null), videogameId?: (Scalars['ID'] | null) }, PlayerRankRequest] | PlayerRankRequest
    /**
     * @deprecated Use the sets field instead.
     * Recent sets for this player.
     */
    recentSets?: [{
        /** Use this to get H2H history between two players */
        opponentId?: (Scalars['ID'] | null)
    }, SetRequest] | SetRequest
    /** Set history for this player. */
    sets?: [{
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }, SetConnectionRequest] | SetConnectionRequest
    user?: UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A player's ranks */
export interface PlayerRankRequest {
    id?: boolean | number
    /** The player's placement on the ranking */
    rank?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Video Stage */
export interface StageRequest {
    id?: boolean | number
    /** Stage name */
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A group within a phase */
export interface PhaseGroupRequest {
    id?: boolean | number
    /** The bracket type of this group's phase. */
    bracketType?: boolean | number
    /** Unique identifier for this group within the context of its phase */
    displayIdentifier?: boolean | number
    /** For the given phase group, this is the start time of the first round that occurs in the group. */
    firstRoundTime?: boolean | number
    numRounds?: boolean | number
    /** @deprecated Please use 'seeds', which is now paginated */
    paginatedSeeds?: [{ query: SeedPaginationQuery, eventId?: (Scalars['ID'] | null) }, SeedConnectionRequest]
    /**
     * @deprecated Please use 'sets', which is now paginated
     * Paginated sets on this phaseGroup
     */
    paginatedSets?: [{
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }, SetConnectionRequest] | SetConnectionRequest
    /** The phase associated with this phase group */
    phase?: PhaseRequest
    /** The progressions out of this phase group */
    progressionsOut?: ProgressionRequest
    rounds?: RoundRequest
    seedMap?: boolean | number
    /** Paginated seeds for this phase group */
    seeds?: [{ query: SeedPaginationQuery, eventId?: (Scalars['ID'] | null) }, SeedConnectionRequest]
    /** Paginated sets on this phaseGroup */
    sets?: [{
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }, SetConnectionRequest] | SetConnectionRequest
    /** Paginated list of standings */
    standings?: [{ query?: (StandingGroupStandingPageFilter | null) }, StandingConnectionRequest] | StandingConnectionRequest
    /** Unix time the group is scheduled to start. This info could also be on the wave instead. */
    startAt?: boolean | number
    state?: boolean | number
    tiebreakOrder?: boolean | number
    wave?: WaveRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SeedPaginationQuery {
    page?: (Scalars['Int'] | null),
    /** How many nodes to return for the page. Maximum value of 500 */
    perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null), filter?: (SeedPageFilter | null)
}

export interface SeedPageFilter { id?: (Scalars['ID'] | null), entrantName?: (Scalars['String'] | null), checkInState?: ((Scalars['Int'] | null)[] | null), phaseGroupId?: ((Scalars['ID'] | null)[] | null), eventCheckInGroupId?: (Scalars['ID'] | null), phaseId?: ((Scalars['ID'] | null)[] | null), eventId?: (Scalars['ID'] | null), search?: (PaginationSearchType | null) }

export interface SeedConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: SeedRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A seed for an entrant */
export interface SeedRequest {
    id?: boolean | number
    /** Map of Participant ID to checked in boolean */
    checkedInParticipants?: boolean | number
    entrant?: EntrantRequest
    groupSeedNum?: boolean | number
    isBye?: boolean | number
    phase?: PhaseRequest
    phaseGroup?: PhaseGroupRequest
    placeholderName?: boolean | number
    placement?: boolean | number
    /** The player(s) associated with this seed's entrant */
    players?: PlayerRequest
    progressionSeedId?: boolean | number
    /** Source progression information */
    progressionSource?: ProgressionRequest
    seedNum?: boolean | number
    /** Entrant's win/loss record for this standing. Scores do not include byes. */
    setRecordWithoutByes?: [{ phaseGroupId: Scalars['ID'] }]
    standings?: [{
        /** The container of the standing groups to get standings for. If null, will return all standings. */
        containerType?: (Scalars['String'] | null)
    }, StandingRequest] | StandingRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A phase in an event */
export interface PhaseRequest {
    id?: boolean | number
    /** The bracket type of this phase. */
    bracketType?: boolean | number
    /** The Event that this phase belongs to */
    event?: EventRequest
    /** Number of phase groups in this phase */
    groupCount?: boolean | number
    /** Is the phase an exhibition or not. */
    isExhibition?: boolean | number
    /** Name of phase e.g. Round 1 Pools */
    name?: boolean | number
    /** The number of seeds this phase contains. */
    numSeeds?: boolean | number
    /** @deprecated Please use 'seeds' instead */
    paginatedSeeds?: [{ query: SeedPaginationQuery, eventId?: (Scalars['ID'] | null) }, SeedConnectionRequest]
    /** Phase groups under this phase, paginated */
    phaseGroups?: [{ query?: (PhaseGroupPageQuery | null) }, PhaseGroupConnectionRequest] | PhaseGroupConnectionRequest
    /** The relative order of this phase within an event */
    phaseOrder?: boolean | number
    /** Paginated seeds for this phase */
    seeds?: [{ query: SeedPaginationQuery, eventId?: (Scalars['ID'] | null) }, SeedConnectionRequest]
    /** Paginated sets for this Phase */
    sets?: [{
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }, SetConnectionRequest] | SetConnectionRequest
    /** State of the phase */
    state?: boolean | number
    waves?: WaveRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PhaseGroupPageQuery { page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null), entrantIds?: ((Scalars['ID'] | null)[] | null), filter?: (PhaseGroupPageQueryFilter | null) }

export interface PhaseGroupPageQueryFilter { id?: ((Scalars['ID'] | null)[] | null), waveId?: (Scalars['ID'] | null) }

export interface PhaseGroupConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: PhaseGroupRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A wave in a tournament */
export interface WaveRequest {
    id?: boolean | number
    /** The Wave Identifier */
    identifier?: boolean | number
    /** Unix time the wave is scheduled to start. */
    startAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A connection between a placement in an origin phase group to a destination seed. */
export interface ProgressionRequest {
    id?: boolean | number
    originOrder?: boolean | number
    originPhase?: PhaseRequest
    originPhaseGroup?: PhaseGroupRequest
    originPlacement?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A standing indicates the placement of something within a container. */
export interface StandingRequest {
    id?: boolean | number
    /**
     * The containing entity that contextualizes this standing. Event standings, for
     * example, represent an entrant's standing in the entire event vs. Set standings
     * which is an entrant's standing in only a single set within an event.
     */
    container?: StandingContainerRequest
    /** If the entity this standing is assigned to can be resolved into an entrant, this will provide the entrant. */
    entrant?: EntrantRequest
    isFinal?: boolean | number
    /** Metadata that goes along with this standing. Can take on different forms based on standing group type and settings. */
    metadata?: boolean | number
    placement?: boolean | number
    /** The player(s) tied to this standing's entity */
    player?: PlayerRequest
    /** @deprecated The "placement" field is identical and will eventually replace "standing" */
    standing?: boolean | number
    stats?: StandingStatsRequest
    totalPoints?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The containing entity that this standing is for */
export interface StandingContainerRequest {
    on_Tournament?: TournamentRequest,
    on_Event?: EventRequest,
    on_PhaseGroup?: PhaseGroupRequest,
    on_Set?: SetRequest,
    __typename?: boolean | number
}


/** A tournament */
export interface TournamentRequest {
    id?: boolean | number
    addrState?: boolean | number
    /** Admin-only view of admins for this tournament */
    admins?: [{
        /** Which roles to show */
        roles?: ((Scalars['String'] | null)[] | null)
    }, UserRequest] | UserRequest
    city?: boolean | number
    countryCode?: boolean | number
    /** When the tournament was created (unix timestamp) */
    createdAt?: boolean | number
    currency?: boolean | number
    /** When the tournament ends */
    endAt?: boolean | number
    /** When does event registration close */
    eventRegistrationClosesAt?: boolean | number
    events?: [{ limit?: (Scalars['Int'] | null), filter?: (EventFilter | null) }, EventRequest] | EventRequest
    /** True if tournament has at least one offline event */
    hasOfflineEvents?: boolean | number
    hasOnlineEvents?: boolean | number
    hashtag?: boolean | number
    images?: [{ type?: (Scalars['String'] | null) }, ImageRequest] | ImageRequest
    /** True if tournament has at least one online event */
    isOnline?: boolean | number
    /** Is tournament registration open */
    isRegistrationOpen?: boolean | number
    lat?: boolean | number
    links?: TournamentLinksRequest
    lng?: boolean | number
    mapsPlaceId?: boolean | number
    /** The tournament name */
    name?: boolean | number
    /** Number of attendees including spectators, if public */
    numAttendees?: boolean | number
    /** The user who created the tournament */
    owner?: UserRequest
    /** Paginated, queryable list of participants */
    participants?: [{ query: ParticipantPaginationQuery, isAdmin?: (Scalars['Boolean'] | null) }, ParticipantConnectionRequest]
    postalCode?: boolean | number
    primaryContact?: boolean | number
    primaryContactType?: boolean | number
    /** Publishing settings for this tournament */
    publishing?: boolean | number
    /** When does registration for the tournament end */
    registrationClosesAt?: boolean | number
    rules?: boolean | number
    /** The short slug used to form the url */
    shortSlug?: boolean | number
    /** The slug used to form the url */
    slug?: boolean | number
    /** When the tournament Starts */
    startAt?: boolean | number
    /** State of the tournament, can be ActivityState::CREATED, ActivityState::ACTIVE, or ActivityState::COMPLETED */
    state?: boolean | number
    stations?: [{ page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null) }, StationsConnectionRequest] | StationsConnectionRequest
    streamQueue?: StreamQueueRequest
    streams?: StreamsRequest
    /** When is the team creation deadline */
    teamCreationClosesAt?: boolean | number
    /** Paginated, queryable list of teams */
    teams?: [{ query: TeamPaginationQuery }, TeamConnectionRequest]
    /** The timezone of the tournament */
    timezone?: boolean | number
    /** The type of tournament from TournamentType */
    tournamentType?: boolean | number
    /** When the tournament was last modified (unix timestamp) */
    updatedAt?: boolean | number
    /** Build Tournament URL */
    url?: [{
        /** Tournament tab to add to URL */
        tab?: (Scalars['String'] | null),
        /** Generate a relative URL. Defaults to true. Setting to false will generate an absolute URL */
        relative?: (Scalars['Boolean'] | null)
    }] | boolean | number
    venueAddress?: boolean | number
    venueName?: boolean | number
    /** List of all waves in this tournament */
    waves?: WaveRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EventFilter { videogameId?: ((Scalars['ID'] | null)[] | null), type?: ((Scalars['Int'] | null)[] | null), published?: (Scalars['Boolean'] | null) }

export interface TournamentLinksRequest {
    facebook?: boolean | number
    discord?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ParticipantPaginationQuery {
    page?: (Scalars['Int'] | null),
    /** How many nodes to return for the page. Maximum value of 500 */
    perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null), filter?: (ParticipantPageFilter | null)
}

export interface ParticipantPageFilter { id?: (Scalars['ID'] | null), ids?: ((Scalars['ID'] | null)[] | null), eventIds?: ((Scalars['ID'] | null)[] | null), search?: (PaginationSearchType | null), gamerTag?: (Scalars['String'] | null), unpaid?: (Scalars['Boolean'] | null), incompleteTeam?: (Scalars['Boolean'] | null), missingDeck?: (Scalars['Boolean'] | null), checkedIn?: (Scalars['Boolean'] | null), notCheckedIn?: (Scalars['Boolean'] | null) }

export interface ParticipantConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: ParticipantRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StationsConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: StationsRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Stations, such as a stream setup, at an event */
export interface StationsRequest {
    id?: boolean | number
    canAutoAssign?: boolean | number
    clusterNumber?: boolean | number
    clusterPrefix?: boolean | number
    enabled?: boolean | number
    identifier?: boolean | number
    numSetups?: boolean | number
    number?: boolean | number
    prefix?: boolean | number
    queue?: boolean | number
    queueDepth?: boolean | number
    state?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A Stream queue object */
export interface StreamQueueRequest {
    id?: boolean | number
    /** The sets on the stream */
    sets?: SetRequest
    /** The stream on the queue */
    stream?: StreamsRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Tournament Stream */
export interface StreamsRequest {
    id?: boolean | number
    enabled?: boolean | number
    followerCount?: boolean | number
    isOnline?: boolean | number
    numSetups?: boolean | number
    parentStreamId?: boolean | number
    streamGame?: boolean | number
    streamId?: boolean | number
    streamLogo?: boolean | number
    streamName?: boolean | number
    streamSource?: boolean | number
    streamStatus?: boolean | number
    streamType?: boolean | number
    streamTypeId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TeamPaginationQuery {
    page?: (Scalars['Int'] | null),
    /** How many nodes to return for the page. Maximum value of 500 */
    perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null), filter?: (TeamPaginationFilter | null)
}

export interface TeamPaginationFilter { globalTeamId?: (Scalars['ID'] | null), eventState?: (ActivityState | null), eventId?: (Scalars['ID'] | null), eventIds?: ((Scalars['ID'] | null)[] | null), minEntrantCount?: (Scalars['Int'] | null), maxEntrantCount?: (Scalars['Int'] | null), search?: (PaginationSearchType | null), type?: (Scalars['Int'] | null), tournamentId?: (Scalars['ID'] | null), memberStatus?: ((TeamMemberStatus | null)[] | null), videogameId?: ((Scalars['ID'] | null)[] | null), isLeague?: (Scalars['Boolean'] | null), upcoming?: (Scalars['Boolean'] | null), past?: (Scalars['Boolean'] | null), rosterComplete?: (Scalars['Boolean'] | null), rosterIncomplete?: (Scalars['Boolean'] | null) }

export interface TeamConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: TeamRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A team, either at the global level or within the context of an event */
export interface TeamRequest {
    id?: boolean | number
    /** Uniquely identifying token for team. Same as the hashed part of the slug */
    discriminator?: boolean | number
    /** @deprecated Use the entrant field off the EventTeam type */
    entrant?: EntrantRequest
    /** @deprecated Use the event field off the EventTeam type */
    event?: EventRequest
    images?: [{ type?: (Scalars['String'] | null) }, ImageRequest] | ImageRequest
    members?: [{ status?: ((TeamMemberStatus | null)[] | null) }, TeamMemberRequest] | TeamMemberRequest
    name?: boolean | number
    on_EventTeam?: EventTeamRequest
    on_GlobalTeam?: GlobalTeamRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A member of a team */
export interface TeamMemberRequest {
    id?: boolean | number
    isAlternate?: boolean | number
    isCaptain?: boolean | number
    /** The type of the team member */
    memberType?: boolean | number
    participant?: ParticipantRequest
    player?: PlayerRequest
    /** The status of the team member */
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Any stats related to this standing. This type is experimental and very likely to change in the future. */
export interface StandingStatsRequest {
    score?: ScoreRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/**
 * The score that led to this standing being awarded. The meaning of this field can
 * vary by standing type and is not used for some standing types.
 */
export interface ScoreRequest {
    /** The name of this score. e.g. "Kills" or "Stocks" */
    label?: boolean | number
    /** The raw score value */
    value?: boolean | number
    /** Like value, but formatted for race format events. Formatted according to the race config for the front end to use. */
    displayValue?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A round within a phase group */
export interface RoundRequest {
    id?: boolean | number
    /**
     * If applicable, bestOf is the number of games
     * 									one must win a majority out of to win a set in this round
     */
    bestOf?: boolean | number
    /** Indicates this round's order in the phase group */
    number?: boolean | number
    /** The time that this round is scheduled to start at */
    startAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StandingGroupStandingPageFilter { page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null) }

export interface StandingConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: StandingRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A slot in a set where a seed currently or will eventually exist in order to participate in the set. */
export interface SetSlotRequest {
    id?: boolean | number
    entrant?: EntrantRequest
    /** Pairs with prereqType, is the ID of the prereq. */
    prereqId?: boolean | number
    /** Given a set prereq type, defines the placement required in the origin set to end up in this slot. */
    prereqPlacement?: boolean | number
    /** Describes where the entity in this slot comes from. */
    prereqType?: boolean | number
    seed?: SeedRequest
    /** The index of the slot. Unique per set. */
    slotIndex?: boolean | number
    /** The standing within this set for the seed currently assigned to this slot. */
    standing?: StandingRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A league */
export interface LeagueRequest {
    id?: boolean | number
    addrState?: boolean | number
    city?: boolean | number
    countryCode?: boolean | number
    /** When the tournament was created (unix timestamp) */
    createdAt?: boolean | number
    currency?: boolean | number
    /** When the tournament ends */
    endAt?: boolean | number
    entrantCount?: boolean | number
    eventOwners?: [{ query?: (EventOwnersQuery | null) }, EventOwnerConnectionRequest] | EventOwnerConnectionRequest
    /** When does event registration close */
    eventRegistrationClosesAt?: boolean | number
    /** Paginated list of events in a league */
    events?: [{ query?: (LeagueEventsQuery | null) }, EventConnectionRequest] | EventConnectionRequest
    /**
     * @deprecated No longer used
     * Hacked "progression" into this final event
     */
    finalEventId?: boolean | number
    /** True if tournament has at least one offline event */
    hasOfflineEvents?: boolean | number
    hasOnlineEvents?: boolean | number
    hashtag?: boolean | number
    images?: [{ type?: (Scalars['String'] | null) }, ImageRequest] | ImageRequest
    /** True if tournament has at least one online event */
    isOnline?: boolean | number
    lat?: boolean | number
    links?: TournamentLinksRequest
    lng?: boolean | number
    mapsPlaceId?: boolean | number
    /** The tournament name */
    name?: boolean | number
    /**
     * @deprecated No longer used
     * Top X number of people in the standings who progress to final event
     */
    numProgressingToFinalEvent?: boolean | number
    numUniquePlayers?: boolean | number
    postalCode?: boolean | number
    primaryContact?: boolean | number
    primaryContactType?: boolean | number
    /** Publishing settings for this tournament */
    publishing?: boolean | number
    /** When does registration for the tournament end */
    registrationClosesAt?: boolean | number
    rules?: boolean | number
    /** The short slug used to form the url */
    shortSlug?: boolean | number
    /** Whether standings for this league should be visible */
    showStandings?: boolean | number
    slug?: boolean | number
    /** Paginated list of standings */
    standings?: [{ query?: (StandingGroupStandingPageFilter | null) }, StandingConnectionRequest] | StandingConnectionRequest
    /** When the tournament Starts */
    startAt?: boolean | number
    /** State of the tournament, can be ActivityState::CREATED, ActivityState::ACTIVE, or ActivityState::COMPLETED */
    state?: boolean | number
    /** When is the team creation deadline */
    teamCreationClosesAt?: boolean | number
    tiers?: EventTierRequest
    /** The timezone of the tournament */
    timezone?: boolean | number
    /** The type of tournament from TournamentType */
    tournamentType?: boolean | number
    /** When the tournament was last modified (unix timestamp) */
    updatedAt?: boolean | number
    /** Build Tournament URL */
    url?: [{
        /** Tournament tab to add to URL */
        tab?: (Scalars['String'] | null),
        /** Generate a relative URL. Defaults to true. Setting to false will generate an absolute URL */
        relative?: (Scalars['Boolean'] | null)
    }] | boolean | number
    venueAddress?: boolean | number
    venueName?: boolean | number
    videogames?: VideogameRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EventOwnersQuery {
    page?: (Scalars['Int'] | null),
    /** How many nodes to return for the page. Maximum value of 500 */
    perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null)
}

export interface EventOwnerConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: EventOwnerRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Name and Gamertag of the owner of an event in a league */
export interface EventOwnerRequest {
    eventId?: boolean | number
    email?: boolean | number
    gamerTag?: boolean | number
    fullName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LeagueEventsQuery {
    page?: (Scalars['Int'] | null),
    /** How many nodes to return for the page. Maximum value of 500 */
    perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null), filter?: (LeagueEventsFilter | null)
}

export interface LeagueEventsFilter { search?: (PaginationSearchType | null), pointMappingGroupIds?: ((Scalars['ID'] | null)[] | null), tierIds?: ((Scalars['ID'] | null)[] | null), userId?: (Scalars['ID'] | null), upcoming?: (Scalars['Boolean'] | null), leagueEntrantId?: (Scalars['ID'] | null) }


/** Used for league application tiers */
export interface EventTierRequest {
    id?: boolean | number
    /** Name of this tier */
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A videogame */
export interface VideogameRequest {
    id?: boolean | number
    /** All characters for this videogame */
    characters?: CharacterRequest
    displayName?: boolean | number
    images?: [{ type?: (Scalars['String'] | null) }, ImageRequest] | ImageRequest
    name?: boolean | number
    slug?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A character in a videogame */
export interface CharacterRequest {
    id?: boolean | number
    images?: [{ type?: (Scalars['String'] | null) }, ImageRequest] | ImageRequest
    /** Name of Character */
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StandingPaginationQuery {
    page?: (Scalars['Int'] | null),
    /** How many nodes to return for the page. Maximum value of 500 */
    perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null), filter?: (StandingPageFilter | null)
}

export interface StandingPageFilter { id?: (Scalars['ID'] | null), ids?: ((Scalars['ID'] | null)[] | null), search?: (PaginationSearchType | null) }

export interface StationFilter { page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null) }


/** Team roster size requirements */
export interface TeamRosterSizeRequest {
    maxAlternates?: boolean | number
    maxPlayers?: boolean | number
    minAlternates?: boolean | number
    minPlayers?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserLeaguesPaginationQuery {
    page?: (Scalars['Int'] | null),
    /** How many nodes to return for the page. Maximum value of 500 */
    perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null), filter?: (UserLeaguesPaginationFilter | null)
}

export interface UserLeaguesPaginationFilter { videogameId?: ((Scalars['ID'] | null)[] | null), upcoming?: (Scalars['Boolean'] | null), past?: (Scalars['Boolean'] | null), search?: (PaginationSearchType | null) }

export interface LeagueConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: LeagueRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A user's address */
export interface AddressRequest {
    id?: boolean | number
    city?: boolean | number
    country?: boolean | number
    countryId?: boolean | number
    state?: boolean | number
    stateId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserTournamentsPaginationQuery {
    page?: (Scalars['Int'] | null),
    /** How many nodes to return for the page. Maximum value of 500 */
    perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null), filter?: (UserTournamentsPaginationFilter | null)
}

export interface UserTournamentsPaginationFilter { past?: (Scalars['Boolean'] | null), upcoming?: (Scalars['Boolean'] | null), search?: (PaginationSearchType | null), videogameId?: ((Scalars['ID'] | null)[] | null), tournamentView?: (Scalars['String'] | null), excludeId?: ((Scalars['ID'] | null)[] | null) }

export interface TournamentConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: TournamentRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A shop */
export interface ShopRequest {
    id?: boolean | number
    levels?: [{ query?: (ShopLevelsQuery | null) }, ShopLevelConnectionRequest] | ShopLevelConnectionRequest
    messages?: [{ query?: (ShopOrderMessagesQuery | null) }, ShopOrderMessageConnectionRequest] | ShopOrderMessageConnectionRequest
    name?: boolean | number
    slug?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ShopLevelsQuery {
    page?: (Scalars['Int'] | null),
    /** How many nodes to return for the page. Maximum value of 500 */
    perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null)
}

export interface ShopLevelConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: ShopLevelRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A shop level */
export interface ShopLevelRequest {
    id?: boolean | number
    currAmount?: boolean | number
    description?: boolean | number
    goalAmount?: boolean | number
    images?: [{ type?: (Scalars['String'] | null) }, ImageRequest] | ImageRequest
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ShopOrderMessagesQuery {
    page?: (Scalars['Int'] | null),
    /** How many nodes to return for the page. Maximum value of 500 */
    perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null)
}

export interface ShopOrderMessageConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: ShopOrderMessageRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** The message and player info for a shop order */
export interface ShopOrderMessageRequest {
    id?: boolean | number
    /** The player's gamertag. Returns null if anonymous message type */
    gamertag?: boolean | number
    /** The order message */
    message?: boolean | number
    /** The player's name. Returns null unless name & tag display is selected */
    name?: boolean | number
    /** The player who left the comment */
    player?: PlayerRequest
    /** The total order amount */
    total?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TournamentQuery {
    page?: (Scalars['Int'] | null),
    /** How many nodes to return for the page. Maximum value of 500 */
    perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null), filter?: (TournamentPageFilter | null), sort?: (TournamentPaginationSort | null)
}

export interface TournamentPageFilter {
    id?: (Scalars['ID'] | null), ids?: ((Scalars['ID'] | null)[] | null),
    /** ID of the user that owns this tournament. */
    ownerId?: (Scalars['ID'] | null),
    /** If true, filter to only tournaments the currently authed user is an admin of */
    isCurrentUserAdmin?: (Scalars['Boolean'] | null), countryCode?: (Scalars['String'] | null), addrState?: (Scalars['String'] | null), location?: (TournamentLocationFilter | null), afterDate?: (Scalars['Timestamp'] | null), beforeDate?: (Scalars['Timestamp'] | null), computedUpdatedAt?: (Scalars['Timestamp'] | null), name?: (Scalars['String'] | null), venueName?: (Scalars['String'] | null), isFeatured?: (Scalars['Boolean'] | null), isLeague?: (Scalars['Boolean'] | null), hasBannerImages?: (Scalars['Boolean'] | null), activeShops?: (Scalars['Boolean'] | null), regOpen?: (Scalars['Boolean'] | null), past?: (Scalars['Boolean'] | null), published?: (Scalars['Boolean'] | null), publiclySearchable?: (Scalars['Boolean'] | null), staffPicks?: (Scalars['Boolean'] | null), hasOnlineEvents?: (Scalars['Boolean'] | null), topGames?: (TopGameFilter | null), upcoming?: (Scalars['Boolean'] | null), videogameIds?: ((Scalars['ID'] | null)[] | null), sortByScore?: (Scalars['Boolean'] | null)
}

export interface TournamentLocationFilter {
    /** Latitude, Longitude */
    distanceFrom?: (Scalars['String'] | null),
    /** e.g. 50mi */
    distance?: (Scalars['String'] | null)
}

export interface TopGameFilter {
    /** Array of which # top game you want to filter on.e.g. [2, 3] will filter on the 2nd and 3rd top games */
    gameNums?: ((Scalars['Int'] | null)[] | null)
}

export interface VideogameQuery {
    page?: (Scalars['Int'] | null),
    /** How many nodes to return for the page. Maximum value of 500 */
    perPage?: (Scalars['Int'] | null), sortBy?: (Scalars['String'] | null), filter?: (VideogamePageFilter | null)
}

export interface VideogamePageFilter { id?: ((Scalars['ID'] | null)[] | null), name?: (Scalars['String'] | null), forUser?: (Scalars['ID'] | null) }

export interface VideogameConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: VideogameRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest {
    /** Delete a phase by id */
    deletePhase?: [{ phaseId: Scalars['ID'] }]
    /** Delete a station by id */
    deleteStation?: [{ stationId: Scalars['ID'] }]
    /** Delete a wave by id */
    deleteWave?: [{ waveId: Scalars['ID'] }]
    /** Automatically attempt to resolve all schedule conflicts. Returns a list of changed seeds */
    resolveScheduleConflicts?: [{ tournamentId: Scalars['ID'], options?: (ResolveConflictsOptions | null) }, SeedRequest]
    /** Swap two seed ids in a phase */
    swapSeeds?: [{ phaseId: Scalars['ID'], seed1Id: Scalars['ID'], seed2Id: Scalars['ID'] }, SeedRequest]
    /** Update set of phase groups in a phase */
    updatePhaseGroups?: [{ groupConfigs: (PhaseGroupUpdateInput | null)[] }, PhaseGroupRequest]
    /** Update the seeding for a phase */
    updatePhaseSeeding?: [{ phaseId: Scalars['ID'], seedMapping: (UpdatePhaseSeedInfo | null)[], options?: (UpdatePhaseSeedingOptions | null) }, PhaseRequest]
    /** Create or update a Phase */
    upsertPhase?: [{ phaseId?: (Scalars['ID'] | null), eventId?: (Scalars['ID'] | null), payload: PhaseUpsertInput }, PhaseRequest]
    /** Add or update a station by id */
    upsertStation?: [{ stationId?: (Scalars['ID'] | null), tournamentId?: (Scalars['ID'] | null), fields: StationUpsertInput }, StationsRequest]
    /** Add or update a wave by id */
    upsertWave?: [{ waveId?: (Scalars['ID'] | null), tournamentId?: (Scalars['ID'] | null), fields: WaveUpsertInput }, WaveRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ResolveConflictsOptions { lockedSeeds?: ((ResolveConflictsLockedSeedConfig | null)[] | null) }

export interface ResolveConflictsLockedSeedConfig { eventId: Scalars['ID'], numSeeds: Scalars['Int'] }

export interface PhaseGroupUpdateInput { phaseGroupId: Scalars['ID'], stationId?: (Scalars['ID'] | null), waveId?: (Scalars['ID'] | null) }

export interface UpdatePhaseSeedInfo { seedId: Scalars['ID'], seedNum: Scalars['ID'], phaseGroupId?: (Scalars['ID'] | null) }

export interface UpdatePhaseSeedingOptions {
    /** Validate that seedMapping exactly accounts for all entrants in the phase */
    strictMode?: (Scalars['Boolean'] | null)
}

export interface PhaseUpsertInput {
    /** The name of the Phase. For example, "Top 8" or "Pools" */
    name?: (Scalars['String'] | null),
    /** The number of pools to configure for the Phase. Only applies to brackets that support pools */
    groupCount?: (Scalars['Int'] | null), bracketType?: (BracketType | null)
}

export interface StationUpsertInput { number: Scalars['Int'], clusterId?: (Scalars['ID'] | null) }

export interface WaveUpsertInput { identifier: Scalars['String'], startAt: Scalars['Timestamp'], endAt: Scalars['Timestamp'] }


/** A set of actions available for an entity to take */
export interface ActionSetRequest {
    id?: boolean | number
    on_TeamActionSet?: TeamActionSetRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Bracket-specific configuration */
export interface BracketConfigRequest {
    id?: boolean | number
    bracketType?: boolean | number
    on_RaceBracketConfig?: RaceBracketConfigRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** An event-level Team, in the context of some competition */
export interface EventTeamRequest {
    id?: boolean | number
    /** Uniquely identifying token for team. Same as the hashed part of the slug */
    discriminator?: boolean | number
    /** @deprecated Use the entrant field off the EventTeam type */
    entrant?: EntrantRequest
    /** @deprecated Use the event field off the EventTeam type */
    event?: EventRequest
    globalTeam?: GlobalTeamRequest
    images?: [{ type?: (Scalars['String'] | null) }, ImageRequest] | ImageRequest
    members?: [{ status?: ((TeamMemberStatus | null)[] | null) }, TeamMemberRequest] | TeamMemberRequest
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Global Team */
export interface GlobalTeamRequest {
    id?: boolean | number
    /** Uniquely identifying token for team. Same as the hashed part of the slug */
    discriminator?: boolean | number
    /** @deprecated Use the entrant field off the EventTeam type */
    entrant?: EntrantRequest
    /** @deprecated Use the event field off the EventTeam type */
    event?: EventRequest
    eventTeams?: [{ query?: (TeamPaginationQuery | null) }, EventTeamConnectionRequest] | EventTeamConnectionRequest
    images?: [{ type?: (Scalars['String'] | null) }, ImageRequest] | ImageRequest
    /** Leagues-level teams for leagues this team is competing in */
    leagueTeams?: [{ query?: (TeamPaginationQuery | null) }, EventTeamConnectionRequest] | EventTeamConnectionRequest
    members?: [{ status?: ((TeamMemberStatus | null)[] | null) }, TeamMemberRequest] | TeamMemberRequest
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EventTeamConnectionRequest {
    pageInfo?: PageInfoRequest
    nodes?: EventTeamRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Match-level configuration */
export interface MatchConfigRequest {
    id?: boolean | number
    bracketType?: boolean | number
    on_RaceMatchConfig?: RaceMatchConfigRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Race specific bracket configuration */
export interface RaceBracketConfigRequest {
    automaticEndTime?: boolean | number
    id?: boolean | number
    automaticStartTime?: boolean | number
    bracketType?: boolean | number
    goalTargetComparator?: boolean | number
    goalTargetValue?: boolean | number
    limitMode?: boolean | number
    limitValue?: boolean | number
    raceType?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** Race specific match configuration */
export interface RaceMatchConfigRequest {
    id?: boolean | number
    bracketType?: boolean | number
    /** Can players report results? */
    playerReportingEnabled?: boolean | number
    /** Accepted methods of verification that players can use */
    verificationMethods?: boolean | number
    /** Are players required to submit verification of their reported results? */
    verificationRequired?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A set of actions available for a team to take */
export interface TeamActionSetRequest {
    id?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
    return Query_possibleTypes.includes(obj.__typename)
}



const User_possibleTypes: string[] = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
    return User_possibleTypes.includes(obj.__typename)
}



const ProfileAuthorization_possibleTypes: string[] = ['ProfileAuthorization']
export const isProfileAuthorization = (obj?: { __typename?: any } | null): obj is ProfileAuthorization => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isProfileAuthorization"')
    return ProfileAuthorization_possibleTypes.includes(obj.__typename)
}



const Stream_possibleTypes: string[] = ['Stream']
export const isStream = (obj?: { __typename?: any } | null): obj is Stream => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isStream"')
    return Stream_possibleTypes.includes(obj.__typename)
}



const EventConnection_possibleTypes: string[] = ['EventConnection']
export const isEventConnection = (obj?: { __typename?: any } | null): obj is EventConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isEventConnection"')
    return EventConnection_possibleTypes.includes(obj.__typename)
}



const PageInfo_possibleTypes: string[] = ['PageInfo']
export const isPageInfo = (obj?: { __typename?: any } | null): obj is PageInfo => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isPageInfo"')
    return PageInfo_possibleTypes.includes(obj.__typename)
}



const Event_possibleTypes: string[] = ['Event']
export const isEvent = (obj?: { __typename?: any } | null): obj is Event => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isEvent"')
    return Event_possibleTypes.includes(obj.__typename)
}



const EntrantConnection_possibleTypes: string[] = ['EntrantConnection']
export const isEntrantConnection = (obj?: { __typename?: any } | null): obj is EntrantConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isEntrantConnection"')
    return EntrantConnection_possibleTypes.includes(obj.__typename)
}



const Entrant_possibleTypes: string[] = ['Entrant']
export const isEntrant = (obj?: { __typename?: any } | null): obj is Entrant => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isEntrant"')
    return Entrant_possibleTypes.includes(obj.__typename)
}



const SetConnection_possibleTypes: string[] = ['SetConnection']
export const isSetConnection = (obj?: { __typename?: any } | null): obj is SetConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isSetConnection"')
    return SetConnection_possibleTypes.includes(obj.__typename)
}



const Set_possibleTypes: string[] = ['Set']
export const isSet = (obj?: { __typename?: any } | null): obj is Set => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isSet"')
    return Set_possibleTypes.includes(obj.__typename)
}



const Game_possibleTypes: string[] = ['Game']
export const isGame = (obj?: { __typename?: any } | null): obj is Game => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isGame"')
    return Game_possibleTypes.includes(obj.__typename)
}



const Image_possibleTypes: string[] = ['Image']
export const isImage = (obj?: { __typename?: any } | null): obj is Image => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isImage"')
    return Image_possibleTypes.includes(obj.__typename)
}



const GameSelection_possibleTypes: string[] = ['GameSelection']
export const isGameSelection = (obj?: { __typename?: any } | null): obj is GameSelection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isGameSelection"')
    return GameSelection_possibleTypes.includes(obj.__typename)
}



const Participant_possibleTypes: string[] = ['Participant']
export const isParticipant = (obj?: { __typename?: any } | null): obj is Participant => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isParticipant"')
    return Participant_possibleTypes.includes(obj.__typename)
}



const ContactInfo_possibleTypes: string[] = ['ContactInfo']
export const isContactInfo = (obj?: { __typename?: any } | null): obj is ContactInfo => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isContactInfo"')
    return ContactInfo_possibleTypes.includes(obj.__typename)
}



const Player_possibleTypes: string[] = ['Player']
export const isPlayer = (obj?: { __typename?: any } | null): obj is Player => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isPlayer"')
    return Player_possibleTypes.includes(obj.__typename)
}



const PlayerRank_possibleTypes: string[] = ['PlayerRank']
export const isPlayerRank = (obj?: { __typename?: any } | null): obj is PlayerRank => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isPlayerRank"')
    return PlayerRank_possibleTypes.includes(obj.__typename)
}



const Stage_possibleTypes: string[] = ['Stage']
export const isStage = (obj?: { __typename?: any } | null): obj is Stage => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isStage"')
    return Stage_possibleTypes.includes(obj.__typename)
}



const PhaseGroup_possibleTypes: string[] = ['PhaseGroup']
export const isPhaseGroup = (obj?: { __typename?: any } | null): obj is PhaseGroup => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isPhaseGroup"')
    return PhaseGroup_possibleTypes.includes(obj.__typename)
}



const SeedConnection_possibleTypes: string[] = ['SeedConnection']
export const isSeedConnection = (obj?: { __typename?: any } | null): obj is SeedConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isSeedConnection"')
    return SeedConnection_possibleTypes.includes(obj.__typename)
}



const Seed_possibleTypes: string[] = ['Seed']
export const isSeed = (obj?: { __typename?: any } | null): obj is Seed => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isSeed"')
    return Seed_possibleTypes.includes(obj.__typename)
}



const Phase_possibleTypes: string[] = ['Phase']
export const isPhase = (obj?: { __typename?: any } | null): obj is Phase => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isPhase"')
    return Phase_possibleTypes.includes(obj.__typename)
}



const PhaseGroupConnection_possibleTypes: string[] = ['PhaseGroupConnection']
export const isPhaseGroupConnection = (obj?: { __typename?: any } | null): obj is PhaseGroupConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isPhaseGroupConnection"')
    return PhaseGroupConnection_possibleTypes.includes(obj.__typename)
}



const Wave_possibleTypes: string[] = ['Wave']
export const isWave = (obj?: { __typename?: any } | null): obj is Wave => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isWave"')
    return Wave_possibleTypes.includes(obj.__typename)
}



const Progression_possibleTypes: string[] = ['Progression']
export const isProgression = (obj?: { __typename?: any } | null): obj is Progression => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isProgression"')
    return Progression_possibleTypes.includes(obj.__typename)
}



const Standing_possibleTypes: string[] = ['Standing']
export const isStanding = (obj?: { __typename?: any } | null): obj is Standing => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isStanding"')
    return Standing_possibleTypes.includes(obj.__typename)
}



const StandingContainer_possibleTypes: string[] = ['Tournament', 'Event', 'PhaseGroup', 'Set']
export const isStandingContainer = (obj?: { __typename?: any } | null): obj is StandingContainer => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isStandingContainer"')
    return StandingContainer_possibleTypes.includes(obj.__typename)
}



const Tournament_possibleTypes: string[] = ['Tournament']
export const isTournament = (obj?: { __typename?: any } | null): obj is Tournament => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isTournament"')
    return Tournament_possibleTypes.includes(obj.__typename)
}



const TournamentLinks_possibleTypes: string[] = ['TournamentLinks']
export const isTournamentLinks = (obj?: { __typename?: any } | null): obj is TournamentLinks => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isTournamentLinks"')
    return TournamentLinks_possibleTypes.includes(obj.__typename)
}



const ParticipantConnection_possibleTypes: string[] = ['ParticipantConnection']
export const isParticipantConnection = (obj?: { __typename?: any } | null): obj is ParticipantConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isParticipantConnection"')
    return ParticipantConnection_possibleTypes.includes(obj.__typename)
}



const StationsConnection_possibleTypes: string[] = ['StationsConnection']
export const isStationsConnection = (obj?: { __typename?: any } | null): obj is StationsConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isStationsConnection"')
    return StationsConnection_possibleTypes.includes(obj.__typename)
}



const Stations_possibleTypes: string[] = ['Stations']
export const isStations = (obj?: { __typename?: any } | null): obj is Stations => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isStations"')
    return Stations_possibleTypes.includes(obj.__typename)
}



const StreamQueue_possibleTypes: string[] = ['StreamQueue']
export const isStreamQueue = (obj?: { __typename?: any } | null): obj is StreamQueue => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isStreamQueue"')
    return StreamQueue_possibleTypes.includes(obj.__typename)
}



const Streams_possibleTypes: string[] = ['Streams']
export const isStreams = (obj?: { __typename?: any } | null): obj is Streams => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isStreams"')
    return Streams_possibleTypes.includes(obj.__typename)
}



const TeamConnection_possibleTypes: string[] = ['TeamConnection']
export const isTeamConnection = (obj?: { __typename?: any } | null): obj is TeamConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isTeamConnection"')
    return TeamConnection_possibleTypes.includes(obj.__typename)
}



const Team_possibleTypes: string[] = ['EventTeam', 'GlobalTeam']
export const isTeam = (obj?: { __typename?: any } | null): obj is Team => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isTeam"')
    return Team_possibleTypes.includes(obj.__typename)
}



const TeamMember_possibleTypes: string[] = ['TeamMember']
export const isTeamMember = (obj?: { __typename?: any } | null): obj is TeamMember => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isTeamMember"')
    return TeamMember_possibleTypes.includes(obj.__typename)
}



const StandingStats_possibleTypes: string[] = ['StandingStats']
export const isStandingStats = (obj?: { __typename?: any } | null): obj is StandingStats => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isStandingStats"')
    return StandingStats_possibleTypes.includes(obj.__typename)
}



const Score_possibleTypes: string[] = ['Score']
export const isScore = (obj?: { __typename?: any } | null): obj is Score => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isScore"')
    return Score_possibleTypes.includes(obj.__typename)
}



const Round_possibleTypes: string[] = ['Round']
export const isRound = (obj?: { __typename?: any } | null): obj is Round => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isRound"')
    return Round_possibleTypes.includes(obj.__typename)
}



const StandingConnection_possibleTypes: string[] = ['StandingConnection']
export const isStandingConnection = (obj?: { __typename?: any } | null): obj is StandingConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isStandingConnection"')
    return StandingConnection_possibleTypes.includes(obj.__typename)
}



const SetSlot_possibleTypes: string[] = ['SetSlot']
export const isSetSlot = (obj?: { __typename?: any } | null): obj is SetSlot => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isSetSlot"')
    return SetSlot_possibleTypes.includes(obj.__typename)
}



const League_possibleTypes: string[] = ['League']
export const isLeague = (obj?: { __typename?: any } | null): obj is League => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isLeague"')
    return League_possibleTypes.includes(obj.__typename)
}



const EventOwnerConnection_possibleTypes: string[] = ['EventOwnerConnection']
export const isEventOwnerConnection = (obj?: { __typename?: any } | null): obj is EventOwnerConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isEventOwnerConnection"')
    return EventOwnerConnection_possibleTypes.includes(obj.__typename)
}



const EventOwner_possibleTypes: string[] = ['EventOwner']
export const isEventOwner = (obj?: { __typename?: any } | null): obj is EventOwner => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isEventOwner"')
    return EventOwner_possibleTypes.includes(obj.__typename)
}



const EventTier_possibleTypes: string[] = ['EventTier']
export const isEventTier = (obj?: { __typename?: any } | null): obj is EventTier => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isEventTier"')
    return EventTier_possibleTypes.includes(obj.__typename)
}



const Videogame_possibleTypes: string[] = ['Videogame']
export const isVideogame = (obj?: { __typename?: any } | null): obj is Videogame => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isVideogame"')
    return Videogame_possibleTypes.includes(obj.__typename)
}



const Character_possibleTypes: string[] = ['Character']
export const isCharacter = (obj?: { __typename?: any } | null): obj is Character => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isCharacter"')
    return Character_possibleTypes.includes(obj.__typename)
}



const TeamRosterSize_possibleTypes: string[] = ['TeamRosterSize']
export const isTeamRosterSize = (obj?: { __typename?: any } | null): obj is TeamRosterSize => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isTeamRosterSize"')
    return TeamRosterSize_possibleTypes.includes(obj.__typename)
}



const LeagueConnection_possibleTypes: string[] = ['LeagueConnection']
export const isLeagueConnection = (obj?: { __typename?: any } | null): obj is LeagueConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isLeagueConnection"')
    return LeagueConnection_possibleTypes.includes(obj.__typename)
}



const Address_possibleTypes: string[] = ['Address']
export const isAddress = (obj?: { __typename?: any } | null): obj is Address => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isAddress"')
    return Address_possibleTypes.includes(obj.__typename)
}



const TournamentConnection_possibleTypes: string[] = ['TournamentConnection']
export const isTournamentConnection = (obj?: { __typename?: any } | null): obj is TournamentConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isTournamentConnection"')
    return TournamentConnection_possibleTypes.includes(obj.__typename)
}



const Shop_possibleTypes: string[] = ['Shop']
export const isShop = (obj?: { __typename?: any } | null): obj is Shop => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isShop"')
    return Shop_possibleTypes.includes(obj.__typename)
}



const ShopLevelConnection_possibleTypes: string[] = ['ShopLevelConnection']
export const isShopLevelConnection = (obj?: { __typename?: any } | null): obj is ShopLevelConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isShopLevelConnection"')
    return ShopLevelConnection_possibleTypes.includes(obj.__typename)
}



const ShopLevel_possibleTypes: string[] = ['ShopLevel']
export const isShopLevel = (obj?: { __typename?: any } | null): obj is ShopLevel => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isShopLevel"')
    return ShopLevel_possibleTypes.includes(obj.__typename)
}



const ShopOrderMessageConnection_possibleTypes: string[] = ['ShopOrderMessageConnection']
export const isShopOrderMessageConnection = (obj?: { __typename?: any } | null): obj is ShopOrderMessageConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isShopOrderMessageConnection"')
    return ShopOrderMessageConnection_possibleTypes.includes(obj.__typename)
}



const ShopOrderMessage_possibleTypes: string[] = ['ShopOrderMessage']
export const isShopOrderMessage = (obj?: { __typename?: any } | null): obj is ShopOrderMessage => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isShopOrderMessage"')
    return ShopOrderMessage_possibleTypes.includes(obj.__typename)
}



const VideogameConnection_possibleTypes: string[] = ['VideogameConnection']
export const isVideogameConnection = (obj?: { __typename?: any } | null): obj is VideogameConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isVideogameConnection"')
    return VideogameConnection_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
    return Mutation_possibleTypes.includes(obj.__typename)
}



const ActionSet_possibleTypes: string[] = ['TeamActionSet']
export const isActionSet = (obj?: { __typename?: any } | null): obj is ActionSet => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isActionSet"')
    return ActionSet_possibleTypes.includes(obj.__typename)
}



const BracketConfig_possibleTypes: string[] = ['RaceBracketConfig']
export const isBracketConfig = (obj?: { __typename?: any } | null): obj is BracketConfig => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isBracketConfig"')
    return BracketConfig_possibleTypes.includes(obj.__typename)
}



const EventTeam_possibleTypes: string[] = ['EventTeam']
export const isEventTeam = (obj?: { __typename?: any } | null): obj is EventTeam => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isEventTeam"')
    return EventTeam_possibleTypes.includes(obj.__typename)
}



const GlobalTeam_possibleTypes: string[] = ['GlobalTeam']
export const isGlobalTeam = (obj?: { __typename?: any } | null): obj is GlobalTeam => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isGlobalTeam"')
    return GlobalTeam_possibleTypes.includes(obj.__typename)
}



const EventTeamConnection_possibleTypes: string[] = ['EventTeamConnection']
export const isEventTeamConnection = (obj?: { __typename?: any } | null): obj is EventTeamConnection => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isEventTeamConnection"')
    return EventTeamConnection_possibleTypes.includes(obj.__typename)
}



const MatchConfig_possibleTypes: string[] = ['RaceMatchConfig']
export const isMatchConfig = (obj?: { __typename?: any } | null): obj is MatchConfig => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isMatchConfig"')
    return MatchConfig_possibleTypes.includes(obj.__typename)
}



const RaceBracketConfig_possibleTypes: string[] = ['RaceBracketConfig']
export const isRaceBracketConfig = (obj?: { __typename?: any } | null): obj is RaceBracketConfig => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isRaceBracketConfig"')
    return RaceBracketConfig_possibleTypes.includes(obj.__typename)
}



const RaceMatchConfig_possibleTypes: string[] = ['RaceMatchConfig']
export const isRaceMatchConfig = (obj?: { __typename?: any } | null): obj is RaceMatchConfig => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isRaceMatchConfig"')
    return RaceMatchConfig_possibleTypes.includes(obj.__typename)
}



const TeamActionSet_possibleTypes: string[] = ['TeamActionSet']
export const isTeamActionSet = (obj?: { __typename?: any } | null): obj is TeamActionSet => {
    if (!obj?.__typename) throw new Error('__typename is missing in "isTeamActionSet"')
    return TeamActionSet_possibleTypes.includes(obj.__typename)
}


export interface QueryPromiseChain {

    /** Returns the authenticated user */
    currentUser: (UserPromiseChain & { get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)> }),

    /** Returns an entrant given its id */
    entrant: ((args: { id: Scalars['ID'] }) => EntrantPromiseChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Promise<(FieldsSelection<Entrant, R> | undefined)> }),

    /** Returns an event given its id or slug */
    event: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }) => EventPromiseChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Promise<(FieldsSelection<Event, R> | undefined)> }) & (EventPromiseChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Promise<(FieldsSelection<Event, R> | undefined)> }),

    /** Returns a league given its id or slug */
    league: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }) => LeaguePromiseChain & { get: <R extends LeagueRequest>(request: R, defaultValue?: (FieldsSelection<League, R> | undefined)) => Promise<(FieldsSelection<League, R> | undefined)> }) & (LeaguePromiseChain & { get: <R extends LeagueRequest>(request: R, defaultValue?: (FieldsSelection<League, R> | undefined)) => Promise<(FieldsSelection<League, R> | undefined)> }),

    /** Returns a participant given its id */
    participant: ((args: { id: Scalars['ID'], isAdmin?: (Scalars['Boolean'] | null) }) => ParticipantPromiseChain & { get: <R extends ParticipantRequest>(request: R, defaultValue?: (FieldsSelection<Participant, R> | undefined)) => Promise<(FieldsSelection<Participant, R> | undefined)> }),

    /** Returns a phase given its id */
    phase: ((args?: { id?: (Scalars['ID'] | null) }) => PhasePromiseChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Promise<(FieldsSelection<Phase, R> | undefined)> }) & (PhasePromiseChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Promise<(FieldsSelection<Phase, R> | undefined)> }),

    /** Returns a phase group given its id */
    phaseGroup: ((args?: { id?: (Scalars['ID'] | null) }) => PhaseGroupPromiseChain & { get: <R extends PhaseGroupRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroup, R> | undefined)) => Promise<(FieldsSelection<PhaseGroup, R> | undefined)> }) & (PhaseGroupPromiseChain & { get: <R extends PhaseGroupRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroup, R> | undefined)) => Promise<(FieldsSelection<PhaseGroup, R> | undefined)> }),

    /** Returns a player given an id */
    player: ((args: { id: Scalars['ID'] }) => PlayerPromiseChain & { get: <R extends PlayerRequest>(request: R, defaultValue?: (FieldsSelection<Player, R> | undefined)) => Promise<(FieldsSelection<Player, R> | undefined)> }),

    /** Returns a phase seed given its id */
    seed: ((args?: { id?: (Scalars['ID'] | null) }) => SeedPromiseChain & { get: <R extends SeedRequest>(request: R, defaultValue?: (FieldsSelection<Seed, R> | undefined)) => Promise<(FieldsSelection<Seed, R> | undefined)> }) & (SeedPromiseChain & { get: <R extends SeedRequest>(request: R, defaultValue?: (FieldsSelection<Seed, R> | undefined)) => Promise<(FieldsSelection<Seed, R> | undefined)> }),

    /** Returns a set given its id */
    set: ((args: { id: Scalars['ID'] }) => SetPromiseChain & { get: <R extends SetRequest>(request: R, defaultValue?: (FieldsSelection<Set, R> | undefined)) => Promise<(FieldsSelection<Set, R> | undefined)> }),

    /** A shop entity */
    shop: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }) => ShopPromiseChain & { get: <R extends ShopRequest>(request: R, defaultValue?: (FieldsSelection<Shop, R> | undefined)) => Promise<(FieldsSelection<Shop, R> | undefined)> }) & (ShopPromiseChain & { get: <R extends ShopRequest>(request: R, defaultValue?: (FieldsSelection<Shop, R> | undefined)) => Promise<(FieldsSelection<Shop, R> | undefined)> }),

    /** Returns an stream given its id */
    stream: ((args: { id: Scalars['ID'] }) => StreamsPromiseChain & { get: <R extends StreamsRequest>(request: R, defaultValue?: (FieldsSelection<Streams, R> | undefined)) => Promise<(FieldsSelection<Streams, R> | undefined)> }),

    /** Returns all the stream queues for a given tournament */
    streamQueue: ((args: { tournamentId: Scalars['ID'], includePlayerStreams?: (Scalars['Boolean'] | null) }) => { get: <R extends StreamQueueRequest>(request: R, defaultValue?: ((FieldsSelection<StreamQueue, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<StreamQueue, R> | undefined)[] | undefined)> }),

    /** Returns a team given its id */
    team: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null), inviteCode?: (Scalars['String'] | null) }) => TeamPromiseChain & { get: <R extends TeamRequest>(request: R, defaultValue?: (FieldsSelection<Team, R> | undefined)) => Promise<(FieldsSelection<Team, R> | undefined)> }) & (TeamPromiseChain & { get: <R extends TeamRequest>(request: R, defaultValue?: (FieldsSelection<Team, R> | undefined)) => Promise<(FieldsSelection<Team, R> | undefined)> }),

    /** Returns a tournament given its id or slug */
    tournament: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }) => TournamentPromiseChain & { get: <R extends TournamentRequest>(request: R, defaultValue?: (FieldsSelection<Tournament, R> | undefined)) => Promise<(FieldsSelection<Tournament, R> | undefined)> }) & (TournamentPromiseChain & { get: <R extends TournamentRequest>(request: R, defaultValue?: (FieldsSelection<Tournament, R> | undefined)) => Promise<(FieldsSelection<Tournament, R> | undefined)> }),

    /** Paginated, filterable list of tournaments */
    tournaments: ((args: { query: TournamentQuery }) => TournamentConnectionPromiseChain & { get: <R extends TournamentConnectionRequest>(request: R, defaultValue?: (FieldsSelection<TournamentConnection, R> | undefined)) => Promise<(FieldsSelection<TournamentConnection, R> | undefined)> }),

    /** Returns a user given a user slug of the form user/abc123, or id */
    user: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }) => UserPromiseChain & { get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)> }) & (UserPromiseChain & { get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)> }),

    /** Returns a videogame given its id */
    videogame: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }) => VideogamePromiseChain & { get: <R extends VideogameRequest>(request: R, defaultValue?: (FieldsSelection<Videogame, R> | undefined)) => Promise<(FieldsSelection<Videogame, R> | undefined)> }) & (VideogamePromiseChain & { get: <R extends VideogameRequest>(request: R, defaultValue?: (FieldsSelection<Videogame, R> | undefined)) => Promise<(FieldsSelection<Videogame, R> | undefined)> }),

    /** Returns paginated list of videogames matching the search criteria. */
    videogames: ((args: { query: VideogameQuery }) => VideogameConnectionPromiseChain & { get: <R extends VideogameConnectionRequest>(request: R, defaultValue?: (FieldsSelection<VideogameConnection, R> | undefined)) => Promise<(FieldsSelection<VideogameConnection, R> | undefined)> })
}

export interface QueryObservableChain {

    /** Returns the authenticated user */
    currentUser: (UserObservableChain & { get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)> }),

    /** Returns an entrant given its id */
    entrant: ((args: { id: Scalars['ID'] }) => EntrantObservableChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Observable<(FieldsSelection<Entrant, R> | undefined)> }),

    /** Returns an event given its id or slug */
    event: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }) => EventObservableChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Observable<(FieldsSelection<Event, R> | undefined)> }) & (EventObservableChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Observable<(FieldsSelection<Event, R> | undefined)> }),

    /** Returns a league given its id or slug */
    league: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }) => LeagueObservableChain & { get: <R extends LeagueRequest>(request: R, defaultValue?: (FieldsSelection<League, R> | undefined)) => Observable<(FieldsSelection<League, R> | undefined)> }) & (LeagueObservableChain & { get: <R extends LeagueRequest>(request: R, defaultValue?: (FieldsSelection<League, R> | undefined)) => Observable<(FieldsSelection<League, R> | undefined)> }),

    /** Returns a participant given its id */
    participant: ((args: { id: Scalars['ID'], isAdmin?: (Scalars['Boolean'] | null) }) => ParticipantObservableChain & { get: <R extends ParticipantRequest>(request: R, defaultValue?: (FieldsSelection<Participant, R> | undefined)) => Observable<(FieldsSelection<Participant, R> | undefined)> }),

    /** Returns a phase given its id */
    phase: ((args?: { id?: (Scalars['ID'] | null) }) => PhaseObservableChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Observable<(FieldsSelection<Phase, R> | undefined)> }) & (PhaseObservableChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Observable<(FieldsSelection<Phase, R> | undefined)> }),

    /** Returns a phase group given its id */
    phaseGroup: ((args?: { id?: (Scalars['ID'] | null) }) => PhaseGroupObservableChain & { get: <R extends PhaseGroupRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroup, R> | undefined)) => Observable<(FieldsSelection<PhaseGroup, R> | undefined)> }) & (PhaseGroupObservableChain & { get: <R extends PhaseGroupRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroup, R> | undefined)) => Observable<(FieldsSelection<PhaseGroup, R> | undefined)> }),

    /** Returns a player given an id */
    player: ((args: { id: Scalars['ID'] }) => PlayerObservableChain & { get: <R extends PlayerRequest>(request: R, defaultValue?: (FieldsSelection<Player, R> | undefined)) => Observable<(FieldsSelection<Player, R> | undefined)> }),

    /** Returns a phase seed given its id */
    seed: ((args?: { id?: (Scalars['ID'] | null) }) => SeedObservableChain & { get: <R extends SeedRequest>(request: R, defaultValue?: (FieldsSelection<Seed, R> | undefined)) => Observable<(FieldsSelection<Seed, R> | undefined)> }) & (SeedObservableChain & { get: <R extends SeedRequest>(request: R, defaultValue?: (FieldsSelection<Seed, R> | undefined)) => Observable<(FieldsSelection<Seed, R> | undefined)> }),

    /** Returns a set given its id */
    set: ((args: { id: Scalars['ID'] }) => SetObservableChain & { get: <R extends SetRequest>(request: R, defaultValue?: (FieldsSelection<Set, R> | undefined)) => Observable<(FieldsSelection<Set, R> | undefined)> }),

    /** A shop entity */
    shop: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }) => ShopObservableChain & { get: <R extends ShopRequest>(request: R, defaultValue?: (FieldsSelection<Shop, R> | undefined)) => Observable<(FieldsSelection<Shop, R> | undefined)> }) & (ShopObservableChain & { get: <R extends ShopRequest>(request: R, defaultValue?: (FieldsSelection<Shop, R> | undefined)) => Observable<(FieldsSelection<Shop, R> | undefined)> }),

    /** Returns an stream given its id */
    stream: ((args: { id: Scalars['ID'] }) => StreamsObservableChain & { get: <R extends StreamsRequest>(request: R, defaultValue?: (FieldsSelection<Streams, R> | undefined)) => Observable<(FieldsSelection<Streams, R> | undefined)> }),

    /** Returns all the stream queues for a given tournament */
    streamQueue: ((args: { tournamentId: Scalars['ID'], includePlayerStreams?: (Scalars['Boolean'] | null) }) => { get: <R extends StreamQueueRequest>(request: R, defaultValue?: ((FieldsSelection<StreamQueue, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<StreamQueue, R> | undefined)[] | undefined)> }),

    /** Returns a team given its id */
    team: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null), inviteCode?: (Scalars['String'] | null) }) => TeamObservableChain & { get: <R extends TeamRequest>(request: R, defaultValue?: (FieldsSelection<Team, R> | undefined)) => Observable<(FieldsSelection<Team, R> | undefined)> }) & (TeamObservableChain & { get: <R extends TeamRequest>(request: R, defaultValue?: (FieldsSelection<Team, R> | undefined)) => Observable<(FieldsSelection<Team, R> | undefined)> }),

    /** Returns a tournament given its id or slug */
    tournament: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }) => TournamentObservableChain & { get: <R extends TournamentRequest>(request: R, defaultValue?: (FieldsSelection<Tournament, R> | undefined)) => Observable<(FieldsSelection<Tournament, R> | undefined)> }) & (TournamentObservableChain & { get: <R extends TournamentRequest>(request: R, defaultValue?: (FieldsSelection<Tournament, R> | undefined)) => Observable<(FieldsSelection<Tournament, R> | undefined)> }),

    /** Paginated, filterable list of tournaments */
    tournaments: ((args: { query: TournamentQuery }) => TournamentConnectionObservableChain & { get: <R extends TournamentConnectionRequest>(request: R, defaultValue?: (FieldsSelection<TournamentConnection, R> | undefined)) => Observable<(FieldsSelection<TournamentConnection, R> | undefined)> }),

    /** Returns a user given a user slug of the form user/abc123, or id */
    user: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }) => UserObservableChain & { get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)> }) & (UserObservableChain & { get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)> }),

    /** Returns a videogame given its id */
    videogame: ((args?: { id?: (Scalars['ID'] | null), slug?: (Scalars['String'] | null) }) => VideogameObservableChain & { get: <R extends VideogameRequest>(request: R, defaultValue?: (FieldsSelection<Videogame, R> | undefined)) => Observable<(FieldsSelection<Videogame, R> | undefined)> }) & (VideogameObservableChain & { get: <R extends VideogameRequest>(request: R, defaultValue?: (FieldsSelection<Videogame, R> | undefined)) => Observable<(FieldsSelection<Videogame, R> | undefined)> }),

    /** Returns paginated list of videogames matching the search criteria. */
    videogames: ((args: { query: VideogameQuery }) => VideogameConnectionObservableChain & { get: <R extends VideogameConnectionRequest>(request: R, defaultValue?: (FieldsSelection<VideogameConnection, R> | undefined)) => Observable<(FieldsSelection<VideogameConnection, R> | undefined)> })
}


/** A user */
export interface UserPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** Authorizations to external services (i.e. Twitch, Twitter) */
    authorizations: ((args?: { types?: ((SocialConnectionType | null)[] | null) }) => { get: <R extends ProfileAuthorizationRequest>(request: R, defaultValue?: ((FieldsSelection<ProfileAuthorization, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<ProfileAuthorization, R> | undefined)[] | undefined)> }) & ({ get: <R extends ProfileAuthorizationRequest>(request: R, defaultValue?: ((FieldsSelection<ProfileAuthorization, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<ProfileAuthorization, R> | undefined)[] | undefined)> }),
    bio: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Public facing user birthday that respects user publishing settings */
    birthday: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Uniquely identifying token for user. Same as the hashed part of the slug */
    discriminator: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Events this user has competed in */
    events: ((args?: { query?: (UserEventsPaginationQuery | null) }) => EventConnectionPromiseChain & { get: <R extends EventConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventConnection, R> | undefined)) => Promise<(FieldsSelection<EventConnection, R> | undefined)> }) & (EventConnectionPromiseChain & { get: <R extends EventConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventConnection, R> | undefined)) => Promise<(FieldsSelection<EventConnection, R> | undefined)> }),
    genderPronoun: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),

    /** Leagues this user has competed in */
    leagues: ((args?: { query?: (UserLeaguesPaginationQuery | null) }) => LeagueConnectionPromiseChain & { get: <R extends LeagueConnectionRequest>(request: R, defaultValue?: (FieldsSelection<LeagueConnection, R> | undefined)) => Promise<(FieldsSelection<LeagueConnection, R> | undefined)> }) & (LeagueConnectionPromiseChain & { get: <R extends LeagueConnectionRequest>(request: R, defaultValue?: (FieldsSelection<LeagueConnection, R> | undefined)) => Promise<(FieldsSelection<LeagueConnection, R> | undefined)> }),

    /** Public location info for this user */
    location: (AddressPromiseChain & { get: <R extends AddressRequest>(request: R, defaultValue?: (FieldsSelection<Address, R> | undefined)) => Promise<(FieldsSelection<Address, R> | undefined)> }),

    /** Public facing user name that respects user publishing settings */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** player for user */
    player: (PlayerPromiseChain & { get: <R extends PlayerRequest>(request: R, defaultValue?: (FieldsSelection<Player, R> | undefined)) => Promise<(FieldsSelection<Player, R> | undefined)> }),
    slug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Tournaments this user is organizing or competing in */
    tournaments: ((args?: { query?: (UserTournamentsPaginationQuery | null) }) => TournamentConnectionPromiseChain & { get: <R extends TournamentConnectionRequest>(request: R, defaultValue?: (FieldsSelection<TournamentConnection, R> | undefined)) => Promise<(FieldsSelection<TournamentConnection, R> | undefined)> }) & (TournamentConnectionPromiseChain & { get: <R extends TournamentConnectionRequest>(request: R, defaultValue?: (FieldsSelection<TournamentConnection, R> | undefined)) => Promise<(FieldsSelection<TournamentConnection, R> | undefined)> })
}


/** A user */
export interface UserObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** Authorizations to external services (i.e. Twitch, Twitter) */
    authorizations: ((args?: { types?: ((SocialConnectionType | null)[] | null) }) => { get: <R extends ProfileAuthorizationRequest>(request: R, defaultValue?: ((FieldsSelection<ProfileAuthorization, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<ProfileAuthorization, R> | undefined)[] | undefined)> }) & ({ get: <R extends ProfileAuthorizationRequest>(request: R, defaultValue?: ((FieldsSelection<ProfileAuthorization, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<ProfileAuthorization, R> | undefined)[] | undefined)> }),
    bio: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Public facing user birthday that respects user publishing settings */
    birthday: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Uniquely identifying token for user. Same as the hashed part of the slug */
    discriminator: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Events this user has competed in */
    events: ((args?: { query?: (UserEventsPaginationQuery | null) }) => EventConnectionObservableChain & { get: <R extends EventConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventConnection, R> | undefined)) => Observable<(FieldsSelection<EventConnection, R> | undefined)> }) & (EventConnectionObservableChain & { get: <R extends EventConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventConnection, R> | undefined)) => Observable<(FieldsSelection<EventConnection, R> | undefined)> }),
    genderPronoun: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),

    /** Leagues this user has competed in */
    leagues: ((args?: { query?: (UserLeaguesPaginationQuery | null) }) => LeagueConnectionObservableChain & { get: <R extends LeagueConnectionRequest>(request: R, defaultValue?: (FieldsSelection<LeagueConnection, R> | undefined)) => Observable<(FieldsSelection<LeagueConnection, R> | undefined)> }) & (LeagueConnectionObservableChain & { get: <R extends LeagueConnectionRequest>(request: R, defaultValue?: (FieldsSelection<LeagueConnection, R> | undefined)) => Observable<(FieldsSelection<LeagueConnection, R> | undefined)> }),

    /** Public location info for this user */
    location: (AddressObservableChain & { get: <R extends AddressRequest>(request: R, defaultValue?: (FieldsSelection<Address, R> | undefined)) => Observable<(FieldsSelection<Address, R> | undefined)> }),

    /** Public facing user name that respects user publishing settings */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** player for user */
    player: (PlayerObservableChain & { get: <R extends PlayerRequest>(request: R, defaultValue?: (FieldsSelection<Player, R> | undefined)) => Observable<(FieldsSelection<Player, R> | undefined)> }),
    slug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Tournaments this user is organizing or competing in */
    tournaments: ((args?: { query?: (UserTournamentsPaginationQuery | null) }) => TournamentConnectionObservableChain & { get: <R extends TournamentConnectionRequest>(request: R, defaultValue?: (FieldsSelection<TournamentConnection, R> | undefined)) => Observable<(FieldsSelection<TournamentConnection, R> | undefined)> }) & (TournamentConnectionObservableChain & { get: <R extends TournamentConnectionRequest>(request: R, defaultValue?: (FieldsSelection<TournamentConnection, R> | undefined)) => Observable<(FieldsSelection<TournamentConnection, R> | undefined)> })
}


/** An OAuth ProfileAuthorization object */
export interface ProfileAuthorizationPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** The id given by the external service */
    externalId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The username given by the external service (including discriminator if discord) */
    externalUsername: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    stream: (StreamPromiseChain & { get: <R extends StreamRequest>(request: R, defaultValue?: (FieldsSelection<Stream, R> | undefined)) => Promise<(FieldsSelection<Stream, R> | undefined)> }),

    /** The name of the external service providing this auth i.e. "twitch" */
    type: ({ get: (request?: boolean | number, defaultValue?: (AuthorizationType | undefined)) => Promise<(AuthorizationType | undefined)> }),
    url: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/** An OAuth ProfileAuthorization object */
export interface ProfileAuthorizationObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** The id given by the external service */
    externalId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The username given by the external service (including discriminator if discord) */
    externalUsername: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    stream: (StreamObservableChain & { get: <R extends StreamRequest>(request: R, defaultValue?: (FieldsSelection<Stream, R> | undefined)) => Observable<(FieldsSelection<Stream, R> | undefined)> }),

    /** The name of the external service providing this auth i.e. "twitch" */
    type: ({ get: (request?: boolean | number, defaultValue?: (AuthorizationType | undefined)) => Observable<(AuthorizationType | undefined)> }),
    url: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}


/** A Stream object */
export interface StreamPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** Whether the stream is currently live. May be slightly delayed. */
    isOnline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** The name of the stream */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The name of the external service providing this auth i.e. "twitch" */
    type: ({ get: (request?: boolean | number, defaultValue?: (StreamType | undefined)) => Promise<(StreamType | undefined)> })
}


/** A Stream object */
export interface StreamObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** Whether the stream is currently live. May be slightly delayed. */
    isOnline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** The name of the stream */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The name of the external service providing this auth i.e. "twitch" */
    type: ({ get: (request?: boolean | number, defaultValue?: (StreamType | undefined)) => Observable<(StreamType | undefined)> })
}

export interface EventConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends EventRequest>(request: R, defaultValue?: ((FieldsSelection<Event, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Event, R> | undefined)[] | undefined)> })
}

export interface EventConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends EventRequest>(request: R, defaultValue?: ((FieldsSelection<Event, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Event, R> | undefined)[] | undefined)> })
}

export interface PageInfoPromiseChain {
    total: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    totalPages: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    page: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    perPage: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    sortBy: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    filter: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Promise<(Scalars['JSON'] | undefined)> })
}

export interface PageInfoObservableChain {
    total: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    totalPages: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    page: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    perPage: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    sortBy: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    filter: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Observable<(Scalars['JSON'] | undefined)> })
}


/** An event in a tournament */
export interface EventPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** How long before the event start will the check-in end (in seconds) */
    checkInBuffer: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** How long the event check-in will last (in seconds) */
    checkInDuration: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** Whether check-in is enabled for this event */
    checkInEnabled: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** Rough categorization of event tier, denoting relative importance in the competitive scene */
    competitionTier: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** When the event was created (unix timestamp) */
    createdAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /** Last date attendees are able to create teams for team events */
    deckSubmissionDeadline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /**
     * @deprecated Migrate to teamRosterSize
     * Maximum number of participants each Entrant can have
     */
    entrantSizeMax: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /**
     * @deprecated Migrate to teamRosterSize
     * Minimum number of participants each Entrant can have
     */
    entrantSizeMin: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** The entrants that belong to an event, paginated by filter criteria */
    entrants: ((args?: { query?: (EventEntrantPageQuery | null) }) => EntrantConnectionPromiseChain & { get: <R extends EntrantConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EntrantConnection, R> | undefined)) => Promise<(FieldsSelection<EntrantConnection, R> | undefined)> }) & (EntrantConnectionPromiseChain & { get: <R extends EntrantConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EntrantConnection, R> | undefined)) => Promise<(FieldsSelection<EntrantConnection, R> | undefined)> }),

    /** Whether the event has decks */
    hasDecks: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** Are player tasks enabled for this event */
    hasTasks: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),

    /** Whether the event is an online event or not */
    isOnline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    league: (LeaguePromiseChain & { get: <R extends LeagueRequest>(request: R, defaultValue?: (FieldsSelection<League, R> | undefined)) => Promise<(FieldsSelection<League, R> | undefined)> }),

    /** Markdown field for match rules/instructions */
    matchRulesMarkdown: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Title of event set by organizer */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Gets the number of entrants in this event */
    numEntrants: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** The phase groups that belong to an event. */
    phaseGroups: ({ get: <R extends PhaseGroupRequest>(request: R, defaultValue?: ((FieldsSelection<PhaseGroup, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<PhaseGroup, R> | undefined)[] | undefined)> }),

    /** The phases that belong to an event. */
    phases: ((args?: {
        /** Filter phases by state. If not specified will default to all phases */
        state?: (ActivityState | null),
        /** Optionally only return results for this phase */
        phaseId?: (Scalars['ID'] | null)
    }) => { get: <R extends PhaseRequest>(request: R, defaultValue?: ((FieldsSelection<Phase, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Phase, R> | undefined)[] | undefined)> }) & ({ get: <R extends PhaseRequest>(request: R, defaultValue?: ((FieldsSelection<Phase, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Phase, R> | undefined)[] | undefined)> }),

    /** TO settings for prizing */
    prizingInfo: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Promise<(Scalars['JSON'] | undefined)> }),
    publishing: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Promise<(Scalars['JSON'] | undefined)> }),

    /** Markdown field for event rules/instructions */
    rulesMarkdown: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Id of the event ruleset */
    rulesetId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /**
     * @deprecated Use ruleset
     * Settings pulled from the event ruleset, if one exists
     */
    rulesetSettings: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Promise<(Scalars['JSON'] | undefined)> }),

    /** Paginated sets for this Event */
    sets: ((args?: {
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }) => SetConnectionPromiseChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Promise<(FieldsSelection<SetConnection, R> | undefined)> }) & (SetConnectionPromiseChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Promise<(FieldsSelection<SetConnection, R> | undefined)> }),
    slug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Paginated list of standings */
    standings: ((args: { query: StandingPaginationQuery }) => StandingConnectionPromiseChain & { get: <R extends StandingConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StandingConnection, R> | undefined)) => Promise<(FieldsSelection<StandingConnection, R> | undefined)> }),

    /** When does this event start? */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /** The state of the Event. */
    state: ({ get: (request?: boolean | number, defaultValue?: (ActivityState | undefined)) => Promise<(ActivityState | undefined)> }),

    /** Paginated stations on this event */
    stations: ((args?: { query?: (StationFilter | null) }) => StationsConnectionPromiseChain & { get: <R extends StationsConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StationsConnection, R> | undefined)) => Promise<(FieldsSelection<StationsConnection, R> | undefined)> }) & (StationsConnectionPromiseChain & { get: <R extends StationsConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StationsConnection, R> | undefined)) => Promise<(FieldsSelection<StationsConnection, R> | undefined)> }),

    /** Last date attendees are able to create teams for team events */
    teamManagementDeadline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /** If this is a teams event, returns whether or not teams can set custom names */
    teamNameAllowed: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** Team roster size requirements */
    teamRosterSize: (TeamRosterSizePromiseChain & { get: <R extends TeamRosterSizeRequest>(request: R, defaultValue?: (FieldsSelection<TeamRosterSize, R> | undefined)) => Promise<(FieldsSelection<TeamRosterSize, R> | undefined)> }),
    tournament: (TournamentPromiseChain & { get: <R extends TournamentRequest>(request: R, defaultValue?: (FieldsSelection<Tournament, R> | undefined)) => Promise<(FieldsSelection<Tournament, R> | undefined)> }),

    /** The type of the event, whether an entrant will have one participant or multiple */
    type: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** When the event was last modified (unix timestamp) */
    updatedAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /** Whether the event uses the new EventSeeds for seeding */
    useEventSeeds: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    videogame: (VideogamePromiseChain & { get: <R extends VideogameRequest>(request: R, defaultValue?: (FieldsSelection<Videogame, R> | undefined)) => Promise<(FieldsSelection<Videogame, R> | undefined)> }),

    /** The waves being used by the event */
    waves: ((args?: {
        /** Waves filtered by phaseId, returns all if not set. */
        phaseId?: (Scalars['ID'] | null)
    }) => { get: <R extends WaveRequest>(request: R, defaultValue?: ((FieldsSelection<Wave, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Wave, R> | undefined)[] | undefined)> }) & ({ get: <R extends WaveRequest>(request: R, defaultValue?: ((FieldsSelection<Wave, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Wave, R> | undefined)[] | undefined)> })
}


/** An event in a tournament */
export interface EventObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** How long before the event start will the check-in end (in seconds) */
    checkInBuffer: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** How long the event check-in will last (in seconds) */
    checkInDuration: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** Whether check-in is enabled for this event */
    checkInEnabled: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** Rough categorization of event tier, denoting relative importance in the competitive scene */
    competitionTier: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** When the event was created (unix timestamp) */
    createdAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /** Last date attendees are able to create teams for team events */
    deckSubmissionDeadline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /**
     * @deprecated Migrate to teamRosterSize
     * Maximum number of participants each Entrant can have
     */
    entrantSizeMax: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /**
     * @deprecated Migrate to teamRosterSize
     * Minimum number of participants each Entrant can have
     */
    entrantSizeMin: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** The entrants that belong to an event, paginated by filter criteria */
    entrants: ((args?: { query?: (EventEntrantPageQuery | null) }) => EntrantConnectionObservableChain & { get: <R extends EntrantConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EntrantConnection, R> | undefined)) => Observable<(FieldsSelection<EntrantConnection, R> | undefined)> }) & (EntrantConnectionObservableChain & { get: <R extends EntrantConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EntrantConnection, R> | undefined)) => Observable<(FieldsSelection<EntrantConnection, R> | undefined)> }),

    /** Whether the event has decks */
    hasDecks: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** Are player tasks enabled for this event */
    hasTasks: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),

    /** Whether the event is an online event or not */
    isOnline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    league: (LeagueObservableChain & { get: <R extends LeagueRequest>(request: R, defaultValue?: (FieldsSelection<League, R> | undefined)) => Observable<(FieldsSelection<League, R> | undefined)> }),

    /** Markdown field for match rules/instructions */
    matchRulesMarkdown: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Title of event set by organizer */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Gets the number of entrants in this event */
    numEntrants: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** The phase groups that belong to an event. */
    phaseGroups: ({ get: <R extends PhaseGroupRequest>(request: R, defaultValue?: ((FieldsSelection<PhaseGroup, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<PhaseGroup, R> | undefined)[] | undefined)> }),

    /** The phases that belong to an event. */
    phases: ((args?: {
        /** Filter phases by state. If not specified will default to all phases */
        state?: (ActivityState | null),
        /** Optionally only return results for this phase */
        phaseId?: (Scalars['ID'] | null)
    }) => { get: <R extends PhaseRequest>(request: R, defaultValue?: ((FieldsSelection<Phase, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Phase, R> | undefined)[] | undefined)> }) & ({ get: <R extends PhaseRequest>(request: R, defaultValue?: ((FieldsSelection<Phase, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Phase, R> | undefined)[] | undefined)> }),

    /** TO settings for prizing */
    prizingInfo: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Observable<(Scalars['JSON'] | undefined)> }),
    publishing: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Observable<(Scalars['JSON'] | undefined)> }),

    /** Markdown field for event rules/instructions */
    rulesMarkdown: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Id of the event ruleset */
    rulesetId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /**
     * @deprecated Use ruleset
     * Settings pulled from the event ruleset, if one exists
     */
    rulesetSettings: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Observable<(Scalars['JSON'] | undefined)> }),

    /** Paginated sets for this Event */
    sets: ((args?: {
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }) => SetConnectionObservableChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Observable<(FieldsSelection<SetConnection, R> | undefined)> }) & (SetConnectionObservableChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Observable<(FieldsSelection<SetConnection, R> | undefined)> }),
    slug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Paginated list of standings */
    standings: ((args: { query: StandingPaginationQuery }) => StandingConnectionObservableChain & { get: <R extends StandingConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StandingConnection, R> | undefined)) => Observable<(FieldsSelection<StandingConnection, R> | undefined)> }),

    /** When does this event start? */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /** The state of the Event. */
    state: ({ get: (request?: boolean | number, defaultValue?: (ActivityState | undefined)) => Observable<(ActivityState | undefined)> }),

    /** Paginated stations on this event */
    stations: ((args?: { query?: (StationFilter | null) }) => StationsConnectionObservableChain & { get: <R extends StationsConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StationsConnection, R> | undefined)) => Observable<(FieldsSelection<StationsConnection, R> | undefined)> }) & (StationsConnectionObservableChain & { get: <R extends StationsConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StationsConnection, R> | undefined)) => Observable<(FieldsSelection<StationsConnection, R> | undefined)> }),

    /** Last date attendees are able to create teams for team events */
    teamManagementDeadline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /** If this is a teams event, returns whether or not teams can set custom names */
    teamNameAllowed: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** Team roster size requirements */
    teamRosterSize: (TeamRosterSizeObservableChain & { get: <R extends TeamRosterSizeRequest>(request: R, defaultValue?: (FieldsSelection<TeamRosterSize, R> | undefined)) => Observable<(FieldsSelection<TeamRosterSize, R> | undefined)> }),
    tournament: (TournamentObservableChain & { get: <R extends TournamentRequest>(request: R, defaultValue?: (FieldsSelection<Tournament, R> | undefined)) => Observable<(FieldsSelection<Tournament, R> | undefined)> }),

    /** The type of the event, whether an entrant will have one participant or multiple */
    type: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** When the event was last modified (unix timestamp) */
    updatedAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /** Whether the event uses the new EventSeeds for seeding */
    useEventSeeds: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    videogame: (VideogameObservableChain & { get: <R extends VideogameRequest>(request: R, defaultValue?: (FieldsSelection<Videogame, R> | undefined)) => Observable<(FieldsSelection<Videogame, R> | undefined)> }),

    /** The waves being used by the event */
    waves: ((args?: {
        /** Waves filtered by phaseId, returns all if not set. */
        phaseId?: (Scalars['ID'] | null)
    }) => { get: <R extends WaveRequest>(request: R, defaultValue?: ((FieldsSelection<Wave, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Wave, R> | undefined)[] | undefined)> }) & ({ get: <R extends WaveRequest>(request: R, defaultValue?: ((FieldsSelection<Wave, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Wave, R> | undefined)[] | undefined)> })
}

export interface EntrantConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends EntrantRequest>(request: R, defaultValue?: ((FieldsSelection<Entrant, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Entrant, R> | undefined)[] | undefined)> })
}

export interface EntrantConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends EntrantRequest>(request: R, defaultValue?: ((FieldsSelection<Entrant, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Entrant, R> | undefined)[] | undefined)> })
}


/** An entrant in an event */
export interface EntrantPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    event: (EventPromiseChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Promise<(FieldsSelection<Event, R> | undefined)> }),

    /** Entrant's seed number in the first phase of the event. */
    initialSeedNum: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    isDisqualified: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** The entrant name as it appears in bracket: gamerTag of the participant or team name */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Paginated sets for this entrant */
    paginatedSets: ((args?: {
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }) => SetConnectionPromiseChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Promise<(FieldsSelection<SetConnection, R> | undefined)> }) & (SetConnectionPromiseChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Promise<(FieldsSelection<SetConnection, R> | undefined)> }),
    participants: ({ get: <R extends ParticipantRequest>(request: R, defaultValue?: ((FieldsSelection<Participant, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Participant, R> | undefined)[] | undefined)> }),
    seeds: ({ get: <R extends SeedRequest>(request: R, defaultValue?: ((FieldsSelection<Seed, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Seed, R> | undefined)[] | undefined)> }),
    skill: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** Standing for this entrant given an event. All entrants queried must be in the same event (for now). */
    standing: (StandingPromiseChain & { get: <R extends StandingRequest>(request: R, defaultValue?: (FieldsSelection<Standing, R> | undefined)) => Promise<(FieldsSelection<Standing, R> | undefined)> }),

    /** @deprecated DEPRECATED. Use streams instead, which supports multiple stream types and teams. */
    stream: (StreamsPromiseChain & { get: <R extends StreamsRequest>(request: R, defaultValue?: (FieldsSelection<Streams, R> | undefined)) => Promise<(FieldsSelection<Streams, R> | undefined)> }),
    streams: ({ get: <R extends StreamsRequest>(request: R, defaultValue?: ((FieldsSelection<Streams, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Streams, R> | undefined)[] | undefined)> }),

    /** Team linked to this entrant, if one exists */
    team: (TeamPromiseChain & { get: <R extends TeamRequest>(request: R, defaultValue?: (FieldsSelection<Team, R> | undefined)) => Promise<(FieldsSelection<Team, R> | undefined)> })
}


/** An entrant in an event */
export interface EntrantObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    event: (EventObservableChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Observable<(FieldsSelection<Event, R> | undefined)> }),

    /** Entrant's seed number in the first phase of the event. */
    initialSeedNum: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    isDisqualified: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** The entrant name as it appears in bracket: gamerTag of the participant or team name */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Paginated sets for this entrant */
    paginatedSets: ((args?: {
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }) => SetConnectionObservableChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Observable<(FieldsSelection<SetConnection, R> | undefined)> }) & (SetConnectionObservableChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Observable<(FieldsSelection<SetConnection, R> | undefined)> }),
    participants: ({ get: <R extends ParticipantRequest>(request: R, defaultValue?: ((FieldsSelection<Participant, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Participant, R> | undefined)[] | undefined)> }),
    seeds: ({ get: <R extends SeedRequest>(request: R, defaultValue?: ((FieldsSelection<Seed, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Seed, R> | undefined)[] | undefined)> }),
    skill: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** Standing for this entrant given an event. All entrants queried must be in the same event (for now). */
    standing: (StandingObservableChain & { get: <R extends StandingRequest>(request: R, defaultValue?: (FieldsSelection<Standing, R> | undefined)) => Observable<(FieldsSelection<Standing, R> | undefined)> }),

    /** @deprecated DEPRECATED. Use streams instead, which supports multiple stream types and teams. */
    stream: (StreamsObservableChain & { get: <R extends StreamsRequest>(request: R, defaultValue?: (FieldsSelection<Streams, R> | undefined)) => Observable<(FieldsSelection<Streams, R> | undefined)> }),
    streams: ({ get: <R extends StreamsRequest>(request: R, defaultValue?: ((FieldsSelection<Streams, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Streams, R> | undefined)[] | undefined)> }),

    /** Team linked to this entrant, if one exists */
    team: (TeamObservableChain & { get: <R extends TeamRequest>(request: R, defaultValue?: (FieldsSelection<Team, R> | undefined)) => Observable<(FieldsSelection<Team, R> | undefined)> })
}

export interface SetConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends SetRequest>(request: R, defaultValue?: ((FieldsSelection<Set, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Set, R> | undefined)[] | undefined)> })
}

export interface SetConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends SetRequest>(request: R, defaultValue?: ((FieldsSelection<Set, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Set, R> | undefined)[] | undefined)> })
}


/** A set */
export interface SetPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** The time this set was marked as completed */
    completedAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /** The time this set was created */
    createdAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    displayScore: ((args?: { mainEntrantId?: (Scalars['ID'] | null) }) => { get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }) & ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Event that this set belongs to. */
    event: (EventPromiseChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Promise<(FieldsSelection<Event, R> | undefined)> }),

    /** Full round text of this set. */
    fullRoundText: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    game: ((args: { orderNum: Scalars['Int'] }) => GamePromiseChain & { get: <R extends GameRequest>(request: R, defaultValue?: (FieldsSelection<Game, R> | undefined)) => Promise<(FieldsSelection<Game, R> | undefined)> }),
    games: ({ get: <R extends GameRequest>(request: R, defaultValue?: ((FieldsSelection<Game, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Game, R> | undefined)[] | undefined)> }),

    /** Whether this set contains a placeholder entrant */
    hasPlaceholder: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** The letters that describe a unique identifier within the pool. Eg. F, AT */
    identifier: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    lPlacement: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** Phase group that this Set belongs to. */
    phaseGroup: (PhaseGroupPromiseChain & { get: <R extends PhaseGroupRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroup, R> | undefined)) => Promise<(FieldsSelection<PhaseGroup, R> | undefined)> }),

    /** The round number of the set. Negative numbers are losers bracket */
    round: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /**
     * Indicates whether the set is in best of or total games mode. This instructs
     * which field is used to figure out how many games are in this set.
     */
    setGamesType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** A possible spot in a set. Use this to get all entrants in a set. Use this for all bracket types (FFA, elimination, etc) */
    slots: ((args?: { includeByes?: (Scalars['Boolean'] | null) }) => { get: <R extends SetSlotRequest>(request: R, defaultValue?: ((FieldsSelection<SetSlot, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<SetSlot, R> | undefined)[] | undefined)> }) & ({ get: <R extends SetSlotRequest>(request: R, defaultValue?: ((FieldsSelection<SetSlot, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<SetSlot, R> | undefined)[] | undefined)> }),

    /** The start time of the Set. If there is no startAt time on the Set, will pull it from phaseGroup rounds configuration. */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    startedAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** Tournament event station for a set */
    station: (StationsPromiseChain & { get: <R extends StationsRequest>(request: R, defaultValue?: (FieldsSelection<Stations, R> | undefined)) => Promise<(FieldsSelection<Stations, R> | undefined)> }),

    /** Tournament event stream for a set */
    stream: (StreamsPromiseChain & { get: <R extends StreamsRequest>(request: R, defaultValue?: (FieldsSelection<Streams, R> | undefined)) => Promise<(FieldsSelection<Streams, R> | undefined)> }),

    /** If setGamesType is in total games mode, this defined the number of games in the set. */
    totalGames: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** Url of a VOD for this set */
    vodUrl: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    wPlacement: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    winnerId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> })
}


/** A set */
export interface SetObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** The time this set was marked as completed */
    completedAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /** The time this set was created */
    createdAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    displayScore: ((args?: { mainEntrantId?: (Scalars['ID'] | null) }) => { get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }) & ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Event that this set belongs to. */
    event: (EventObservableChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Observable<(FieldsSelection<Event, R> | undefined)> }),

    /** Full round text of this set. */
    fullRoundText: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    game: ((args: { orderNum: Scalars['Int'] }) => GameObservableChain & { get: <R extends GameRequest>(request: R, defaultValue?: (FieldsSelection<Game, R> | undefined)) => Observable<(FieldsSelection<Game, R> | undefined)> }),
    games: ({ get: <R extends GameRequest>(request: R, defaultValue?: ((FieldsSelection<Game, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Game, R> | undefined)[] | undefined)> }),

    /** Whether this set contains a placeholder entrant */
    hasPlaceholder: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** The letters that describe a unique identifier within the pool. Eg. F, AT */
    identifier: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    lPlacement: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** Phase group that this Set belongs to. */
    phaseGroup: (PhaseGroupObservableChain & { get: <R extends PhaseGroupRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroup, R> | undefined)) => Observable<(FieldsSelection<PhaseGroup, R> | undefined)> }),

    /** The round number of the set. Negative numbers are losers bracket */
    round: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /**
     * Indicates whether the set is in best of or total games mode. This instructs
     * which field is used to figure out how many games are in this set.
     */
    setGamesType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** A possible spot in a set. Use this to get all entrants in a set. Use this for all bracket types (FFA, elimination, etc) */
    slots: ((args?: { includeByes?: (Scalars['Boolean'] | null) }) => { get: <R extends SetSlotRequest>(request: R, defaultValue?: ((FieldsSelection<SetSlot, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<SetSlot, R> | undefined)[] | undefined)> }) & ({ get: <R extends SetSlotRequest>(request: R, defaultValue?: ((FieldsSelection<SetSlot, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<SetSlot, R> | undefined)[] | undefined)> }),

    /** The start time of the Set. If there is no startAt time on the Set, will pull it from phaseGroup rounds configuration. */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    startedAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** Tournament event station for a set */
    station: (StationsObservableChain & { get: <R extends StationsRequest>(request: R, defaultValue?: (FieldsSelection<Stations, R> | undefined)) => Observable<(FieldsSelection<Stations, R> | undefined)> }),

    /** Tournament event stream for a set */
    stream: (StreamsObservableChain & { get: <R extends StreamsRequest>(request: R, defaultValue?: (FieldsSelection<Streams, R> | undefined)) => Observable<(FieldsSelection<Streams, R> | undefined)> }),

    /** If setGamesType is in total games mode, this defined the number of games in the set. */
    totalGames: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** Url of a VOD for this set */
    vodUrl: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    wPlacement: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    winnerId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> })
}


/** A game represents a single game within a set. */
export interface GamePromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    orderNum: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** Selections for this game such as character, etc. */
    selections: ({ get: <R extends GameSelectionRequest>(request: R, defaultValue?: ((FieldsSelection<GameSelection, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<GameSelection, R> | undefined)[] | undefined)> }),

    /** The stage that this game was played on (if applicable) */
    stage: (StagePromiseChain & { get: <R extends StageRequest>(request: R, defaultValue?: (FieldsSelection<Stage, R> | undefined)) => Promise<(FieldsSelection<Stage, R> | undefined)> }),
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    winnerId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> })
}


/** A game represents a single game within a set. */
export interface GameObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    orderNum: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** Selections for this game such as character, etc. */
    selections: ({ get: <R extends GameSelectionRequest>(request: R, defaultValue?: ((FieldsSelection<GameSelection, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<GameSelection, R> | undefined)[] | undefined)> }),

    /** The stage that this game was played on (if applicable) */
    stage: (StageObservableChain & { get: <R extends StageRequest>(request: R, defaultValue?: (FieldsSelection<Stage, R> | undefined)) => Observable<(FieldsSelection<Stage, R> | undefined)> }),
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    winnerId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> })
}


/** An image */
export interface ImagePromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    height: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)> }),
    ratio: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)> }),
    type: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    url: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    width: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)> })
}


/** An image */
export interface ImageObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    height: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)> }),
    ratio: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)> }),
    type: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    url: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    width: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)> })
}


/** A selection for this game. i.e. character/stage selection, etc */
export interface GameSelectionPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** The entrant who this selection is for */
    entrant: (EntrantPromiseChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Promise<(FieldsSelection<Entrant, R> | undefined)> }),
    orderNum: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /**
     * The participant who this selection is for. This is only populated if there are
     * selections for multiple participants of a single entrant
     */
    participant: (ParticipantPromiseChain & { get: <R extends ParticipantRequest>(request: R, defaultValue?: (FieldsSelection<Participant, R> | undefined)) => Promise<(FieldsSelection<Participant, R> | undefined)> }),
    selectionType: ({ get: (request?: boolean | number, defaultValue?: (GameSelectionType | undefined)) => Promise<(GameSelectionType | undefined)> }),
    selectionValue: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> })
}


/** A selection for this game. i.e. character/stage selection, etc */
export interface GameSelectionObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** The entrant who this selection is for */
    entrant: (EntrantObservableChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Observable<(FieldsSelection<Entrant, R> | undefined)> }),
    orderNum: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /**
     * The participant who this selection is for. This is only populated if there are
     * selections for multiple participants of a single entrant
     */
    participant: (ParticipantObservableChain & { get: <R extends ParticipantRequest>(request: R, defaultValue?: (FieldsSelection<Participant, R> | undefined)) => Observable<(FieldsSelection<Participant, R> | undefined)> }),
    selectionType: ({ get: (request?: boolean | number, defaultValue?: (GameSelectionType | undefined)) => Observable<(GameSelectionType | undefined)> }),
    selectionValue: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> })
}


/** A participant of a tournament; either a spectator or competitor */
export interface ParticipantPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** If this participant was checked-in by admin */
    checkedIn: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** The time this participant was checked-in by admin */
    checkedInAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /** Info for connected accounts to external services. */
    connectedAccounts: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Promise<(Scalars['JSON'] | undefined)> }),

    /**
     * Contact Info selected during registration. Falls back to User.location and/or
     * User.name if necessary. These fields are for admin use only and do not respect
     * user privacy settings. DO NOT display this information publicly.
     */
    contactInfo: (ContactInfoPromiseChain & { get: <R extends ContactInfoRequest>(request: R, defaultValue?: (FieldsSelection<ContactInfo, R> | undefined)) => Promise<(FieldsSelection<ContactInfo, R> | undefined)> }),

    /** Email of the user, only available to admins within 18 months of tournament */
    email: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    entrants: ({ get: <R extends EntrantRequest>(request: R, defaultValue?: ((FieldsSelection<Entrant, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Entrant, R> | undefined)[] | undefined)> }),

    /** The events this participant registered for. */
    events: ({ get: <R extends EventRequest>(request: R, defaultValue?: ((FieldsSelection<Event, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Event, R> | undefined)[] | undefined)> }),

    /** The tag that was used in registration e.g. Mang0 */
    gamerTag: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    player: (PlayerPromiseChain & { get: <R extends PlayerRequest>(request: R, defaultValue?: (FieldsSelection<Player, R> | undefined)) => Promise<(FieldsSelection<Player, R> | undefined)> }),

    /** The prefix that was used in registration e.g. C9 */
    prefix: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Admin only field for required social connections */
    requiredConnections: ({ get: <R extends ProfileAuthorizationRequest>(request: R, defaultValue?: ((FieldsSelection<ProfileAuthorization, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<ProfileAuthorization, R> | undefined)[] | undefined)> }),

    /** The user this participant is associated to. */
    user: (UserPromiseChain & { get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)> }),

    /** If this participant is verified as actually being in the tournament */
    verified: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> })
}


/** A participant of a tournament; either a spectator or competitor */
export interface ParticipantObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** If this participant was checked-in by admin */
    checkedIn: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** The time this participant was checked-in by admin */
    checkedInAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /** Info for connected accounts to external services. */
    connectedAccounts: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Observable<(Scalars['JSON'] | undefined)> }),

    /**
     * Contact Info selected during registration. Falls back to User.location and/or
     * User.name if necessary. These fields are for admin use only and do not respect
     * user privacy settings. DO NOT display this information publicly.
     */
    contactInfo: (ContactInfoObservableChain & { get: <R extends ContactInfoRequest>(request: R, defaultValue?: (FieldsSelection<ContactInfo, R> | undefined)) => Observable<(FieldsSelection<ContactInfo, R> | undefined)> }),

    /** Email of the user, only available to admins within 18 months of tournament */
    email: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    entrants: ({ get: <R extends EntrantRequest>(request: R, defaultValue?: ((FieldsSelection<Entrant, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Entrant, R> | undefined)[] | undefined)> }),

    /** The events this participant registered for. */
    events: ({ get: <R extends EventRequest>(request: R, defaultValue?: ((FieldsSelection<Event, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Event, R> | undefined)[] | undefined)> }),

    /** The tag that was used in registration e.g. Mang0 */
    gamerTag: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    player: (PlayerObservableChain & { get: <R extends PlayerRequest>(request: R, defaultValue?: (FieldsSelection<Player, R> | undefined)) => Observable<(FieldsSelection<Player, R> | undefined)> }),

    /** The prefix that was used in registration e.g. C9 */
    prefix: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Admin only field for required social connections */
    requiredConnections: ({ get: <R extends ProfileAuthorizationRequest>(request: R, defaultValue?: ((FieldsSelection<ProfileAuthorization, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<ProfileAuthorization, R> | undefined)[] | undefined)> }),

    /** The user this participant is associated to. */
    user: (UserObservableChain & { get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)> }),

    /** If this participant is verified as actually being in the tournament */
    verified: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> })
}


/** Name, address, etc */
export interface ContactInfoPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** Participant City Name */
    city: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Participant Country Name */
    country: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Participant Country (region) id */
    countryId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** First Name */
    nameFirst: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Last Name */
    nameLast: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Participant State Name */
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Participant State (region) id */
    stateId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** Zip or Postal Code */
    zipcode: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/** Name, address, etc */
export interface ContactInfoObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** Participant City Name */
    city: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Participant Country Name */
    country: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Participant Country (region) id */
    countryId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** First Name */
    nameFirst: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Last Name */
    nameLast: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Participant State Name */
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Participant State (region) id */
    stateId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** Zip or Postal Code */
    zipcode: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}


/** A player */
export interface PlayerPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    gamerTag: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    prefix: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Most recent active & published rankings */
    rankings: ((args?: { limit?: (Scalars['Int'] | null), videogameId?: (Scalars['ID'] | null) }) => { get: <R extends PlayerRankRequest>(request: R, defaultValue?: ((FieldsSelection<PlayerRank, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<PlayerRank, R> | undefined)[] | undefined)> }) & ({ get: <R extends PlayerRankRequest>(request: R, defaultValue?: ((FieldsSelection<PlayerRank, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<PlayerRank, R> | undefined)[] | undefined)> }),

    /**
     * @deprecated Use the sets field instead.
     * Recent sets for this player.
     */
    recentSets: ((args?: {
        /** Use this to get H2H history between two players */
        opponentId?: (Scalars['ID'] | null)
    }) => { get: <R extends SetRequest>(request: R, defaultValue?: ((FieldsSelection<Set, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Set, R> | undefined)[] | undefined)> }) & ({ get: <R extends SetRequest>(request: R, defaultValue?: ((FieldsSelection<Set, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Set, R> | undefined)[] | undefined)> }),

    /** Set history for this player. */
    sets: ((args?: {
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }) => SetConnectionPromiseChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Promise<(FieldsSelection<SetConnection, R> | undefined)> }) & (SetConnectionPromiseChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Promise<(FieldsSelection<SetConnection, R> | undefined)> }),
    user: (UserPromiseChain & { get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)> })
}


/** A player */
export interface PlayerObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    gamerTag: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    prefix: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Most recent active & published rankings */
    rankings: ((args?: { limit?: (Scalars['Int'] | null), videogameId?: (Scalars['ID'] | null) }) => { get: <R extends PlayerRankRequest>(request: R, defaultValue?: ((FieldsSelection<PlayerRank, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<PlayerRank, R> | undefined)[] | undefined)> }) & ({ get: <R extends PlayerRankRequest>(request: R, defaultValue?: ((FieldsSelection<PlayerRank, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<PlayerRank, R> | undefined)[] | undefined)> }),

    /**
     * @deprecated Use the sets field instead.
     * Recent sets for this player.
     */
    recentSets: ((args?: {
        /** Use this to get H2H history between two players */
        opponentId?: (Scalars['ID'] | null)
    }) => { get: <R extends SetRequest>(request: R, defaultValue?: ((FieldsSelection<Set, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Set, R> | undefined)[] | undefined)> }) & ({ get: <R extends SetRequest>(request: R, defaultValue?: ((FieldsSelection<Set, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Set, R> | undefined)[] | undefined)> }),

    /** Set history for this player. */
    sets: ((args?: {
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }) => SetConnectionObservableChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Observable<(FieldsSelection<SetConnection, R> | undefined)> }) & (SetConnectionObservableChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Observable<(FieldsSelection<SetConnection, R> | undefined)> }),
    user: (UserObservableChain & { get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)> })
}


/** A player's ranks */
export interface PlayerRankPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** The player's placement on the ranking */
    rank: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    title: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/** A player's ranks */
export interface PlayerRankObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** The player's placement on the ranking */
    rank: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    title: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}


/** Video Stage */
export interface StagePromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** Stage name */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/** Video Stage */
export interface StageObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** Stage name */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}


/** A group within a phase */
export interface PhaseGroupPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** The bracket type of this group's phase. */
    bracketType: ({ get: (request?: boolean | number, defaultValue?: (BracketType | undefined)) => Promise<(BracketType | undefined)> }),

    /** Unique identifier for this group within the context of its phase */
    displayIdentifier: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** For the given phase group, this is the start time of the first round that occurs in the group. */
    firstRoundTime: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    numRounds: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** @deprecated Please use 'seeds', which is now paginated */
    paginatedSeeds: ((args: { query: SeedPaginationQuery, eventId?: (Scalars['ID'] | null) }) => SeedConnectionPromiseChain & { get: <R extends SeedConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SeedConnection, R> | undefined)) => Promise<(FieldsSelection<SeedConnection, R> | undefined)> }),

    /**
     * @deprecated Please use 'sets', which is now paginated
     * Paginated sets on this phaseGroup
     */
    paginatedSets: ((args?: {
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }) => SetConnectionPromiseChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Promise<(FieldsSelection<SetConnection, R> | undefined)> }) & (SetConnectionPromiseChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Promise<(FieldsSelection<SetConnection, R> | undefined)> }),

    /** The phase associated with this phase group */
    phase: (PhasePromiseChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Promise<(FieldsSelection<Phase, R> | undefined)> }),

    /** The progressions out of this phase group */
    progressionsOut: ({ get: <R extends ProgressionRequest>(request: R, defaultValue?: ((FieldsSelection<Progression, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Progression, R> | undefined)[] | undefined)> }),
    rounds: ({ get: <R extends RoundRequest>(request: R, defaultValue?: ((FieldsSelection<Round, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Round, R> | undefined)[] | undefined)> }),
    seedMap: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Promise<(Scalars['JSON'] | undefined)> }),

    /** Paginated seeds for this phase group */
    seeds: ((args: { query: SeedPaginationQuery, eventId?: (Scalars['ID'] | null) }) => SeedConnectionPromiseChain & { get: <R extends SeedConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SeedConnection, R> | undefined)) => Promise<(FieldsSelection<SeedConnection, R> | undefined)> }),

    /** Paginated sets on this phaseGroup */
    sets: ((args?: {
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }) => SetConnectionPromiseChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Promise<(FieldsSelection<SetConnection, R> | undefined)> }) & (SetConnectionPromiseChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Promise<(FieldsSelection<SetConnection, R> | undefined)> }),

    /** Paginated list of standings */
    standings: ((args?: { query?: (StandingGroupStandingPageFilter | null) }) => StandingConnectionPromiseChain & { get: <R extends StandingConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StandingConnection, R> | undefined)) => Promise<(FieldsSelection<StandingConnection, R> | undefined)> }) & (StandingConnectionPromiseChain & { get: <R extends StandingConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StandingConnection, R> | undefined)) => Promise<(FieldsSelection<StandingConnection, R> | undefined)> }),

    /** Unix time the group is scheduled to start. This info could also be on the wave instead. */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    tiebreakOrder: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Promise<(Scalars['JSON'] | undefined)> }),
    wave: (WavePromiseChain & { get: <R extends WaveRequest>(request: R, defaultValue?: (FieldsSelection<Wave, R> | undefined)) => Promise<(FieldsSelection<Wave, R> | undefined)> })
}


/** A group within a phase */
export interface PhaseGroupObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** The bracket type of this group's phase. */
    bracketType: ({ get: (request?: boolean | number, defaultValue?: (BracketType | undefined)) => Observable<(BracketType | undefined)> }),

    /** Unique identifier for this group within the context of its phase */
    displayIdentifier: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** For the given phase group, this is the start time of the first round that occurs in the group. */
    firstRoundTime: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    numRounds: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** @deprecated Please use 'seeds', which is now paginated */
    paginatedSeeds: ((args: { query: SeedPaginationQuery, eventId?: (Scalars['ID'] | null) }) => SeedConnectionObservableChain & { get: <R extends SeedConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SeedConnection, R> | undefined)) => Observable<(FieldsSelection<SeedConnection, R> | undefined)> }),

    /**
     * @deprecated Please use 'sets', which is now paginated
     * Paginated sets on this phaseGroup
     */
    paginatedSets: ((args?: {
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }) => SetConnectionObservableChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Observable<(FieldsSelection<SetConnection, R> | undefined)> }) & (SetConnectionObservableChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Observable<(FieldsSelection<SetConnection, R> | undefined)> }),

    /** The phase associated with this phase group */
    phase: (PhaseObservableChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Observable<(FieldsSelection<Phase, R> | undefined)> }),

    /** The progressions out of this phase group */
    progressionsOut: ({ get: <R extends ProgressionRequest>(request: R, defaultValue?: ((FieldsSelection<Progression, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Progression, R> | undefined)[] | undefined)> }),
    rounds: ({ get: <R extends RoundRequest>(request: R, defaultValue?: ((FieldsSelection<Round, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Round, R> | undefined)[] | undefined)> }),
    seedMap: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Observable<(Scalars['JSON'] | undefined)> }),

    /** Paginated seeds for this phase group */
    seeds: ((args: { query: SeedPaginationQuery, eventId?: (Scalars['ID'] | null) }) => SeedConnectionObservableChain & { get: <R extends SeedConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SeedConnection, R> | undefined)) => Observable<(FieldsSelection<SeedConnection, R> | undefined)> }),

    /** Paginated sets on this phaseGroup */
    sets: ((args?: {
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }) => SetConnectionObservableChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Observable<(FieldsSelection<SetConnection, R> | undefined)> }) & (SetConnectionObservableChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Observable<(FieldsSelection<SetConnection, R> | undefined)> }),

    /** Paginated list of standings */
    standings: ((args?: { query?: (StandingGroupStandingPageFilter | null) }) => StandingConnectionObservableChain & { get: <R extends StandingConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StandingConnection, R> | undefined)) => Observable<(FieldsSelection<StandingConnection, R> | undefined)> }) & (StandingConnectionObservableChain & { get: <R extends StandingConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StandingConnection, R> | undefined)) => Observable<(FieldsSelection<StandingConnection, R> | undefined)> }),

    /** Unix time the group is scheduled to start. This info could also be on the wave instead. */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    tiebreakOrder: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Observable<(Scalars['JSON'] | undefined)> }),
    wave: (WaveObservableChain & { get: <R extends WaveRequest>(request: R, defaultValue?: (FieldsSelection<Wave, R> | undefined)) => Observable<(FieldsSelection<Wave, R> | undefined)> })
}

export interface SeedConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends SeedRequest>(request: R, defaultValue?: ((FieldsSelection<Seed, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Seed, R> | undefined)[] | undefined)> })
}

export interface SeedConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends SeedRequest>(request: R, defaultValue?: ((FieldsSelection<Seed, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Seed, R> | undefined)[] | undefined)> })
}


/** A seed for an entrant */
export interface SeedPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** Map of Participant ID to checked in boolean */
    checkedInParticipants: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Promise<(Scalars['JSON'] | undefined)> }),
    entrant: (EntrantPromiseChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Promise<(FieldsSelection<Entrant, R> | undefined)> }),
    groupSeedNum: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    isBye: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    phase: (PhasePromiseChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Promise<(FieldsSelection<Phase, R> | undefined)> }),
    phaseGroup: (PhaseGroupPromiseChain & { get: <R extends PhaseGroupRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroup, R> | undefined)) => Promise<(FieldsSelection<PhaseGroup, R> | undefined)> }),
    placeholderName: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    placement: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** The player(s) associated with this seed's entrant */
    players: ({ get: <R extends PlayerRequest>(request: R, defaultValue?: ((FieldsSelection<Player, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Player, R> | undefined)[] | undefined)> }),
    progressionSeedId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** Source progression information */
    progressionSource: (ProgressionPromiseChain & { get: <R extends ProgressionRequest>(request: R, defaultValue?: (FieldsSelection<Progression, R> | undefined)) => Promise<(FieldsSelection<Progression, R> | undefined)> }),
    seedNum: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** Entrant's win/loss record for this standing. Scores do not include byes. */
    setRecordWithoutByes: ((args: { phaseGroupId: Scalars['ID'] }) => { get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Promise<(Scalars['JSON'] | undefined)> }),
    standings: ((args?: {
        /** The container of the standing groups to get standings for. If null, will return all standings. */
        containerType?: (Scalars['String'] | null)
    }) => { get: <R extends StandingRequest>(request: R, defaultValue?: ((FieldsSelection<Standing, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Standing, R> | undefined)[] | undefined)> }) & ({ get: <R extends StandingRequest>(request: R, defaultValue?: ((FieldsSelection<Standing, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Standing, R> | undefined)[] | undefined)> })
}


/** A seed for an entrant */
export interface SeedObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** Map of Participant ID to checked in boolean */
    checkedInParticipants: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Observable<(Scalars['JSON'] | undefined)> }),
    entrant: (EntrantObservableChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Observable<(FieldsSelection<Entrant, R> | undefined)> }),
    groupSeedNum: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    isBye: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    phase: (PhaseObservableChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Observable<(FieldsSelection<Phase, R> | undefined)> }),
    phaseGroup: (PhaseGroupObservableChain & { get: <R extends PhaseGroupRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroup, R> | undefined)) => Observable<(FieldsSelection<PhaseGroup, R> | undefined)> }),
    placeholderName: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    placement: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** The player(s) associated with this seed's entrant */
    players: ({ get: <R extends PlayerRequest>(request: R, defaultValue?: ((FieldsSelection<Player, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Player, R> | undefined)[] | undefined)> }),
    progressionSeedId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** Source progression information */
    progressionSource: (ProgressionObservableChain & { get: <R extends ProgressionRequest>(request: R, defaultValue?: (FieldsSelection<Progression, R> | undefined)) => Observable<(FieldsSelection<Progression, R> | undefined)> }),
    seedNum: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** Entrant's win/loss record for this standing. Scores do not include byes. */
    setRecordWithoutByes: ((args: { phaseGroupId: Scalars['ID'] }) => { get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Observable<(Scalars['JSON'] | undefined)> }),
    standings: ((args?: {
        /** The container of the standing groups to get standings for. If null, will return all standings. */
        containerType?: (Scalars['String'] | null)
    }) => { get: <R extends StandingRequest>(request: R, defaultValue?: ((FieldsSelection<Standing, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Standing, R> | undefined)[] | undefined)> }) & ({ get: <R extends StandingRequest>(request: R, defaultValue?: ((FieldsSelection<Standing, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Standing, R> | undefined)[] | undefined)> })
}


/** A phase in an event */
export interface PhasePromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** The bracket type of this phase. */
    bracketType: ({ get: (request?: boolean | number, defaultValue?: (BracketType | undefined)) => Promise<(BracketType | undefined)> }),

    /** The Event that this phase belongs to */
    event: (EventPromiseChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Promise<(FieldsSelection<Event, R> | undefined)> }),

    /** Number of phase groups in this phase */
    groupCount: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** Is the phase an exhibition or not. */
    isExhibition: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** Name of phase e.g. Round 1 Pools */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The number of seeds this phase contains. */
    numSeeds: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** @deprecated Please use 'seeds' instead */
    paginatedSeeds: ((args: { query: SeedPaginationQuery, eventId?: (Scalars['ID'] | null) }) => SeedConnectionPromiseChain & { get: <R extends SeedConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SeedConnection, R> | undefined)) => Promise<(FieldsSelection<SeedConnection, R> | undefined)> }),

    /** Phase groups under this phase, paginated */
    phaseGroups: ((args?: { query?: (PhaseGroupPageQuery | null) }) => PhaseGroupConnectionPromiseChain & { get: <R extends PhaseGroupConnectionRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroupConnection, R> | undefined)) => Promise<(FieldsSelection<PhaseGroupConnection, R> | undefined)> }) & (PhaseGroupConnectionPromiseChain & { get: <R extends PhaseGroupConnectionRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroupConnection, R> | undefined)) => Promise<(FieldsSelection<PhaseGroupConnection, R> | undefined)> }),

    /** The relative order of this phase within an event */
    phaseOrder: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** Paginated seeds for this phase */
    seeds: ((args: { query: SeedPaginationQuery, eventId?: (Scalars['ID'] | null) }) => SeedConnectionPromiseChain & { get: <R extends SeedConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SeedConnection, R> | undefined)) => Promise<(FieldsSelection<SeedConnection, R> | undefined)> }),

    /** Paginated sets for this Phase */
    sets: ((args?: {
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }) => SetConnectionPromiseChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Promise<(FieldsSelection<SetConnection, R> | undefined)> }) & (SetConnectionPromiseChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Promise<(FieldsSelection<SetConnection, R> | undefined)> }),

    /** State of the phase */
    state: ({ get: (request?: boolean | number, defaultValue?: (ActivityState | undefined)) => Promise<(ActivityState | undefined)> }),
    waves: ({ get: <R extends WaveRequest>(request: R, defaultValue?: ((FieldsSelection<Wave, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Wave, R> | undefined)[] | undefined)> })
}


/** A phase in an event */
export interface PhaseObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** The bracket type of this phase. */
    bracketType: ({ get: (request?: boolean | number, defaultValue?: (BracketType | undefined)) => Observable<(BracketType | undefined)> }),

    /** The Event that this phase belongs to */
    event: (EventObservableChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Observable<(FieldsSelection<Event, R> | undefined)> }),

    /** Number of phase groups in this phase */
    groupCount: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** Is the phase an exhibition or not. */
    isExhibition: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** Name of phase e.g. Round 1 Pools */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The number of seeds this phase contains. */
    numSeeds: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** @deprecated Please use 'seeds' instead */
    paginatedSeeds: ((args: { query: SeedPaginationQuery, eventId?: (Scalars['ID'] | null) }) => SeedConnectionObservableChain & { get: <R extends SeedConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SeedConnection, R> | undefined)) => Observable<(FieldsSelection<SeedConnection, R> | undefined)> }),

    /** Phase groups under this phase, paginated */
    phaseGroups: ((args?: { query?: (PhaseGroupPageQuery | null) }) => PhaseGroupConnectionObservableChain & { get: <R extends PhaseGroupConnectionRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroupConnection, R> | undefined)) => Observable<(FieldsSelection<PhaseGroupConnection, R> | undefined)> }) & (PhaseGroupConnectionObservableChain & { get: <R extends PhaseGroupConnectionRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroupConnection, R> | undefined)) => Observable<(FieldsSelection<PhaseGroupConnection, R> | undefined)> }),

    /** The relative order of this phase within an event */
    phaseOrder: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** Paginated seeds for this phase */
    seeds: ((args: { query: SeedPaginationQuery, eventId?: (Scalars['ID'] | null) }) => SeedConnectionObservableChain & { get: <R extends SeedConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SeedConnection, R> | undefined)) => Observable<(FieldsSelection<SeedConnection, R> | undefined)> }),

    /** Paginated sets for this Phase */
    sets: ((args?: {
        page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null),
        /** How to sort these sets */
        sortType?: (SetSortType | null),
        /** Supported filter options to filter down set results. */
        filters?: (SetFilters | null)
    }) => SetConnectionObservableChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Observable<(FieldsSelection<SetConnection, R> | undefined)> }) & (SetConnectionObservableChain & { get: <R extends SetConnectionRequest>(request: R, defaultValue?: (FieldsSelection<SetConnection, R> | undefined)) => Observable<(FieldsSelection<SetConnection, R> | undefined)> }),

    /** State of the phase */
    state: ({ get: (request?: boolean | number, defaultValue?: (ActivityState | undefined)) => Observable<(ActivityState | undefined)> }),
    waves: ({ get: <R extends WaveRequest>(request: R, defaultValue?: ((FieldsSelection<Wave, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Wave, R> | undefined)[] | undefined)> })
}

export interface PhaseGroupConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends PhaseGroupRequest>(request: R, defaultValue?: ((FieldsSelection<PhaseGroup, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<PhaseGroup, R> | undefined)[] | undefined)> })
}

export interface PhaseGroupConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends PhaseGroupRequest>(request: R, defaultValue?: ((FieldsSelection<PhaseGroup, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<PhaseGroup, R> | undefined)[] | undefined)> })
}


/** A wave in a tournament */
export interface WavePromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** The Wave Identifier */
    identifier: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Unix time the wave is scheduled to start. */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> })
}


/** A wave in a tournament */
export interface WaveObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** The Wave Identifier */
    identifier: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Unix time the wave is scheduled to start. */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> })
}


/** A connection between a placement in an origin phase group to a destination seed. */
export interface ProgressionPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    originOrder: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    originPhase: (PhasePromiseChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Promise<(FieldsSelection<Phase, R> | undefined)> }),
    originPhaseGroup: (PhaseGroupPromiseChain & { get: <R extends PhaseGroupRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroup, R> | undefined)) => Promise<(FieldsSelection<PhaseGroup, R> | undefined)> }),
    originPlacement: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> })
}


/** A connection between a placement in an origin phase group to a destination seed. */
export interface ProgressionObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    originOrder: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    originPhase: (PhaseObservableChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Observable<(FieldsSelection<Phase, R> | undefined)> }),
    originPhaseGroup: (PhaseGroupObservableChain & { get: <R extends PhaseGroupRequest>(request: R, defaultValue?: (FieldsSelection<PhaseGroup, R> | undefined)) => Observable<(FieldsSelection<PhaseGroup, R> | undefined)> }),
    originPlacement: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> })
}


/** A standing indicates the placement of something within a container. */
export interface StandingPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /**
     * The containing entity that contextualizes this standing. Event standings, for
     * example, represent an entrant's standing in the entire event vs. Set standings
     * which is an entrant's standing in only a single set within an event.
     */
    container: ({ get: <R extends StandingContainerRequest>(request: R, defaultValue?: (FieldsSelection<StandingContainer, R> | undefined)) => Promise<(FieldsSelection<StandingContainer, R> | undefined)> }),

    /** If the entity this standing is assigned to can be resolved into an entrant, this will provide the entrant. */
    entrant: (EntrantPromiseChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Promise<(FieldsSelection<Entrant, R> | undefined)> }),
    isFinal: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** Metadata that goes along with this standing. Can take on different forms based on standing group type and settings. */
    metadata: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Promise<(Scalars['JSON'] | undefined)> }),
    placement: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** The player(s) tied to this standing's entity */
    player: (PlayerPromiseChain & { get: <R extends PlayerRequest>(request: R, defaultValue?: (FieldsSelection<Player, R> | undefined)) => Promise<(FieldsSelection<Player, R> | undefined)> }),

    /** @deprecated The "placement" field is identical and will eventually replace "standing" */
    standing: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    stats: (StandingStatsPromiseChain & { get: <R extends StandingStatsRequest>(request: R, defaultValue?: (FieldsSelection<StandingStats, R> | undefined)) => Promise<(FieldsSelection<StandingStats, R> | undefined)> }),
    totalPoints: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)> })
}


/** A standing indicates the placement of something within a container. */
export interface StandingObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /**
     * The containing entity that contextualizes this standing. Event standings, for
     * example, represent an entrant's standing in the entire event vs. Set standings
     * which is an entrant's standing in only a single set within an event.
     */
    container: ({ get: <R extends StandingContainerRequest>(request: R, defaultValue?: (FieldsSelection<StandingContainer, R> | undefined)) => Observable<(FieldsSelection<StandingContainer, R> | undefined)> }),

    /** If the entity this standing is assigned to can be resolved into an entrant, this will provide the entrant. */
    entrant: (EntrantObservableChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Observable<(FieldsSelection<Entrant, R> | undefined)> }),
    isFinal: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** Metadata that goes along with this standing. Can take on different forms based on standing group type and settings. */
    metadata: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Observable<(Scalars['JSON'] | undefined)> }),
    placement: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** The player(s) tied to this standing's entity */
    player: (PlayerObservableChain & { get: <R extends PlayerRequest>(request: R, defaultValue?: (FieldsSelection<Player, R> | undefined)) => Observable<(FieldsSelection<Player, R> | undefined)> }),

    /** @deprecated The "placement" field is identical and will eventually replace "standing" */
    standing: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    stats: (StandingStatsObservableChain & { get: <R extends StandingStatsRequest>(request: R, defaultValue?: (FieldsSelection<StandingStats, R> | undefined)) => Observable<(FieldsSelection<StandingStats, R> | undefined)> }),
    totalPoints: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)> })
}


/** A tournament */
export interface TournamentPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    addrState: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Admin-only view of admins for this tournament */
    admins: ((args?: {
        /** Which roles to show */
        roles?: ((Scalars['String'] | null)[] | null)
    }) => { get: <R extends UserRequest>(request: R, defaultValue?: ((FieldsSelection<User, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<User, R> | undefined)[] | undefined)> }) & ({ get: <R extends UserRequest>(request: R, defaultValue?: ((FieldsSelection<User, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<User, R> | undefined)[] | undefined)> }),
    city: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    countryCode: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** When the tournament was created (unix timestamp) */
    createdAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    currency: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** When the tournament ends */
    endAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /** When does event registration close */
    eventRegistrationClosesAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    events: ((args?: { limit?: (Scalars['Int'] | null), filter?: (EventFilter | null) }) => { get: <R extends EventRequest>(request: R, defaultValue?: ((FieldsSelection<Event, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Event, R> | undefined)[] | undefined)> }) & ({ get: <R extends EventRequest>(request: R, defaultValue?: ((FieldsSelection<Event, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Event, R> | undefined)[] | undefined)> }),

    /** True if tournament has at least one offline event */
    hasOfflineEvents: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    hasOnlineEvents: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    hashtag: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),

    /** True if tournament has at least one online event */
    isOnline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** Is tournament registration open */
    isRegistrationOpen: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    lat: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)> }),
    links: (TournamentLinksPromiseChain & { get: <R extends TournamentLinksRequest>(request: R, defaultValue?: (FieldsSelection<TournamentLinks, R> | undefined)) => Promise<(FieldsSelection<TournamentLinks, R> | undefined)> }),
    lng: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)> }),
    mapsPlaceId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The tournament name */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Number of attendees including spectators, if public */
    numAttendees: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** The user who created the tournament */
    owner: (UserPromiseChain & { get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)> }),

    /** Paginated, queryable list of participants */
    participants: ((args: { query: ParticipantPaginationQuery, isAdmin?: (Scalars['Boolean'] | null) }) => ParticipantConnectionPromiseChain & { get: <R extends ParticipantConnectionRequest>(request: R, defaultValue?: (FieldsSelection<ParticipantConnection, R> | undefined)) => Promise<(FieldsSelection<ParticipantConnection, R> | undefined)> }),
    postalCode: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    primaryContact: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    primaryContactType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Publishing settings for this tournament */
    publishing: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Promise<(Scalars['JSON'] | undefined)> }),

    /** When does registration for the tournament end */
    registrationClosesAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    rules: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The short slug used to form the url */
    shortSlug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The slug used to form the url */
    slug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** When the tournament Starts */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /** State of the tournament, can be ActivityState::CREATED, ActivityState::ACTIVE, or ActivityState::COMPLETED */
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    stations: ((args?: { page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null) }) => StationsConnectionPromiseChain & { get: <R extends StationsConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StationsConnection, R> | undefined)) => Promise<(FieldsSelection<StationsConnection, R> | undefined)> }) & (StationsConnectionPromiseChain & { get: <R extends StationsConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StationsConnection, R> | undefined)) => Promise<(FieldsSelection<StationsConnection, R> | undefined)> }),
    streamQueue: ({ get: <R extends StreamQueueRequest>(request: R, defaultValue?: ((FieldsSelection<StreamQueue, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<StreamQueue, R> | undefined)[] | undefined)> }),
    streams: ({ get: <R extends StreamsRequest>(request: R, defaultValue?: ((FieldsSelection<Streams, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Streams, R> | undefined)[] | undefined)> }),

    /** When is the team creation deadline */
    teamCreationClosesAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /** Paginated, queryable list of teams */
    teams: ((args: { query: TeamPaginationQuery }) => TeamConnectionPromiseChain & { get: <R extends TeamConnectionRequest>(request: R, defaultValue?: (FieldsSelection<TeamConnection, R> | undefined)) => Promise<(FieldsSelection<TeamConnection, R> | undefined)> }),

    /** The timezone of the tournament */
    timezone: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The type of tournament from TournamentType */
    tournamentType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** When the tournament was last modified (unix timestamp) */
    updatedAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /** Build Tournament URL */
    url: ((args?: {
        /** Tournament tab to add to URL */
        tab?: (Scalars['String'] | null),
        /** Generate a relative URL. Defaults to true. Setting to false will generate an absolute URL */
        relative?: (Scalars['Boolean'] | null)
    }) => { get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }) & ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    venueAddress: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    venueName: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** List of all waves in this tournament */
    waves: ({ get: <R extends WaveRequest>(request: R, defaultValue?: ((FieldsSelection<Wave, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Wave, R> | undefined)[] | undefined)> })
}


/** A tournament */
export interface TournamentObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    addrState: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Admin-only view of admins for this tournament */
    admins: ((args?: {
        /** Which roles to show */
        roles?: ((Scalars['String'] | null)[] | null)
    }) => { get: <R extends UserRequest>(request: R, defaultValue?: ((FieldsSelection<User, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<User, R> | undefined)[] | undefined)> }) & ({ get: <R extends UserRequest>(request: R, defaultValue?: ((FieldsSelection<User, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<User, R> | undefined)[] | undefined)> }),
    city: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    countryCode: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** When the tournament was created (unix timestamp) */
    createdAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    currency: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** When the tournament ends */
    endAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /** When does event registration close */
    eventRegistrationClosesAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    events: ((args?: { limit?: (Scalars['Int'] | null), filter?: (EventFilter | null) }) => { get: <R extends EventRequest>(request: R, defaultValue?: ((FieldsSelection<Event, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Event, R> | undefined)[] | undefined)> }) & ({ get: <R extends EventRequest>(request: R, defaultValue?: ((FieldsSelection<Event, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Event, R> | undefined)[] | undefined)> }),

    /** True if tournament has at least one offline event */
    hasOfflineEvents: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    hasOnlineEvents: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    hashtag: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),

    /** True if tournament has at least one online event */
    isOnline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** Is tournament registration open */
    isRegistrationOpen: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    lat: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)> }),
    links: (TournamentLinksObservableChain & { get: <R extends TournamentLinksRequest>(request: R, defaultValue?: (FieldsSelection<TournamentLinks, R> | undefined)) => Observable<(FieldsSelection<TournamentLinks, R> | undefined)> }),
    lng: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)> }),
    mapsPlaceId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The tournament name */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Number of attendees including spectators, if public */
    numAttendees: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** The user who created the tournament */
    owner: (UserObservableChain & { get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)> }),

    /** Paginated, queryable list of participants */
    participants: ((args: { query: ParticipantPaginationQuery, isAdmin?: (Scalars['Boolean'] | null) }) => ParticipantConnectionObservableChain & { get: <R extends ParticipantConnectionRequest>(request: R, defaultValue?: (FieldsSelection<ParticipantConnection, R> | undefined)) => Observable<(FieldsSelection<ParticipantConnection, R> | undefined)> }),
    postalCode: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    primaryContact: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    primaryContactType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Publishing settings for this tournament */
    publishing: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Observable<(Scalars['JSON'] | undefined)> }),

    /** When does registration for the tournament end */
    registrationClosesAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    rules: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The short slug used to form the url */
    shortSlug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The slug used to form the url */
    slug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** When the tournament Starts */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /** State of the tournament, can be ActivityState::CREATED, ActivityState::ACTIVE, or ActivityState::COMPLETED */
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    stations: ((args?: { page?: (Scalars['Int'] | null), perPage?: (Scalars['Int'] | null) }) => StationsConnectionObservableChain & { get: <R extends StationsConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StationsConnection, R> | undefined)) => Observable<(FieldsSelection<StationsConnection, R> | undefined)> }) & (StationsConnectionObservableChain & { get: <R extends StationsConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StationsConnection, R> | undefined)) => Observable<(FieldsSelection<StationsConnection, R> | undefined)> }),
    streamQueue: ({ get: <R extends StreamQueueRequest>(request: R, defaultValue?: ((FieldsSelection<StreamQueue, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<StreamQueue, R> | undefined)[] | undefined)> }),
    streams: ({ get: <R extends StreamsRequest>(request: R, defaultValue?: ((FieldsSelection<Streams, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Streams, R> | undefined)[] | undefined)> }),

    /** When is the team creation deadline */
    teamCreationClosesAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /** Paginated, queryable list of teams */
    teams: ((args: { query: TeamPaginationQuery }) => TeamConnectionObservableChain & { get: <R extends TeamConnectionRequest>(request: R, defaultValue?: (FieldsSelection<TeamConnection, R> | undefined)) => Observable<(FieldsSelection<TeamConnection, R> | undefined)> }),

    /** The timezone of the tournament */
    timezone: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The type of tournament from TournamentType */
    tournamentType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** When the tournament was last modified (unix timestamp) */
    updatedAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /** Build Tournament URL */
    url: ((args?: {
        /** Tournament tab to add to URL */
        tab?: (Scalars['String'] | null),
        /** Generate a relative URL. Defaults to true. Setting to false will generate an absolute URL */
        relative?: (Scalars['Boolean'] | null)
    }) => { get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }) & ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    venueAddress: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    venueName: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** List of all waves in this tournament */
    waves: ({ get: <R extends WaveRequest>(request: R, defaultValue?: ((FieldsSelection<Wave, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Wave, R> | undefined)[] | undefined)> })
}

export interface TournamentLinksPromiseChain {
    facebook: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    discord: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}

export interface TournamentLinksObservableChain {
    facebook: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    discord: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}

export interface ParticipantConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends ParticipantRequest>(request: R, defaultValue?: ((FieldsSelection<Participant, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Participant, R> | undefined)[] | undefined)> })
}

export interface ParticipantConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends ParticipantRequest>(request: R, defaultValue?: ((FieldsSelection<Participant, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Participant, R> | undefined)[] | undefined)> })
}

export interface StationsConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends StationsRequest>(request: R, defaultValue?: ((FieldsSelection<Stations, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Stations, R> | undefined)[] | undefined)> })
}

export interface StationsConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends StationsRequest>(request: R, defaultValue?: ((FieldsSelection<Stations, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Stations, R> | undefined)[] | undefined)> })
}


/** Stations, such as a stream setup, at an event */
export interface StationsPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    canAutoAssign: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    clusterNumber: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    clusterPrefix: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    enabled: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    identifier: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    numSetups: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    number: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    prefix: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    queue: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Promise<(Scalars['JSON'] | undefined)> }),
    queueDepth: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    updatedAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> })
}


/** Stations, such as a stream setup, at an event */
export interface StationsObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    canAutoAssign: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    clusterNumber: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    clusterPrefix: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    enabled: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    identifier: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    numSetups: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    number: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    prefix: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    queue: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Observable<(Scalars['JSON'] | undefined)> }),
    queueDepth: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    updatedAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> })
}


/** A Stream queue object */
export interface StreamQueuePromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The sets on the stream */
    sets: ({ get: <R extends SetRequest>(request: R, defaultValue?: ((FieldsSelection<Set, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Set, R> | undefined)[] | undefined)> }),

    /** The stream on the queue */
    stream: (StreamsPromiseChain & { get: <R extends StreamsRequest>(request: R, defaultValue?: (FieldsSelection<Streams, R> | undefined)) => Promise<(FieldsSelection<Streams, R> | undefined)> })
}


/** A Stream queue object */
export interface StreamQueueObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The sets on the stream */
    sets: ({ get: <R extends SetRequest>(request: R, defaultValue?: ((FieldsSelection<Set, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Set, R> | undefined)[] | undefined)> }),

    /** The stream on the queue */
    stream: (StreamsObservableChain & { get: <R extends StreamsRequest>(request: R, defaultValue?: (FieldsSelection<Streams, R> | undefined)) => Observable<(FieldsSelection<Streams, R> | undefined)> })
}


/** Tournament Stream */
export interface StreamsPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    enabled: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    followerCount: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    isOnline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    numSetups: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    parentStreamId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    streamGame: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    streamId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    streamLogo: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    streamName: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    streamSource: ({ get: (request?: boolean | number, defaultValue?: (StreamSource | undefined)) => Promise<(StreamSource | undefined)> }),
    streamStatus: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    streamType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    streamTypeId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> })
}


/** Tournament Stream */
export interface StreamsObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    enabled: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    followerCount: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    isOnline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    numSetups: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    parentStreamId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    streamGame: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    streamId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    streamLogo: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    streamName: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    streamSource: ({ get: (request?: boolean | number, defaultValue?: (StreamSource | undefined)) => Observable<(StreamSource | undefined)> }),
    streamStatus: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    streamType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    streamTypeId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> })
}

export interface TeamConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends TeamRequest>(request: R, defaultValue?: ((FieldsSelection<Team, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Team, R> | undefined)[] | undefined)> })
}

export interface TeamConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends TeamRequest>(request: R, defaultValue?: ((FieldsSelection<Team, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Team, R> | undefined)[] | undefined)> })
}


/** A team, either at the global level or within the context of an event */
export interface TeamPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** Uniquely identifying token for team. Same as the hashed part of the slug */
    discriminator: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** @deprecated Use the entrant field off the EventTeam type */
    entrant: (EntrantPromiseChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Promise<(FieldsSelection<Entrant, R> | undefined)> }),

    /** @deprecated Use the event field off the EventTeam type */
    event: (EventPromiseChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Promise<(FieldsSelection<Event, R> | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    members: ((args?: { status?: ((TeamMemberStatus | null)[] | null) }) => { get: <R extends TeamMemberRequest>(request: R, defaultValue?: ((FieldsSelection<TeamMember, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<TeamMember, R> | undefined)[] | undefined)> }) & ({ get: <R extends TeamMemberRequest>(request: R, defaultValue?: ((FieldsSelection<TeamMember, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<TeamMember, R> | undefined)[] | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/** A team, either at the global level or within the context of an event */
export interface TeamObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** Uniquely identifying token for team. Same as the hashed part of the slug */
    discriminator: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** @deprecated Use the entrant field off the EventTeam type */
    entrant: (EntrantObservableChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Observable<(FieldsSelection<Entrant, R> | undefined)> }),

    /** @deprecated Use the event field off the EventTeam type */
    event: (EventObservableChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Observable<(FieldsSelection<Event, R> | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    members: ((args?: { status?: ((TeamMemberStatus | null)[] | null) }) => { get: <R extends TeamMemberRequest>(request: R, defaultValue?: ((FieldsSelection<TeamMember, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<TeamMember, R> | undefined)[] | undefined)> }) & ({ get: <R extends TeamMemberRequest>(request: R, defaultValue?: ((FieldsSelection<TeamMember, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<TeamMember, R> | undefined)[] | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}


/** A member of a team */
export interface TeamMemberPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    isAlternate: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    isCaptain: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** The type of the team member */
    memberType: ({ get: (request?: boolean | number, defaultValue?: (TeamMemberType | undefined)) => Promise<(TeamMemberType | undefined)> }),
    participant: (ParticipantPromiseChain & { get: <R extends ParticipantRequest>(request: R, defaultValue?: (FieldsSelection<Participant, R> | undefined)) => Promise<(FieldsSelection<Participant, R> | undefined)> }),
    player: (PlayerPromiseChain & { get: <R extends PlayerRequest>(request: R, defaultValue?: (FieldsSelection<Player, R> | undefined)) => Promise<(FieldsSelection<Player, R> | undefined)> }),

    /** The status of the team member */
    status: ({ get: (request?: boolean | number, defaultValue?: (TeamMemberStatus | undefined)) => Promise<(TeamMemberStatus | undefined)> })
}


/** A member of a team */
export interface TeamMemberObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    isAlternate: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    isCaptain: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** The type of the team member */
    memberType: ({ get: (request?: boolean | number, defaultValue?: (TeamMemberType | undefined)) => Observable<(TeamMemberType | undefined)> }),
    participant: (ParticipantObservableChain & { get: <R extends ParticipantRequest>(request: R, defaultValue?: (FieldsSelection<Participant, R> | undefined)) => Observable<(FieldsSelection<Participant, R> | undefined)> }),
    player: (PlayerObservableChain & { get: <R extends PlayerRequest>(request: R, defaultValue?: (FieldsSelection<Player, R> | undefined)) => Observable<(FieldsSelection<Player, R> | undefined)> }),

    /** The status of the team member */
    status: ({ get: (request?: boolean | number, defaultValue?: (TeamMemberStatus | undefined)) => Observable<(TeamMemberStatus | undefined)> })
}


/** Any stats related to this standing. This type is experimental and very likely to change in the future. */
export interface StandingStatsPromiseChain {
    score: (ScorePromiseChain & { get: <R extends ScoreRequest>(request: R, defaultValue?: (FieldsSelection<Score, R> | undefined)) => Promise<(FieldsSelection<Score, R> | undefined)> })
}


/** Any stats related to this standing. This type is experimental and very likely to change in the future. */
export interface StandingStatsObservableChain {
    score: (ScoreObservableChain & { get: <R extends ScoreRequest>(request: R, defaultValue?: (FieldsSelection<Score, R> | undefined)) => Observable<(FieldsSelection<Score, R> | undefined)> })
}


/**
 * The score that led to this standing being awarded. The meaning of this field can
 * vary by standing type and is not used for some standing types.
 */
export interface ScorePromiseChain {

    /** The name of this score. e.g. "Kills" or "Stocks" */
    label: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The raw score value */
    value: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)> }),

    /** Like value, but formatted for race format events. Formatted according to the race config for the front end to use. */
    displayValue: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/**
 * The score that led to this standing being awarded. The meaning of this field can
 * vary by standing type and is not used for some standing types.
 */
export interface ScoreObservableChain {

    /** The name of this score. e.g. "Kills" or "Stocks" */
    label: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The raw score value */
    value: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)> }),

    /** Like value, but formatted for race format events. Formatted according to the race config for the front end to use. */
    displayValue: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}


/** A round within a phase group */
export interface RoundPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /**
     * If applicable, bestOf is the number of games
     * 									one must win a majority out of to win a set in this round
     */
    bestOf: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** Indicates this round's order in the phase group */
    number: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** The time that this round is scheduled to start at */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> })
}


/** A round within a phase group */
export interface RoundObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /**
     * If applicable, bestOf is the number of games
     * 									one must win a majority out of to win a set in this round
     */
    bestOf: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** Indicates this round's order in the phase group */
    number: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** The time that this round is scheduled to start at */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> })
}

export interface StandingConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends StandingRequest>(request: R, defaultValue?: ((FieldsSelection<Standing, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Standing, R> | undefined)[] | undefined)> })
}

export interface StandingConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends StandingRequest>(request: R, defaultValue?: ((FieldsSelection<Standing, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Standing, R> | undefined)[] | undefined)> })
}


/** A slot in a set where a seed currently or will eventually exist in order to participate in the set. */
export interface SetSlotPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    entrant: (EntrantPromiseChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Promise<(FieldsSelection<Entrant, R> | undefined)> }),

    /** Pairs with prereqType, is the ID of the prereq. */
    prereqId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Given a set prereq type, defines the placement required in the origin set to end up in this slot. */
    prereqPlacement: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** Describes where the entity in this slot comes from. */
    prereqType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    seed: (SeedPromiseChain & { get: <R extends SeedRequest>(request: R, defaultValue?: (FieldsSelection<Seed, R> | undefined)) => Promise<(FieldsSelection<Seed, R> | undefined)> }),

    /** The index of the slot. Unique per set. */
    slotIndex: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** The standing within this set for the seed currently assigned to this slot. */
    standing: (StandingPromiseChain & { get: <R extends StandingRequest>(request: R, defaultValue?: (FieldsSelection<Standing, R> | undefined)) => Promise<(FieldsSelection<Standing, R> | undefined)> })
}


/** A slot in a set where a seed currently or will eventually exist in order to participate in the set. */
export interface SetSlotObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    entrant: (EntrantObservableChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Observable<(FieldsSelection<Entrant, R> | undefined)> }),

    /** Pairs with prereqType, is the ID of the prereq. */
    prereqId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Given a set prereq type, defines the placement required in the origin set to end up in this slot. */
    prereqPlacement: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** Describes where the entity in this slot comes from. */
    prereqType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    seed: (SeedObservableChain & { get: <R extends SeedRequest>(request: R, defaultValue?: (FieldsSelection<Seed, R> | undefined)) => Observable<(FieldsSelection<Seed, R> | undefined)> }),

    /** The index of the slot. Unique per set. */
    slotIndex: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** The standing within this set for the seed currently assigned to this slot. */
    standing: (StandingObservableChain & { get: <R extends StandingRequest>(request: R, defaultValue?: (FieldsSelection<Standing, R> | undefined)) => Observable<(FieldsSelection<Standing, R> | undefined)> })
}


/** A league */
export interface LeaguePromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    addrState: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    city: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    countryCode: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** When the tournament was created (unix timestamp) */
    createdAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    currency: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** When the tournament ends */
    endAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    entrantCount: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    eventOwners: ((args?: { query?: (EventOwnersQuery | null) }) => EventOwnerConnectionPromiseChain & { get: <R extends EventOwnerConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventOwnerConnection, R> | undefined)) => Promise<(FieldsSelection<EventOwnerConnection, R> | undefined)> }) & (EventOwnerConnectionPromiseChain & { get: <R extends EventOwnerConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventOwnerConnection, R> | undefined)) => Promise<(FieldsSelection<EventOwnerConnection, R> | undefined)> }),

    /** When does event registration close */
    eventRegistrationClosesAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /** Paginated list of events in a league */
    events: ((args?: { query?: (LeagueEventsQuery | null) }) => EventConnectionPromiseChain & { get: <R extends EventConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventConnection, R> | undefined)) => Promise<(FieldsSelection<EventConnection, R> | undefined)> }) & (EventConnectionPromiseChain & { get: <R extends EventConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventConnection, R> | undefined)) => Promise<(FieldsSelection<EventConnection, R> | undefined)> }),

    /**
     * @deprecated No longer used
     * Hacked "progression" into this final event
     */
    finalEventId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** True if tournament has at least one offline event */
    hasOfflineEvents: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    hasOnlineEvents: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    hashtag: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),

    /** True if tournament has at least one online event */
    isOnline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    lat: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)> }),
    links: (TournamentLinksPromiseChain & { get: <R extends TournamentLinksRequest>(request: R, defaultValue?: (FieldsSelection<TournamentLinks, R> | undefined)) => Promise<(FieldsSelection<TournamentLinks, R> | undefined)> }),
    lng: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)> }),
    mapsPlaceId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The tournament name */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /**
     * @deprecated No longer used
     * Top X number of people in the standings who progress to final event
     */
    numProgressingToFinalEvent: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    numUniquePlayers: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    postalCode: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    primaryContact: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    primaryContactType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Publishing settings for this tournament */
    publishing: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Promise<(Scalars['JSON'] | undefined)> }),

    /** When does registration for the tournament end */
    registrationClosesAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    rules: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The short slug used to form the url */
    shortSlug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Whether standings for this league should be visible */
    showStandings: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),
    slug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** Paginated list of standings */
    standings: ((args?: { query?: (StandingGroupStandingPageFilter | null) }) => StandingConnectionPromiseChain & { get: <R extends StandingConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StandingConnection, R> | undefined)) => Promise<(FieldsSelection<StandingConnection, R> | undefined)> }) & (StandingConnectionPromiseChain & { get: <R extends StandingConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StandingConnection, R> | undefined)) => Promise<(FieldsSelection<StandingConnection, R> | undefined)> }),

    /** When the tournament Starts */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /** State of the tournament, can be ActivityState::CREATED, ActivityState::ACTIVE, or ActivityState::COMPLETED */
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** When is the team creation deadline */
    teamCreationClosesAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    tiers: ({ get: <R extends EventTierRequest>(request: R, defaultValue?: ((FieldsSelection<EventTier, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<EventTier, R> | undefined)[] | undefined)> }),

    /** The timezone of the tournament */
    timezone: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The type of tournament from TournamentType */
    tournamentType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),

    /** When the tournament was last modified (unix timestamp) */
    updatedAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),

    /** Build Tournament URL */
    url: ((args?: {
        /** Tournament tab to add to URL */
        tab?: (Scalars['String'] | null),
        /** Generate a relative URL. Defaults to true. Setting to false will generate an absolute URL */
        relative?: (Scalars['Boolean'] | null)
    }) => { get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }) & ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    venueAddress: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    venueName: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    videogames: ({ get: <R extends VideogameRequest>(request: R, defaultValue?: ((FieldsSelection<Videogame, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Videogame, R> | undefined)[] | undefined)> })
}


/** A league */
export interface LeagueObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    addrState: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    city: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    countryCode: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** When the tournament was created (unix timestamp) */
    createdAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    currency: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** When the tournament ends */
    endAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    entrantCount: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    eventOwners: ((args?: { query?: (EventOwnersQuery | null) }) => EventOwnerConnectionObservableChain & { get: <R extends EventOwnerConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventOwnerConnection, R> | undefined)) => Observable<(FieldsSelection<EventOwnerConnection, R> | undefined)> }) & (EventOwnerConnectionObservableChain & { get: <R extends EventOwnerConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventOwnerConnection, R> | undefined)) => Observable<(FieldsSelection<EventOwnerConnection, R> | undefined)> }),

    /** When does event registration close */
    eventRegistrationClosesAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /** Paginated list of events in a league */
    events: ((args?: { query?: (LeagueEventsQuery | null) }) => EventConnectionObservableChain & { get: <R extends EventConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventConnection, R> | undefined)) => Observable<(FieldsSelection<EventConnection, R> | undefined)> }) & (EventConnectionObservableChain & { get: <R extends EventConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventConnection, R> | undefined)) => Observable<(FieldsSelection<EventConnection, R> | undefined)> }),

    /**
     * @deprecated No longer used
     * Hacked "progression" into this final event
     */
    finalEventId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** True if tournament has at least one offline event */
    hasOfflineEvents: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    hasOnlineEvents: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    hashtag: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),

    /** True if tournament has at least one online event */
    isOnline: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    lat: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)> }),
    links: (TournamentLinksObservableChain & { get: <R extends TournamentLinksRequest>(request: R, defaultValue?: (FieldsSelection<TournamentLinks, R> | undefined)) => Observable<(FieldsSelection<TournamentLinks, R> | undefined)> }),
    lng: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)> }),
    mapsPlaceId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The tournament name */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /**
     * @deprecated No longer used
     * Top X number of people in the standings who progress to final event
     */
    numProgressingToFinalEvent: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    numUniquePlayers: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    postalCode: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    primaryContact: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    primaryContactType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Publishing settings for this tournament */
    publishing: ({ get: (request?: boolean | number, defaultValue?: (Scalars['JSON'] | undefined)) => Observable<(Scalars['JSON'] | undefined)> }),

    /** When does registration for the tournament end */
    registrationClosesAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    rules: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The short slug used to form the url */
    shortSlug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Whether standings for this league should be visible */
    showStandings: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),
    slug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** Paginated list of standings */
    standings: ((args?: { query?: (StandingGroupStandingPageFilter | null) }) => StandingConnectionObservableChain & { get: <R extends StandingConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StandingConnection, R> | undefined)) => Observable<(FieldsSelection<StandingConnection, R> | undefined)> }) & (StandingConnectionObservableChain & { get: <R extends StandingConnectionRequest>(request: R, defaultValue?: (FieldsSelection<StandingConnection, R> | undefined)) => Observable<(FieldsSelection<StandingConnection, R> | undefined)> }),

    /** When the tournament Starts */
    startAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /** State of the tournament, can be ActivityState::CREATED, ActivityState::ACTIVE, or ActivityState::COMPLETED */
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** When is the team creation deadline */
    teamCreationClosesAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    tiers: ({ get: <R extends EventTierRequest>(request: R, defaultValue?: ((FieldsSelection<EventTier, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<EventTier, R> | undefined)[] | undefined)> }),

    /** The timezone of the tournament */
    timezone: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The type of tournament from TournamentType */
    tournamentType: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),

    /** When the tournament was last modified (unix timestamp) */
    updatedAt: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),

    /** Build Tournament URL */
    url: ((args?: {
        /** Tournament tab to add to URL */
        tab?: (Scalars['String'] | null),
        /** Generate a relative URL. Defaults to true. Setting to false will generate an absolute URL */
        relative?: (Scalars['Boolean'] | null)
    }) => { get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }) & ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    venueAddress: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    venueName: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    videogames: ({ get: <R extends VideogameRequest>(request: R, defaultValue?: ((FieldsSelection<Videogame, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Videogame, R> | undefined)[] | undefined)> })
}

export interface EventOwnerConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends EventOwnerRequest>(request: R, defaultValue?: ((FieldsSelection<EventOwner, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<EventOwner, R> | undefined)[] | undefined)> })
}

export interface EventOwnerConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends EventOwnerRequest>(request: R, defaultValue?: ((FieldsSelection<EventOwner, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<EventOwner, R> | undefined)[] | undefined)> })
}


/** Name and Gamertag of the owner of an event in a league */
export interface EventOwnerPromiseChain {
    eventId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    email: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    gamerTag: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    fullName: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/** Name and Gamertag of the owner of an event in a league */
export interface EventOwnerObservableChain {
    eventId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    email: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    gamerTag: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    fullName: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}


/** Used for league application tiers */
export interface EventTierPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** Name of this tier */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/** Used for league application tiers */
export interface EventTierObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** Name of this tier */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}


/** A videogame */
export interface VideogamePromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** All characters for this videogame */
    characters: ({ get: <R extends CharacterRequest>(request: R, defaultValue?: ((FieldsSelection<Character, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Character, R> | undefined)[] | undefined)> }),
    displayName: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    slug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/** A videogame */
export interface VideogameObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** All characters for this videogame */
    characters: ({ get: <R extends CharacterRequest>(request: R, defaultValue?: ((FieldsSelection<Character, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Character, R> | undefined)[] | undefined)> }),
    displayName: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    slug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}


/** A character in a videogame */
export interface CharacterPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),

    /** Name of Character */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/** A character in a videogame */
export interface CharacterObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),

    /** Name of Character */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}


/** Team roster size requirements */
export interface TeamRosterSizePromiseChain {
    maxAlternates: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    maxPlayers: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    minAlternates: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    minPlayers: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> })
}


/** Team roster size requirements */
export interface TeamRosterSizeObservableChain {
    maxAlternates: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    maxPlayers: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    minAlternates: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    minPlayers: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> })
}

export interface LeagueConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends LeagueRequest>(request: R, defaultValue?: ((FieldsSelection<League, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<League, R> | undefined)[] | undefined)> })
}

export interface LeagueConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends LeagueRequest>(request: R, defaultValue?: ((FieldsSelection<League, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<League, R> | undefined)[] | undefined)> })
}


/** A user's address */
export interface AddressPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    city: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    country: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    countryId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    stateId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> })
}


/** A user's address */
export interface AddressObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    city: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    country: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    countryId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    state: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    stateId: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> })
}

export interface TournamentConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends TournamentRequest>(request: R, defaultValue?: ((FieldsSelection<Tournament, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Tournament, R> | undefined)[] | undefined)> })
}

export interface TournamentConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends TournamentRequest>(request: R, defaultValue?: ((FieldsSelection<Tournament, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Tournament, R> | undefined)[] | undefined)> })
}


/** A shop */
export interface ShopPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    levels: ((args?: { query?: (ShopLevelsQuery | null) }) => ShopLevelConnectionPromiseChain & { get: <R extends ShopLevelConnectionRequest>(request: R, defaultValue?: (FieldsSelection<ShopLevelConnection, R> | undefined)) => Promise<(FieldsSelection<ShopLevelConnection, R> | undefined)> }) & (ShopLevelConnectionPromiseChain & { get: <R extends ShopLevelConnectionRequest>(request: R, defaultValue?: (FieldsSelection<ShopLevelConnection, R> | undefined)) => Promise<(FieldsSelection<ShopLevelConnection, R> | undefined)> }),
    messages: ((args?: { query?: (ShopOrderMessagesQuery | null) }) => ShopOrderMessageConnectionPromiseChain & { get: <R extends ShopOrderMessageConnectionRequest>(request: R, defaultValue?: (FieldsSelection<ShopOrderMessageConnection, R> | undefined)) => Promise<(FieldsSelection<ShopOrderMessageConnection, R> | undefined)> }) & (ShopOrderMessageConnectionPromiseChain & { get: <R extends ShopOrderMessageConnectionRequest>(request: R, defaultValue?: (FieldsSelection<ShopOrderMessageConnection, R> | undefined)) => Promise<(FieldsSelection<ShopOrderMessageConnection, R> | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    slug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    url: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/** A shop */
export interface ShopObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    levels: ((args?: { query?: (ShopLevelsQuery | null) }) => ShopLevelConnectionObservableChain & { get: <R extends ShopLevelConnectionRequest>(request: R, defaultValue?: (FieldsSelection<ShopLevelConnection, R> | undefined)) => Observable<(FieldsSelection<ShopLevelConnection, R> | undefined)> }) & (ShopLevelConnectionObservableChain & { get: <R extends ShopLevelConnectionRequest>(request: R, defaultValue?: (FieldsSelection<ShopLevelConnection, R> | undefined)) => Observable<(FieldsSelection<ShopLevelConnection, R> | undefined)> }),
    messages: ((args?: { query?: (ShopOrderMessagesQuery | null) }) => ShopOrderMessageConnectionObservableChain & { get: <R extends ShopOrderMessageConnectionRequest>(request: R, defaultValue?: (FieldsSelection<ShopOrderMessageConnection, R> | undefined)) => Observable<(FieldsSelection<ShopOrderMessageConnection, R> | undefined)> }) & (ShopOrderMessageConnectionObservableChain & { get: <R extends ShopOrderMessageConnectionRequest>(request: R, defaultValue?: (FieldsSelection<ShopOrderMessageConnection, R> | undefined)) => Observable<(FieldsSelection<ShopOrderMessageConnection, R> | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    slug: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    url: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}

export interface ShopLevelConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends ShopLevelRequest>(request: R, defaultValue?: ((FieldsSelection<ShopLevel, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<ShopLevel, R> | undefined)[] | undefined)> })
}

export interface ShopLevelConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends ShopLevelRequest>(request: R, defaultValue?: ((FieldsSelection<ShopLevel, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<ShopLevel, R> | undefined)[] | undefined)> })
}


/** A shop level */
export interface ShopLevelPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    currAmount: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)> }),
    description: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    goalAmount: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/** A shop level */
export interface ShopLevelObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    currAmount: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)> }),
    description: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    goalAmount: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}

export interface ShopOrderMessageConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends ShopOrderMessageRequest>(request: R, defaultValue?: ((FieldsSelection<ShopOrderMessage, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<ShopOrderMessage, R> | undefined)[] | undefined)> })
}

export interface ShopOrderMessageConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends ShopOrderMessageRequest>(request: R, defaultValue?: ((FieldsSelection<ShopOrderMessage, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<ShopOrderMessage, R> | undefined)[] | undefined)> })
}


/** The message and player info for a shop order */
export interface ShopOrderMessagePromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** The player's gamertag. Returns null if anonymous message type */
    gamertag: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The order message */
    message: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The player's name. Returns null unless name & tag display is selected */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** The player who left the comment */
    player: (PlayerPromiseChain & { get: <R extends PlayerRequest>(request: R, defaultValue?: (FieldsSelection<Player, R> | undefined)) => Promise<(FieldsSelection<Player, R> | undefined)> }),

    /** The total order amount */
    total: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)> })
}


/** The message and player info for a shop order */
export interface ShopOrderMessageObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** The player's gamertag. Returns null if anonymous message type */
    gamertag: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The order message */
    message: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The player's name. Returns null unless name & tag display is selected */
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** The player who left the comment */
    player: (PlayerObservableChain & { get: <R extends PlayerRequest>(request: R, defaultValue?: (FieldsSelection<Player, R> | undefined)) => Observable<(FieldsSelection<Player, R> | undefined)> }),

    /** The total order amount */
    total: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)> })
}

export interface VideogameConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends VideogameRequest>(request: R, defaultValue?: ((FieldsSelection<Videogame, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Videogame, R> | undefined)[] | undefined)> })
}

export interface VideogameConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends VideogameRequest>(request: R, defaultValue?: ((FieldsSelection<Videogame, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Videogame, R> | undefined)[] | undefined)> })
}

export interface MutationPromiseChain {

    /** Delete a phase by id */
    deletePhase: ((args: { phaseId: Scalars['ID'] }) => { get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** Delete a station by id */
    deleteStation: ((args: { stationId: Scalars['ID'] }) => { get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** Delete a wave by id */
    deleteWave: ((args: { waveId: Scalars['ID'] }) => { get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** Automatically attempt to resolve all schedule conflicts. Returns a list of changed seeds */
    resolveScheduleConflicts: ((args: { tournamentId: Scalars['ID'], options?: (ResolveConflictsOptions | null) }) => { get: <R extends SeedRequest>(request: R, defaultValue?: ((FieldsSelection<Seed, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Seed, R> | undefined)[] | undefined)> }),

    /** Swap two seed ids in a phase */
    swapSeeds: ((args: { phaseId: Scalars['ID'], seed1Id: Scalars['ID'], seed2Id: Scalars['ID'] }) => { get: <R extends SeedRequest>(request: R, defaultValue?: ((FieldsSelection<Seed, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Seed, R> | undefined)[] | undefined)> }),

    /** Update set of phase groups in a phase */
    updatePhaseGroups: ((args: { groupConfigs: (PhaseGroupUpdateInput | null)[] }) => { get: <R extends PhaseGroupRequest>(request: R, defaultValue?: ((FieldsSelection<PhaseGroup, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<PhaseGroup, R> | undefined)[] | undefined)> }),

    /** Update the seeding for a phase */
    updatePhaseSeeding: ((args: { phaseId: Scalars['ID'], seedMapping: (UpdatePhaseSeedInfo | null)[], options?: (UpdatePhaseSeedingOptions | null) }) => PhasePromiseChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Promise<(FieldsSelection<Phase, R> | undefined)> }),

    /** Create or update a Phase */
    upsertPhase: ((args: { phaseId?: (Scalars['ID'] | null), eventId?: (Scalars['ID'] | null), payload: PhaseUpsertInput }) => PhasePromiseChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Promise<(FieldsSelection<Phase, R> | undefined)> }),

    /** Add or update a station by id */
    upsertStation: ((args: { stationId?: (Scalars['ID'] | null), tournamentId?: (Scalars['ID'] | null), fields: StationUpsertInput }) => StationsPromiseChain & { get: <R extends StationsRequest>(request: R, defaultValue?: (FieldsSelection<Stations, R> | undefined)) => Promise<(FieldsSelection<Stations, R> | undefined)> }),

    /** Add or update a wave by id */
    upsertWave: ((args: { waveId?: (Scalars['ID'] | null), tournamentId?: (Scalars['ID'] | null), fields: WaveUpsertInput }) => WavePromiseChain & { get: <R extends WaveRequest>(request: R, defaultValue?: (FieldsSelection<Wave, R> | undefined)) => Promise<(FieldsSelection<Wave, R> | undefined)> })
}

export interface MutationObservableChain {

    /** Delete a phase by id */
    deletePhase: ((args: { phaseId: Scalars['ID'] }) => { get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** Delete a station by id */
    deleteStation: ((args: { stationId: Scalars['ID'] }) => { get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** Delete a wave by id */
    deleteWave: ((args: { waveId: Scalars['ID'] }) => { get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** Automatically attempt to resolve all schedule conflicts. Returns a list of changed seeds */
    resolveScheduleConflicts: ((args: { tournamentId: Scalars['ID'], options?: (ResolveConflictsOptions | null) }) => { get: <R extends SeedRequest>(request: R, defaultValue?: ((FieldsSelection<Seed, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Seed, R> | undefined)[] | undefined)> }),

    /** Swap two seed ids in a phase */
    swapSeeds: ((args: { phaseId: Scalars['ID'], seed1Id: Scalars['ID'], seed2Id: Scalars['ID'] }) => { get: <R extends SeedRequest>(request: R, defaultValue?: ((FieldsSelection<Seed, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Seed, R> | undefined)[] | undefined)> }),

    /** Update set of phase groups in a phase */
    updatePhaseGroups: ((args: { groupConfigs: (PhaseGroupUpdateInput | null)[] }) => { get: <R extends PhaseGroupRequest>(request: R, defaultValue?: ((FieldsSelection<PhaseGroup, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<PhaseGroup, R> | undefined)[] | undefined)> }),

    /** Update the seeding for a phase */
    updatePhaseSeeding: ((args: { phaseId: Scalars['ID'], seedMapping: (UpdatePhaseSeedInfo | null)[], options?: (UpdatePhaseSeedingOptions | null) }) => PhaseObservableChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Observable<(FieldsSelection<Phase, R> | undefined)> }),

    /** Create or update a Phase */
    upsertPhase: ((args: { phaseId?: (Scalars['ID'] | null), eventId?: (Scalars['ID'] | null), payload: PhaseUpsertInput }) => PhaseObservableChain & { get: <R extends PhaseRequest>(request: R, defaultValue?: (FieldsSelection<Phase, R> | undefined)) => Observable<(FieldsSelection<Phase, R> | undefined)> }),

    /** Add or update a station by id */
    upsertStation: ((args: { stationId?: (Scalars['ID'] | null), tournamentId?: (Scalars['ID'] | null), fields: StationUpsertInput }) => StationsObservableChain & { get: <R extends StationsRequest>(request: R, defaultValue?: (FieldsSelection<Stations, R> | undefined)) => Observable<(FieldsSelection<Stations, R> | undefined)> }),

    /** Add or update a wave by id */
    upsertWave: ((args: { waveId?: (Scalars['ID'] | null), tournamentId?: (Scalars['ID'] | null), fields: WaveUpsertInput }) => WaveObservableChain & { get: <R extends WaveRequest>(request: R, defaultValue?: (FieldsSelection<Wave, R> | undefined)) => Observable<(FieldsSelection<Wave, R> | undefined)> })
}


/** A set of actions available for an entity to take */
export interface ActionSetPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> })
}


/** A set of actions available for an entity to take */
export interface ActionSetObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> })
}


/** Bracket-specific configuration */
export interface BracketConfigPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    bracketType: ({ get: (request?: boolean | number, defaultValue?: (BracketType | undefined)) => Promise<(BracketType | undefined)> })
}


/** Bracket-specific configuration */
export interface BracketConfigObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    bracketType: ({ get: (request?: boolean | number, defaultValue?: (BracketType | undefined)) => Observable<(BracketType | undefined)> })
}


/** An event-level Team, in the context of some competition */
export interface EventTeamPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** Uniquely identifying token for team. Same as the hashed part of the slug */
    discriminator: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** @deprecated Use the entrant field off the EventTeam type */
    entrant: (EntrantPromiseChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Promise<(FieldsSelection<Entrant, R> | undefined)> }),

    /** @deprecated Use the event field off the EventTeam type */
    event: (EventPromiseChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Promise<(FieldsSelection<Event, R> | undefined)> }),
    globalTeam: (GlobalTeamPromiseChain & { get: <R extends GlobalTeamRequest>(request: R, defaultValue?: (FieldsSelection<GlobalTeam, R> | undefined)) => Promise<(FieldsSelection<GlobalTeam, R> | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    members: ((args?: { status?: ((TeamMemberStatus | null)[] | null) }) => { get: <R extends TeamMemberRequest>(request: R, defaultValue?: ((FieldsSelection<TeamMember, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<TeamMember, R> | undefined)[] | undefined)> }) & ({ get: <R extends TeamMemberRequest>(request: R, defaultValue?: ((FieldsSelection<TeamMember, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<TeamMember, R> | undefined)[] | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/** An event-level Team, in the context of some competition */
export interface EventTeamObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** Uniquely identifying token for team. Same as the hashed part of the slug */
    discriminator: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** @deprecated Use the entrant field off the EventTeam type */
    entrant: (EntrantObservableChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Observable<(FieldsSelection<Entrant, R> | undefined)> }),

    /** @deprecated Use the event field off the EventTeam type */
    event: (EventObservableChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Observable<(FieldsSelection<Event, R> | undefined)> }),
    globalTeam: (GlobalTeamObservableChain & { get: <R extends GlobalTeamRequest>(request: R, defaultValue?: (FieldsSelection<GlobalTeam, R> | undefined)) => Observable<(FieldsSelection<GlobalTeam, R> | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),
    members: ((args?: { status?: ((TeamMemberStatus | null)[] | null) }) => { get: <R extends TeamMemberRequest>(request: R, defaultValue?: ((FieldsSelection<TeamMember, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<TeamMember, R> | undefined)[] | undefined)> }) & ({ get: <R extends TeamMemberRequest>(request: R, defaultValue?: ((FieldsSelection<TeamMember, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<TeamMember, R> | undefined)[] | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}


/** Global Team */
export interface GlobalTeamPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),

    /** Uniquely identifying token for team. Same as the hashed part of the slug */
    discriminator: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),

    /** @deprecated Use the entrant field off the EventTeam type */
    entrant: (EntrantPromiseChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Promise<(FieldsSelection<Entrant, R> | undefined)> }),

    /** @deprecated Use the event field off the EventTeam type */
    event: (EventPromiseChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Promise<(FieldsSelection<Event, R> | undefined)> }),
    eventTeams: ((args?: { query?: (TeamPaginationQuery | null) }) => EventTeamConnectionPromiseChain & { get: <R extends EventTeamConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventTeamConnection, R> | undefined)) => Promise<(FieldsSelection<EventTeamConnection, R> | undefined)> }) & (EventTeamConnectionPromiseChain & { get: <R extends EventTeamConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventTeamConnection, R> | undefined)) => Promise<(FieldsSelection<EventTeamConnection, R> | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),

    /** Leagues-level teams for leagues this team is competing in */
    leagueTeams: ((args?: { query?: (TeamPaginationQuery | null) }) => EventTeamConnectionPromiseChain & { get: <R extends EventTeamConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventTeamConnection, R> | undefined)) => Promise<(FieldsSelection<EventTeamConnection, R> | undefined)> }) & (EventTeamConnectionPromiseChain & { get: <R extends EventTeamConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventTeamConnection, R> | undefined)) => Promise<(FieldsSelection<EventTeamConnection, R> | undefined)> }),
    members: ((args?: { status?: ((TeamMemberStatus | null)[] | null) }) => { get: <R extends TeamMemberRequest>(request: R, defaultValue?: ((FieldsSelection<TeamMember, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<TeamMember, R> | undefined)[] | undefined)> }) & ({ get: <R extends TeamMemberRequest>(request: R, defaultValue?: ((FieldsSelection<TeamMember, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<TeamMember, R> | undefined)[] | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> })
}


/** Global Team */
export interface GlobalTeamObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),

    /** Uniquely identifying token for team. Same as the hashed part of the slug */
    discriminator: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),

    /** @deprecated Use the entrant field off the EventTeam type */
    entrant: (EntrantObservableChain & { get: <R extends EntrantRequest>(request: R, defaultValue?: (FieldsSelection<Entrant, R> | undefined)) => Observable<(FieldsSelection<Entrant, R> | undefined)> }),

    /** @deprecated Use the event field off the EventTeam type */
    event: (EventObservableChain & { get: <R extends EventRequest>(request: R, defaultValue?: (FieldsSelection<Event, R> | undefined)) => Observable<(FieldsSelection<Event, R> | undefined)> }),
    eventTeams: ((args?: { query?: (TeamPaginationQuery | null) }) => EventTeamConnectionObservableChain & { get: <R extends EventTeamConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventTeamConnection, R> | undefined)) => Observable<(FieldsSelection<EventTeamConnection, R> | undefined)> }) & (EventTeamConnectionObservableChain & { get: <R extends EventTeamConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventTeamConnection, R> | undefined)) => Observable<(FieldsSelection<EventTeamConnection, R> | undefined)> }),
    images: ((args?: { type?: (Scalars['String'] | null) }) => { get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }) & ({ get: <R extends ImageRequest>(request: R, defaultValue?: ((FieldsSelection<Image, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Image, R> | undefined)[] | undefined)> }),

    /** Leagues-level teams for leagues this team is competing in */
    leagueTeams: ((args?: { query?: (TeamPaginationQuery | null) }) => EventTeamConnectionObservableChain & { get: <R extends EventTeamConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventTeamConnection, R> | undefined)) => Observable<(FieldsSelection<EventTeamConnection, R> | undefined)> }) & (EventTeamConnectionObservableChain & { get: <R extends EventTeamConnectionRequest>(request: R, defaultValue?: (FieldsSelection<EventTeamConnection, R> | undefined)) => Observable<(FieldsSelection<EventTeamConnection, R> | undefined)> }),
    members: ((args?: { status?: ((TeamMemberStatus | null)[] | null) }) => { get: <R extends TeamMemberRequest>(request: R, defaultValue?: ((FieldsSelection<TeamMember, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<TeamMember, R> | undefined)[] | undefined)> }) & ({ get: <R extends TeamMemberRequest>(request: R, defaultValue?: ((FieldsSelection<TeamMember, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<TeamMember, R> | undefined)[] | undefined)> }),
    name: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> })
}

export interface EventTeamConnectionPromiseChain {
    pageInfo: (PageInfoPromiseChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Promise<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends EventTeamRequest>(request: R, defaultValue?: ((FieldsSelection<EventTeam, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<EventTeam, R> | undefined)[] | undefined)> })
}

export interface EventTeamConnectionObservableChain {
    pageInfo: (PageInfoObservableChain & { get: <R extends PageInfoRequest>(request: R, defaultValue?: (FieldsSelection<PageInfo, R> | undefined)) => Observable<(FieldsSelection<PageInfo, R> | undefined)> }),
    nodes: ({ get: <R extends EventTeamRequest>(request: R, defaultValue?: ((FieldsSelection<EventTeam, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<EventTeam, R> | undefined)[] | undefined)> })
}


/** Match-level configuration */
export interface MatchConfigPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    bracketType: ({ get: (request?: boolean | number, defaultValue?: (BracketType | undefined)) => Promise<(BracketType | undefined)> })
}


/** Match-level configuration */
export interface MatchConfigObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    bracketType: ({ get: (request?: boolean | number, defaultValue?: (BracketType | undefined)) => Observable<(BracketType | undefined)> })
}


/** Race specific bracket configuration */
export interface RaceBracketConfigPromiseChain {
    automaticEndTime: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    automaticStartTime: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)> }),
    bracketType: ({ get: (request?: boolean | number, defaultValue?: (BracketType | undefined)) => Promise<(BracketType | undefined)> }),
    goalTargetComparator: ({ get: (request?: boolean | number, defaultValue?: (Comparator | undefined)) => Promise<(Comparator | undefined)> }),
    goalTargetValue: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)> }),
    limitMode: ({ get: (request?: boolean | number, defaultValue?: (RaceLimitMode | undefined)) => Promise<(RaceLimitMode | undefined)> }),
    limitValue: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)> }),
    raceType: ({ get: (request?: boolean | number, defaultValue?: (RaceType | undefined)) => Promise<(RaceType | undefined)> })
}


/** Race specific bracket configuration */
export interface RaceBracketConfigObservableChain {
    automaticEndTime: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    automaticStartTime: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)> }),
    bracketType: ({ get: (request?: boolean | number, defaultValue?: (BracketType | undefined)) => Observable<(BracketType | undefined)> }),
    goalTargetComparator: ({ get: (request?: boolean | number, defaultValue?: (Comparator | undefined)) => Observable<(Comparator | undefined)> }),
    goalTargetValue: ({ get: (request?: boolean | number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)> }),
    limitMode: ({ get: (request?: boolean | number, defaultValue?: (RaceLimitMode | undefined)) => Observable<(RaceLimitMode | undefined)> }),
    limitValue: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)> }),
    raceType: ({ get: (request?: boolean | number, defaultValue?: (RaceType | undefined)) => Observable<(RaceType | undefined)> })
}


/** Race specific match configuration */
export interface RaceMatchConfigPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> }),
    bracketType: ({ get: (request?: boolean | number, defaultValue?: (BracketType | undefined)) => Promise<(BracketType | undefined)> }),

    /** Can players report results? */
    playerReportingEnabled: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> }),

    /** Accepted methods of verification that players can use */
    verificationMethods: ({ get: (request?: boolean | number, defaultValue?: ((MatchConfigVerificationMethod | undefined)[] | undefined)) => Promise<((MatchConfigVerificationMethod | undefined)[] | undefined)> }),

    /** Are players required to submit verification of their reported results? */
    verificationRequired: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)> })
}


/** Race specific match configuration */
export interface RaceMatchConfigObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> }),
    bracketType: ({ get: (request?: boolean | number, defaultValue?: (BracketType | undefined)) => Observable<(BracketType | undefined)> }),

    /** Can players report results? */
    playerReportingEnabled: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> }),

    /** Accepted methods of verification that players can use */
    verificationMethods: ({ get: (request?: boolean | number, defaultValue?: ((MatchConfigVerificationMethod | undefined)[] | undefined)) => Observable<((MatchConfigVerificationMethod | undefined)[] | undefined)> }),

    /** Are players required to submit verification of their reported results? */
    verificationRequired: ({ get: (request?: boolean | number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)> })
}


/** A set of actions available for a team to take */
export interface TeamActionSetPromiseChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)> })
}


/** A set of actions available for a team to take */
export interface TeamActionSetObservableChain {
    id: ({ get: (request?: boolean | number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)> })
}