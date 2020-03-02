const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const schema = gql`
  scalar Date

  type Player {
    _id: ID
    gameId: ID
    index: Int!
    score: Int!
    name: String!
  }

  type Image {
    _id: ID!
    image: String!
    extension: String!
    title: String!
    incorrectTitles: [String]!
    active: Boolean!
  }

  type Selection {
    title: String!
    selected: Boolean!
    selectedBy: Int!
  }

  type Round {
    index: Int!
    image: Image!
    selection: [Selection!]!
    started: Boolean!
    finished: Boolean!
    answered: Boolean!
    answerIndex: Int
    answeredBy: Int
    timeLeft: Int
    pointsReceived: Int
  }

  type ConfigTimers {
    controls: Int!
    round: Int!
    roundEnd: Int!
  }

  fragment allTimers on ConfigTimers {
    controls
    round
    roundEnd
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

  fragment allGameplayTimers on ConfigGameplay {
    defaultPlayers
    minPlayers
    maxPlayers
    roundsInGame
    answersInRound
    maxPointsPerRound
    winnerNickNameMaxLetters
    winnerNickNameLetterTable
    topPlayers
  }

  type Config {
    timers: ConfigTimers!
    gameplay: ConfigGameplay!
  }

  fragment allConfig on Config {
    timers {
      ...allTimers
    }
    gameplay {
      ...allGameplayTimers
    }
  }

  type Game {
    _id: ID!
    config: Config
    finished: Boolean!
    players: [Player!]!
    rounds: [Round!]!
    currentRound: Int!
    winner: Player
    startedOn: Date
    finishedOn: Date
  }

  type PlayersResponse {
    players: [Player!]!
    total: Int
  }

  type GamesResponse {
    games: [Game!]!
    total: Int
    finished: Int
  }

  type ImagesResponse {
    images: [Image!]!
    total: Int!
    active: Int!
  }

  type Query {
    topPlayers: PlayersResponse!
    players: PlayersResponse!
    games: GamesResponse!
    game(_id: ID!): Game!
    config: Config!
    images: ImagesResponse!
    image(_id: ID!): Image!
    nRandomImages(n: Int!): [Image]!
  }

  input InputPlayer {
    index: Int!
    score: Int!
    name: String!
  }

  input InputWinner {
    index: Int!
    score: Int!
    name: String!
  }

  input InputConfigTimers {
    controls: Int
    round: Int
    roundEnd: Int
  }

  input InputConfigGameplay {
    defaultPlayers: Int
    minPlayers: Int
    maxPlayers: Int
    roundsInGame: Int
    answersInRound: Int
    maxPointsPerRound: Int
    winnerNickNameMaxLetters: Int
    winnerNickNameLetterTable: String
    topPlayers: Int
  }

  input InputConfig {
    timers: InputConfigTimers
    gameplay: InputConfigGameplay
  }

  input InputImage {
    _id: String
    image: String!
    title: String!
    incorrectTitles: [String]!
    active: Boolean!
  }

  input InputSelection {
    selected: Boolean!
    selectedBy: Int!
  }

  input InputRound {
    index: Int
    selection: [InputSelection!]
    answered: Boolean!
    answerIndex: Int
    answeredBy: Int
    timeLeft: Int
    pointsReceived: Int
  }

  type Mutation {
    startGame(players: [InputPlayer!]!): Game!
    endGame(gameId: ID!, winner: InputWinner!): Game!
    startRound(gameId: ID!, index: Int!): Game!
    endRound(gameId: ID!, round: InputRound!): Game!
    setNickName(gameId: ID!, nickName: String!): Game!
    saveConfig(config: InputConfig!): Config!
    saveImage(image: InputImage!): Image!
    removeImage(_id: ID!): ImagesResponse!
  }
`;

module.exports = schema;
