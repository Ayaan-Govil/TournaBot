const {
  linkTypeMap,
  createClient: createClientOriginal,
  generateGraphqlOperation,
  assertSameVersion,
} = require('@genql/runtime')
var typeMap = linkTypeMap(require('./types.cjs.js'))

var version = '2.10.0'
assertSameVersion(version)

module.exports.version = version

module.exports.createClient = function(options) {
  options = options || {}
  var optionsCopy = {
    url: 'https://api.start.gg/gql/alpha',
    queryRoot: typeMap.Query,
    mutationRoot: typeMap.Mutation,
    subscriptionRoot: typeMap.Subscription,
  }
  for (var name in options) {
    optionsCopy[name] = options[name]
  }
  return createClientOriginal(optionsCopy)
}

module.exports.enumSocialConnectionType = {
  TWITTER: 'TWITTER',
  TWITCH: 'TWITCH',
  DISCORD: 'DISCORD',
  MIXER: 'MIXER',
  XBOX: 'XBOX',
}

module.exports.enumStreamType = {
  TWITCH: 'TWITCH',
  MIXER: 'MIXER',
}

module.exports.enumAuthorizationType = {
  TWITTER: 'TWITTER',
  TWITCH: 'TWITCH',
  STEAM: 'STEAM',
  DISCORD: 'DISCORD',
  XBOX: 'XBOX',
  MIXER: 'MIXER',
}

module.exports.enumSetSortType = {
  NONE: 'NONE',
  CALL_ORDER: 'CALL_ORDER',
  MAGIC: 'MAGIC',
  RECENT: 'RECENT',
  STANDARD: 'STANDARD',
  ROUND: 'ROUND',
}

module.exports.enumGameSelectionType = {
  CHARACTER: 'CHARACTER',
}

module.exports.enumBracketType = {
  SINGLE_ELIMINATION: 'SINGLE_ELIMINATION',
  DOUBLE_ELIMINATION: 'DOUBLE_ELIMINATION',
  ROUND_ROBIN: 'ROUND_ROBIN',
  SWISS: 'SWISS',
  EXHIBITION: 'EXHIBITION',
  CUSTOM_SCHEDULE: 'CUSTOM_SCHEDULE',
  MATCHMAKING: 'MATCHMAKING',
  ELIMINATION_ROUNDS: 'ELIMINATION_ROUNDS',
  RACE: 'RACE',
  CIRCUIT: 'CIRCUIT',
}

module.exports.enumActivityState = {
  CREATED: 'CREATED',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  READY: 'READY',
  INVALID: 'INVALID',
  CALLED: 'CALLED',
  QUEUED: 'QUEUED',
}

module.exports.enumStreamSource = {
  TWITCH: 'TWITCH',
  HITBOX: 'HITBOX',
  STREAMME: 'STREAMME',
  MIXER: 'MIXER',
}

module.exports.enumTeamMemberStatus = {
  UNKNOWN: 'UNKNOWN',
  ACCEPTED: 'ACCEPTED',
  INVITED: 'INVITED',
  REQUEST: 'REQUEST',
  ALUM: 'ALUM',
  HIATUS: 'HIATUS',
  OPEN_SPOT: 'OPEN_SPOT',
}

module.exports.enumTeamMemberType = {
  PLAYER: 'PLAYER',
  STAFF: 'STAFF',
}

module.exports.enumTournamentPaginationSort = {
  startAt: 'startAt',
  endAt: 'endAt',
  eventRegistrationClosesAt: 'eventRegistrationClosesAt',
  computedUpdatedAt: 'computedUpdatedAt',
}

module.exports.enumComparator = {
  GREATER_THAN: 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL: 'GREATER_THAN_OR_EQUAL',
  EQUAL: 'EQUAL',
  LESS_THAN_OR_EQUAL: 'LESS_THAN_OR_EQUAL',
  LESS_THAN: 'LESS_THAN',
}

module.exports.enumMatchConfigVerificationMethod = {
  TWITCH: 'TWITCH',
  STREAM_ME: 'STREAM_ME',
  ANY: 'ANY',
  MIXER: 'MIXER',
  YOUTUBE: 'YOUTUBE',
}

module.exports.enumRaceLimitMode = {
  BEST_ALL: 'BEST_ALL',
  FIRST_ALL: 'FIRST_ALL',
  PLAYTIME: 'PLAYTIME',
}

module.exports.enumRaceType = {
  GOALS: 'GOALS',
  TIMED: 'TIMED',
}

module.exports.generateQueryOp = function(fields) {
  return generateGraphqlOperation('query', typeMap.Query, fields)
}
module.exports.generateMutationOp = function(fields) {
  return generateGraphqlOperation('mutation', typeMap.Mutation, fields)
}
module.exports.generateSubscriptionOp = function(fields) {
  return generateGraphqlOperation('subscription', typeMap.Subscription, fields)
}
module.exports.everything = {
  __scalar: true,
}

var schemaExports = require('./guards.cjs.js')
for (var k in schemaExports) {
  module.exports[k] = schemaExports[k]
}
