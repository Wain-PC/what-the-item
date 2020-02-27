import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import * as actions from "./actions";
import * as screens from "./screens";
import "semantic-ui-css/semantic.min.css";
import AdminMenu from "./components/menu/menu";

class App extends PureComponent {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {};

  render() {
    const routes = Object.entries(screens).map(([path, component]) => (
      <Route key={path} exact path={`/${path}`} component={component} />
    ));

    return (
      <BrowserRouter>
        <Grid centered columns={1}>
          <Grid.Column width={16}>
            <AdminMenu />
          </Grid.Column>
          <Grid.Column padded="relaxed" width={14}>
            <Switch>
              <Route exact path="/" component={screens.dashboard} />
              {routes}
            </Switch>
          </Grid.Column>
        </Grid>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = actions;
export default connect(mapStateToProps, mapDispatchToProps)(App);
