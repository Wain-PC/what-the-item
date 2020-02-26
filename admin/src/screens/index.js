import { connect } from "react-redux";
import * as actions from "../actions";

import Dashboard from "./dashboard";
import TopPlayers from "./topPlayers";
import Games from "./games";
import Config from "./config";
import Image from "./image";
import Images from "./images";

const mapStateToProps = (state, ownProps) => {
  const {
    match: { path }
  } = ownProps;

  return state[path.slice(1)];
};

const mapDispatchToProps = actions;

const connected = connect(mapStateToProps, mapDispatchToProps);

const dashboard = connected(Dashboard);
const topPlayers = connected(TopPlayers);
const games = connected(Games);
const config = connected(Config);
const image = connected(Image);
const images = connected(Images);

export { dashboard, topPlayers, games, config, image, images };
