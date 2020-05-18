import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  Twitter as TwitterView,
  Facebook as FacebookView,
  Settings as SettingsView,
  SignUp as SignUpView,
  NotFound as NotFoundView,
  Quora as QuoraView,
  Reddit as RedditView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={FacebookView}
        exact
        layout={MainLayout}
        path="/facebook"
      />
      <RouteWithLayout
        component={TwitterView}
        exact
        layout={MainLayout}
        path="/twitter"
      />
      {/* <RouteWithLayout
        exact
        layout={MainLayout}
        path="/linkedin"
      /> */}
      <RouteWithLayout
        component={RedditView}
        exact
        layout={MainLayout}
        path="/reddit"
      />
      <RouteWithLayout
        component={QuoraView}
        exact
        layout={MainLayout}
        path="/quora"
      />

      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
