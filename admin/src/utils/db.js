import request from "./request";

const getPlayers = ({ page } = {}) => {
  return request("players", { page });
};
const getGames = ({ page } = {}) => {
  return request("games", { page });
};

export { getPlayers, getGames };
