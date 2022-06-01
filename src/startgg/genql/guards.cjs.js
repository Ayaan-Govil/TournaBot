
var Query_possibleTypes = ['Query']
module.exports.isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var User_possibleTypes = ['User']
module.exports.isUser = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}



var ProfileAuthorization_possibleTypes = ['ProfileAuthorization']
module.exports.isProfileAuthorization = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isProfileAuthorization"')
  return ProfileAuthorization_possibleTypes.includes(obj.__typename)
}



var Stream_possibleTypes = ['Stream']
module.exports.isStream = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isStream"')
  return Stream_possibleTypes.includes(obj.__typename)
}



var EventConnection_possibleTypes = ['EventConnection']
module.exports.isEventConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEventConnection"')
  return EventConnection_possibleTypes.includes(obj.__typename)
}



var PageInfo_possibleTypes = ['PageInfo']
module.exports.isPageInfo = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPageInfo"')
  return PageInfo_possibleTypes.includes(obj.__typename)
}



var Event_possibleTypes = ['Event']
module.exports.isEvent = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEvent"')
  return Event_possibleTypes.includes(obj.__typename)
}



var EntrantConnection_possibleTypes = ['EntrantConnection']
module.exports.isEntrantConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEntrantConnection"')
  return EntrantConnection_possibleTypes.includes(obj.__typename)
}



var Entrant_possibleTypes = ['Entrant']
module.exports.isEntrant = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEntrant"')
  return Entrant_possibleTypes.includes(obj.__typename)
}



var SetConnection_possibleTypes = ['SetConnection']
module.exports.isSetConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSetConnection"')
  return SetConnection_possibleTypes.includes(obj.__typename)
}



var Set_possibleTypes = ['Set']
module.exports.isSet = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSet"')
  return Set_possibleTypes.includes(obj.__typename)
}



var Game_possibleTypes = ['Game']
module.exports.isGame = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGame"')
  return Game_possibleTypes.includes(obj.__typename)
}



var Image_possibleTypes = ['Image']
module.exports.isImage = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isImage"')
  return Image_possibleTypes.includes(obj.__typename)
}



var GameSelection_possibleTypes = ['GameSelection']
module.exports.isGameSelection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGameSelection"')
  return GameSelection_possibleTypes.includes(obj.__typename)
}



var Participant_possibleTypes = ['Participant']
module.exports.isParticipant = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isParticipant"')
  return Participant_possibleTypes.includes(obj.__typename)
}



var ContactInfo_possibleTypes = ['ContactInfo']
module.exports.isContactInfo = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isContactInfo"')
  return ContactInfo_possibleTypes.includes(obj.__typename)
}



var Player_possibleTypes = ['Player']
module.exports.isPlayer = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPlayer"')
  return Player_possibleTypes.includes(obj.__typename)
}



var PlayerRank_possibleTypes = ['PlayerRank']
module.exports.isPlayerRank = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPlayerRank"')
  return PlayerRank_possibleTypes.includes(obj.__typename)
}



var Stage_possibleTypes = ['Stage']
module.exports.isStage = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isStage"')
  return Stage_possibleTypes.includes(obj.__typename)
}



var PhaseGroup_possibleTypes = ['PhaseGroup']
module.exports.isPhaseGroup = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPhaseGroup"')
  return PhaseGroup_possibleTypes.includes(obj.__typename)
}



var SeedConnection_possibleTypes = ['SeedConnection']
module.exports.isSeedConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSeedConnection"')
  return SeedConnection_possibleTypes.includes(obj.__typename)
}



var Seed_possibleTypes = ['Seed']
module.exports.isSeed = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSeed"')
  return Seed_possibleTypes.includes(obj.__typename)
}



var Phase_possibleTypes = ['Phase']
module.exports.isPhase = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPhase"')
  return Phase_possibleTypes.includes(obj.__typename)
}



var PhaseGroupConnection_possibleTypes = ['PhaseGroupConnection']
module.exports.isPhaseGroupConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPhaseGroupConnection"')
  return PhaseGroupConnection_possibleTypes.includes(obj.__typename)
}



