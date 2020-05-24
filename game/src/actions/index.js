import * as screen from "./screen";
import * as game from "./game";
import * as gameEnd from "./gameEnd";
import * as ready from "./ready";
import * as timer from "./timer";
import * as top from "./top";
import * as loading from "./loading";

const actions = {
  ...screen,
  ...game,
  ...gameEnd,
  ...ready,
  ...timer,
  ...top,
  ...loading
};

console.log(actions);

export default actions;
