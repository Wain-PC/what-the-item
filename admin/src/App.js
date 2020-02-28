import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import * as actions from "./actions";
import * as screens from "./screens";
import "semantic-ui-css/semantic.min.css";
import AdminMenu from "./components/menu/menu";
import { ConnectedLoader } from "./components/loader/loader";
import { ConnectedError } from "./components/error/error";

class App extends PureComponent {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {};

  render() {
    const routes = Object.entries(screens).map(([path, component]) => (
      <Route key={path} exact path={`/${path}`} component={component} />
    ));

    return (
      <BrowserRouter>
        <>
          <ConnectedLoader />
          <Grid centered columns={1}>
            <Grid.Column width={16}>
              <AdminMenu />
              <ConnectedError />
            </Grid.Column>
            <Grid.Column width={14}>
              <Switch>
                <Route exact path="/" component={screens.dashboard} />
                <Route path="/image/:id" component={screens.image} />
                <Route path="/game/:id" component={screens.game} />
                {routes}
              </Switch>
            </Grid.Column>
          </Grid>
        </>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = actions;
export default connect(mapStateToProps, mapDispatchToProps)(App);