var Wave_possibleTypes = ['Wave']
module.exports.isWave = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isWave"')
  return Wave_possibleTypes.includes(obj.__typename)
}



var Progression_possibleTypes = ['Progression']
module.exports.isProgression = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isProgression"')
  return Progression_possibleTypes.includes(obj.__typename)
}



var Standing_possibleTypes = ['Standing']
module.exports.isStanding = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isStanding"')
  return Standing_possibleTypes.includes(obj.__typename)
}



var StandingContainer_possibleTypes = ['Tournament','Event','PhaseGroup','Set']
module.exports.isStandingContainer = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isStandingContainer"')
  return StandingContainer_possibleTypes.includes(obj.__typename)
}



var Tournament_possibleTypes = ['Tournament']
module.exports.isTournament = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTournament"')
  return Tournament_possibleTypes.includes(obj.__typename)
}



var TournamentLinks_possibleTypes = ['TournamentLinks']
module.exports.isTournamentLinks = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTournamentLinks"')
  return TournamentLinks_possibleTypes.includes(obj.__typename)
}



var ParticipantConnection_possibleTypes = ['ParticipantConnection']
module.exports.isParticipantConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isParticipantConnection"')
  return ParticipantConnection_possibleTypes.includes(obj.__typename)
}



var StationsConnection_possibleTypes = ['StationsConnection']
module.exports.isStationsConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isStationsConnection"')
  return StationsConnection_possibleTypes.includes(obj.__typename)
}



var Stations_possibleTypes = ['Stations']
module.exports.isStations = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isStations"')
  return Stations_possibleTypes.includes(obj.__typename)
}



var StreamQueue_possibleTypes = ['StreamQueue']
module.exports.isStreamQueue = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isStreamQueue"')
  return StreamQueue_possibleTypes.includes(obj.__typename)
}



var Streams_possibleTypes = ['Streams']
module.exports.isStreams = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isStreams"')
  return Streams_possibleTypes.includes(obj.__typename)
}



var TeamConnection_possibleTypes = ['TeamConnection']
module.exports.isTeamConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTeamConnection"')
  return TeamConnection_possibleTypes.includes(obj.__typename)
}



var Team_possibleTypes = ['EventTeam','GlobalTeam']
module.exports.isTeam = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTeam"')
  return Team_possibleTypes.includes(obj.__typename)
}



var TeamMember_possibleTypes = ['TeamMember']
module.exports.isTeamMember = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTeamMember"')
  return TeamMember_possibleTypes.includes(obj.__typename)
}



var StandingStats_possibleTypes = ['StandingStats']
module.exports.isStandingStats = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isStandingStats"')
  return StandingStats_possibleTypes.includes(obj.__typename)
}



var Score_possibleTypes = ['Score']
module.exports.isScore = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isScore"')
  return Score_possibleTypes.includes(obj.__typename)
}



var Round_possibleTypes = ['Round']
module.exports.isRound = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRound"')
  return Round_possibleTypes.includes(obj.__typename)
}



var StandingConnection_possibleTypes = ['StandingConnection']
module.exports.isStandingConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isStandingConnection"')
  return StandingConnection_possibleTypes.includes(obj.__typename)
}



var SetSlot_possibleTypes = ['SetSlot']
module.exports.isSetSlot = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSetSlot"')
  return SetSlot_possibleTypes.includes(obj.__typename)
}



var League_possibleTypes = ['League']
module.exports.isLeague = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isLeague"')
  return League_possibleTypes.includes(obj.__typename)
}



var EventOwnerConnection_possibleTypes = ['EventOwnerConnection']
module.exports.isEventOwnerConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEventOwnerConnection"')
  return EventOwnerConnection_possibleTypes.includes(obj.__typename)
}



var EventOwner_possibleTypes = ['EventOwner']
module.exports.isEventOwner = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEventOwner"')
  return EventOwner_possibleTypes.includes(obj.__typename)
}



var EventTier_possibleTypes = ['EventTier']
module.exports.isEventTier = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEventTier"')
  return EventTier_possibleTypes.includes(obj.__typename)
}



var Videogame_possibleTypes = ['Videogame']
module.exports.isVideogame = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isVideogame"')
  return Videogame_possibleTypes.includes(obj.__typename)
}



