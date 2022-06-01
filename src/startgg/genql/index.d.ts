import {
  FieldsSelection,
  GraphqlOperation,
  ClientOptions,
  Observable,
} from '@genql/runtime'
import { SubscriptionClient } from 'subscriptions-transport-ws'
export * from './schema'
import {
  QueryRequest,
  QueryPromiseChain,
  Query,
  MutationRequest,
  MutationPromiseChain,
  Mutation,
} from './schema'
export declare const createClient: (options?: ClientOptions) => Client
export declare const everything: { __scalar: boolean }
export declare const version: string

export interface Client {
  wsClient?: SubscriptionClient

  query<R extends QueryRequest>(
    request: R & { __name?: string },
  ): Promise<FieldsSelection<Query, R>>

  mutation<R extends MutationRequest>(
    request: R & { __name?: string },
  ): Promise<FieldsSelection<Mutation, R>>

  chain: {
    query: QueryPromiseChain

    mutation: MutationPromiseChain
  }
}

export type QueryResult<fields extends QueryRequest> = FieldsSelection<
  Query,
  fields
>

export declare const generateQueryOp: (
  fields: QueryRequest & { __name?: string },
) => GraphqlOperation
export type MutationResult<fields extends MutationRequest> = FieldsSelection<
  Mutation,
  fields
>

export declare const generateMutationOp: (
  fields: MutationRequest & { __name?: string },
) => GraphqlOperation

export declare const enumSocialConnectionType: {
  readonly TWITTER: 'TWITTER'
  readonly TWITCH: 'TWITCH'
  readonly DISCORD: 'DISCORD'
  readonly MIXER: 'MIXER'
  readonly XBOX: 'XBOX'
}

export declare const enumStreamType: {
  readonly TWITCH: 'TWITCH'
  readonly MIXER: 'MIXER'
}

export declare const enumAuthorizationType: {
  readonly TWITTER: 'TWITTER'
  readonly TWITCH: 'TWITCH'
  readonly STEAM: 'STEAM'
  readonly DISCORD: 'DISCORD'
  readonly XBOX: 'XBOX'
  readonly MIXER: 'MIXER'
}

export declare const enumSetSortType: {
  readonly NONE: 'NONE'
  readonly CALL_ORDER: 'CALL_ORDER'
  readonly MAGIC: 'MAGIC'
  readonly RECENT: 'RECENT'
  readonly STANDARD: 'STANDARD'
  readonly ROUND: 'ROUND'
}

export declare const enumGameSelectionType: {
  readonly CHARACTER: 'CHARACTER'
}

export declare const enumBracketType: {
  readonly SINGLE_ELIMINATION: 'SINGLE_ELIMINATION'
  readonly DOUBLE_ELIMINATION: 'DOUBLE_ELIMINATION'
  readonly ROUND_ROBIN: 'ROUND_ROBIN'
  readonly SWISS: 'SWISS'
  readonly EXHIBITION: 'EXHIBITION'
  readonly CUSTOM_SCHEDULE: 'CUSTOM_SCHEDULE'
  readonly MATCHMAKING: 'MATCHMAKING'
  readonly ELIMINATION_ROUNDS: 'ELIMINATION_ROUNDS'
  readonly RACE: 'RACE'
  readonly CIRCUIT: 'CIRCUIT'
}

export declare const enumActivityState: {
  readonly CREATED: 'CREATED'
  readonly ACTIVE: 'ACTIVE'
  readonly COMPLETED: 'COMPLETED'
  readonly READY: 'READY'
  readonly INVALID: 'INVALID'
  readonly CALLED: 'CALLED'
  readonly QUEUED: 'QUEUED'
}

export declare const enumStreamSource: {
  readonly TWITCH: 'TWITCH'
  readonly HITBOX: 'HITBOX'
  readonly STREAMME: 'STREAMME'
  readonly MIXER: 'MIXER'
}

export declare const enumTeamMemberStatus: {
  readonly UNKNOWN: 'UNKNOWN'
  readonly ACCEPTED: 'ACCEPTED'
  readonly INVITED: 'INVITED'
  readonly REQUEST: 'REQUEST'
  readonly ALUM: 'ALUM'
  readonly HIATUS: 'HIATUS'
  readonly OPEN_SPOT: 'OPEN_SPOT'
}

export declare const enumTeamMemberType: {
  readonly PLAYER: 'PLAYER'
  readonly STAFF: 'STAFF'
}

export declare const enumTournamentPaginationSort: {
  readonly startAt: 'startAt'
  readonly endAt: 'endAt'
  readonly eventRegistrationClosesAt: 'eventRegistrationClosesAt'
  readonly computedUpdatedAt: 'computedUpdatedAt'
}

export declare const enumComparator: {
  readonly GREATER_THAN: 'GREATER_THAN'
  readonly GREATER_THAN_OR_EQUAL: 'GREATER_THAN_OR_EQUAL'
  readonly EQUAL: 'EQUAL'
  readonly LESS_THAN_OR_EQUAL: 'LESS_THAN_OR_EQUAL'
  readonly LESS_THAN: 'LESS_THAN'
}

export declare const enumMatchConfigVerificationMethod: {
  readonly TWITCH: 'TWITCH'
  readonly STREAM_ME: 'STREAM_ME'
  readonly ANY: 'ANY'
  readonly MIXER: 'MIXER'
  readonly YOUTUBE: 'YOUTUBE'
}

export declare const enumRaceLimitMode: {
  readonly BEST_ALL: 'BEST_ALL'
  readonly FIRST_ALL: 'FIRST_ALL'
  readonly PLAYTIME: 'PLAYTIME'
}

export declare const enumRaceType: {
  readonly GOALS: 'GOALS'
  readonly TIMED: 'TIMED'
}
