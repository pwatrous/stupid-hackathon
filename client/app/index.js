import React from 'react';
import {render} from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import { Redirect } from 'react-router'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Order from './components/Order';

import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

import './styles/styles.scss';

render((
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={() => {
            return <Redirect to='/login'/>;
          }}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/order" component={Order}/>
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Router>
  </Provider>
), document.getElementById('app'));