var Character_possibleTypes = ['Character']
module.exports.isCharacter = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isCharacter"')
  return Character_possibleTypes.includes(obj.__typename)
}



var TeamRosterSize_possibleTypes = ['TeamRosterSize']
module.exports.isTeamRosterSize = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTeamRosterSize"')
  return TeamRosterSize_possibleTypes.includes(obj.__typename)
}



var LeagueConnection_possibleTypes = ['LeagueConnection']
module.exports.isLeagueConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isLeagueConnection"')
  return LeagueConnection_possibleTypes.includes(obj.__typename)
}



var Address_possibleTypes = ['Address']
module.exports.isAddress = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAddress"')
  return Address_possibleTypes.includes(obj.__typename)
}



var TournamentConnection_possibleTypes = ['TournamentConnection']
module.exports.isTournamentConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTournamentConnection"')
  return TournamentConnection_possibleTypes.includes(obj.__typename)
}



var Shop_possibleTypes = ['Shop']
module.exports.isShop = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isShop"')
  return Shop_possibleTypes.includes(obj.__typename)
}



var ShopLevelConnection_possibleTypes = ['ShopLevelConnection']
module.exports.isShopLevelConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isShopLevelConnection"')
  return ShopLevelConnection_possibleTypes.includes(obj.__typename)
}



var ShopLevel_possibleTypes = ['ShopLevel']
module.exports.isShopLevel = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isShopLevel"')
  return ShopLevel_possibleTypes.includes(obj.__typename)
}



var ShopOrderMessageConnection_possibleTypes = ['ShopOrderMessageConnection']
module.exports.isShopOrderMessageConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isShopOrderMessageConnection"')
  return ShopOrderMessageConnection_possibleTypes.includes(obj.__typename)
}



var ShopOrderMessage_possibleTypes = ['ShopOrderMessage']
module.exports.isShopOrderMessage = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isShopOrderMessage"')
  return ShopOrderMessage_possibleTypes.includes(obj.__typename)
}



var VideogameConnection_possibleTypes = ['VideogameConnection']
module.exports.isVideogameConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isVideogameConnection"')
  return VideogameConnection_possibleTypes.includes(obj.__typename)
}



var Mutation_possibleTypes = ['Mutation']
module.exports.isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var ActionSet_possibleTypes = ['TeamActionSet']
module.exports.isActionSet = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isActionSet"')
  return ActionSet_possibleTypes.includes(obj.__typename)
}



var BracketConfig_possibleTypes = ['RaceBracketConfig']
module.exports.isBracketConfig = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isBracketConfig"')
  return BracketConfig_possibleTypes.includes(obj.__typename)
}



var EventTeam_possibleTypes = ['EventTeam']
module.exports.isEventTeam = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEventTeam"')
  return EventTeam_possibleTypes.includes(obj.__typename)
}



var GlobalTeam_possibleTypes = ['GlobalTeam']
module.exports.isGlobalTeam = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGlobalTeam"')
  return GlobalTeam_possibleTypes.includes(obj.__typename)
}



var EventTeamConnection_possibleTypes = ['EventTeamConnection']
module.exports.isEventTeamConnection = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isEventTeamConnection"')
  return EventTeamConnection_possibleTypes.includes(obj.__typename)
}



var MatchConfig_possibleTypes = ['RaceMatchConfig']
module.exports.isMatchConfig = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMatchConfig"')
  return MatchConfig_possibleTypes.includes(obj.__typename)
}



var RaceBracketConfig_possibleTypes = ['RaceBracketConfig']
module.exports.isRaceBracketConfig = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRaceBracketConfig"')
  return RaceBracketConfig_possibleTypes.includes(obj.__typename)
}



var RaceMatchConfig_possibleTypes = ['RaceMatchConfig']
module.exports.isRaceMatchConfig = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRaceMatchConfig"')
  return RaceMatchConfig_possibleTypes.includes(obj.__typename)
}



var TeamActionSet_possibleTypes = ['TeamActionSet']
module.exports.isTeamActionSet = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTeamActionSet"')
  return TeamActionSet_possibleTypes.includes(obj.__typename)
}
