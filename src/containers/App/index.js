import React from 'react';
import Header from '../../components/Header';
import Player from '../../components/Player';
import DevTool from '../../components/DevTool';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import Home from '../Home';
import Shows from '../Shows';
import ShowBase from '../ShowBase';
import NotFound from '../NotFound';

function App() {
  return (
    <div>
      <Header />
      <Player />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shows" exact component={Shows} />
        <Route path="/shows/:showSlug" component={ShowBase} />
        <Route component={NotFound} />
      </Switch>
      <DevTool />
    </div>
  );
}


export default App;
