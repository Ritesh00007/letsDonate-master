import React, { Component } from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar.js';
import Home from './components/Home.js';
import Products from './components/Products.js';
import Fundraisers from './components/Fundraisers.js';
import User from './components/User.js';
import ProductPost from './components/ProductPost.js';
import FundraiserPost from './components/FundraiserPost.js';
import SearchResult from './components/searchResult.js';
import MessageList from './components/MessageList.js';

import history from './components/backend/history.js';
import ChatSpace from './components/ChatSpace.js';
import register from './components/register.js'
import recovery from './components/recovery.js'
import AvailableChatUsers from './components/AvailableChatUsers';
import currentUser from './components/backend/currentUser.js'; // helper functions to set and get current logged in user

/*
**  App.js
**
**  This the application.
*/

class App extends Component {
  render() {
    let tempUserEmail = "noemail@email.com";
    var client = currentUser.getUser().email;
    return (
    <Router history={history}>
      <div className="App">
        {/* This NavBar component will stay at the top regardless of what page the user is on.*/}
        <NavBar currentUser={client}/>
        {/* This switch will allow the user to navigate between each page and url extension. */}
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/Products" component={Products} />
          {/* <Route path="/Fundraisers" component={Fundraisers} /> */}
          <Route path="/Fundraisers" component={() => <Fundraisers currentUser={client}/>}/>
          {/* Dynamic route for users by using email */}
          <Route path="/User/:email" component={User} />
          {/* Dynamic route for products by using the product name */}
          <Route path="/Product/:id" component={ProductPost} />
          <Route path="/Fundraiser/:id" component={FundraiserPost} />
          <Route path="/search/:table/:term" component={SearchResult} />
          <Route path="/search/products" component={Products} />
          <Route path="/search/fundraisers" component={Fundraisers} />
          <Route path="/register" component={register} />
          <Route path="/recovery" component={recovery} />
          {/*<Route path="/chat" component={ChatRoom} />*/}
          <Route path="/users" component={AvailableChatUsers} />
          <Route path="/chatSpace" component={ChatSpace} />
          <Route component={Error} />
        </Switch>
        {tempUserEmail.localeCompare(client) !== 0 &&
          <MessageList/>
        }
      </div>
    </Router>
  );}
}

export default App;
