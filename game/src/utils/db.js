import { gql } from "apollo-boost";
import { query, mutation } from "./request";

const getConfig = async () => {
  const {
    data: { config }
  } = await query(gql`
    {
      config {
        gameplay {
          topPlayers
        }
        timers {
          controls
        }
      }
    }
  `);

  return config;
};

const startGame = async ({ players }) => {
  const {
    data: { startGame: game }
  } = await mutation(
    gql`
      mutation startGame {
        startGame {
          _id
          config {
            gameplay {
              answersInRound
              maxPointsPerRound
              roundsInGame
              topPlayers
              winnerNickNameLetterTable
              winnerNickNameMaxLetters
              contactMaxLetters
              contactLetterTable
            }
            timers {
              controls
              round
              roundEnd
            }
          }
          finished
          startedOn
          finishedOn
          player {
            _id
            index
            name
            score
          }
          rounds {
            answerIndex
            answered
            answeredBy
            finished
            image {
              image
            }
            index
            selection {
              title
              selected
              selectedBy
            }
            started
          }
        }
      }
    `,
    { players }
  );

  return game;
};

const endGame = async ({ gameId, winner }) => {
  const {
    data: { endGame: game }
  } = await mutation(
    gql`
      mutation endGame($gameId: ID!, $winner: InputWinner!) {
        endGame(gameId: $gameId, winner: $winner) {
          _id
          player {
            name
            score
          }
        }
      }
    `,
    { gameId, winner }
  );

  return game;
};

const startRound = async ({ gameId, index }) => {
  const {
    data: { startRound: game }
  } = await mutation(
    gql`
      mutation startRound($gameId: ID!, $index: Int!) {
        startRound(gameId: $gameId, index: $index) {
          _id
        }
      }
    `,
    { gameId, index }
  );

  return game;
};

const endRound = async ({ gameId, round }) => {
  const {
    data: { endRound: game }
  } = await mutation(
    gql`
      mutation endRound($gameId: ID!, $round: InputRound!) {
        endRound(gameId: $gameId, round: $round) {
          _id
        }
      }
    `,
    { gameId, round }
  );

  return game;
};

const getTopPlayers = async () => {
  const {
    data: { topPlayers }
  } = await query(
    gql`
      {
        topPlayers {
          players {
            gameId
            name
            score
          }
        }
      }
    `
  );

  return topPlayers;
};

const setNickName = async ({ gameId, nickName }) => {
  const {
    data: { setNickName: game }
  } = await mutation(
    gql`
      mutation setNickName($gameId: ID!, $nickName: String!) {
        setNickName(gameId: $gameId, nickName: $nickName) {
          _id
        }
      }
    `,
    { gameId, nickName }
  );

  return game;
};

export {
  getConfig,
  startGame,
  startRound,
  endRound,
  endGame,
  getTopPlayers,
  setNickName
};
