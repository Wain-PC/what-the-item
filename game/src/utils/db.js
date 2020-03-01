import { gql } from "apollo-boost";
import { query, mutation } from "./request";

const startGame = ({ players }) => {
  return mutation(
    gql`
      mutation startGame($players: [InputPlayer!]!) {
        startGame(players: $players) {
          _id
          config {
            ...allConfig
          }
          finished
          startedOn
          finishedOn
          players {
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
              _id
              image
              title
              incorrectTitles
            }
            index
            selection {
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
};

const endGame = async ({ gameId, winner }) => {
  return mutation(
    gql`
      mutation endGame($gameId: ID!, $winner: InputWinner!) {
        endGame(gameId: $gameId, winner: $winner) {
          _id
          winner {
            name
            score
          }
        }
      }
    `,
    { gameId, winner }
  );
};

const startRound = ({ gameId, index }) => {
  return mutation(
    gql`
      mutation startRound($gameId: ID!, $index: Int!) {
        startRound(gameId: $gameId, index: $index) {
          _id
        }
      }
    `,
    { gameId, index }
  );
};

const endRound = ({ gameId, round }) => {
  return mutation(
    gql`
      mutation endRound($gameId: ID!, $round: InputRound!) {
        endRound(gameId: $gameId, round: $round) {
          _id
        }
      }
    `,
    { gameId, round }
  );
};

const getTopPlayers = async () => {
  return query(
    gql`
      {
        topPlayers {
          players {
            name
            score
          }
        }
      }
    `
  );
};

const setNickName = async ({ gameId, nickName }) => {
  return mutation(
    gql`
      mutation setNickName($gameId: ID!, $nickName: String!) {
        setNickName(gameId: $gameId, nickName: $nickName) {
          _id
        }
      }
    `,
    { gameId, nickName }
  );
};

export { startGame, startRound, endRound, endGame, getTopPlayers, setNickName };
