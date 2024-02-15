import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom';

import './App.css';
import Topbar from './components/Topbar';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Mailbox from './components/Mailbox/Mailbox';
import Inbox from './components/Mailbox/Inbox';
import Sent from './components/Mailbox/Sent';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Topbar/>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/signup'/>
          </Route>
          <Route path='/signup'>
            <Signup/>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/mailbox'>
            <Mailbox/>
          </Route>
          <Route path='/inbox'>
            <Inbox/>
          </Route>
          <Route path='/sent'>
            <Sent/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
