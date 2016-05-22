import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {selectScreen} from './data/actionCreators.js';
import App from './components/App/App.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import ProjectPage from './components/ProjectPage/ProjectPage.jsx';
import {isClient} from './utils.js';
import * as tracker from './tracker.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute
      component={HomePage}
      onEnter={() => {
        tracker.setPage('home');
      }}
    />

    <Route
      path="/s/:screenKey/:projectSlug/:screenSlug"
      component={ProjectPage}
      onEnter={nextState => {
        console.log('  --  >  routes.js:24 >  > nextState.params:', nextState.params);
        tracker.setPage('screen');
        if (isClient) selectScreen(nextState.params.screenKey);
      }}
    />
  </Route>
);
