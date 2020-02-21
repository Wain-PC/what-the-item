const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const schema = gql`
  scalar Date

  type Player {
    index: Int!
    score: Int!
    name: String!
  }

  type Picture {
    picture: String!
    selected: Boolean!
    selectedBy: Int!
  }

  type Round {
    index: Int!
    pictures: [Picture]!
    answered: Boolean!
    answerIndex: Int!
    answeredBy: Boolean!
    timeLeft: Int!
    pointsReceived: Int!
  }

  type ConfigTimers {
    controls: Int!
    round: Int!
    roundEnd: Int!
  }

  type ConfigGameplay {
    defaultPlayers: Int!
    minPlayers: Int!
    maxPlayers: Int!
    roundsInGame: Int!
    answersInRound: Int!
    maxPointsPerRound: Int!
    winnerNickNameMaxLetters: Int!
    winnerNickNameLetterTable: String!
    topPlayers: Int!
  }

  type Config {
    timers: ConfigTimers!
    gameplay: ConfigGameplay!
  }

  type Game {
    config: Config!
    finished: Boolean!
    players: [Player]!
    rounds: [Round]!
    winner: Player
    startedOn: Date
    finishedOn: Date
  }

  type PlayersResponse {
    players: [Player]!
    total: Int
  }

  type GamesResponse {
    games: [Game]!
    total: Int
    finished: Int
  }

  type Query {
    topPlayers: PlayersResponse!
    topGames: GamesResponse!
    config: Config!
  }
`;

module.exports = schema;
