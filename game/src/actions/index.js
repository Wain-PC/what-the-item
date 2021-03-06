import * as screen from "./screen";
import * as game from "./game";
import * as gameEnd from "./gameEnd";
import * as ready from "./ready";
import * as timer from "./timer";
import * as top from "./top";
import * as loading from "./loading";
import * as translation from "./translation";

const actions = {
  ...screen,
  ...game,
  ...gameEnd,
  ...ready,
  ...timer,
  ...top,
  ...loading,
  ...translation
};

export default actions;
