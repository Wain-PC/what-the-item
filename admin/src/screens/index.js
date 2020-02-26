import { connect } from "react-redux";
import * as actions from "../actions";

import Dashboard from "./dashboard";
import TopPlayers from "./topPlayers";
import Games from "./games";
import Config from "./config";
import Image from "./image";

const mapStateToProps = (state, ownProps) => {
  const {
    match: { path }
  } = ownProps;

  console.log(path);

  return state[path.slice(1)];
};

const mapDispatchToProps = actions;

const connected = connect(mapStateToProps, mapDispatchToProps);

const dashboard = connected(Dashboard);
const topPlayers = connected(TopPlayers);
const games = connected(Games);
const config = connected(Config);
const image = connected(Image);

export { dashboard, topPlayers, games, config, image };
