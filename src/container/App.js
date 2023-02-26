import React, { useEffect } from "react";
import ApiProgress from '../shared/ApiProgress';
import UserSignUpPage from '../pages/UserSignUpPage';
import UserLoginPage from '../pages/UserLoginPage';
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import { HashRouter, Route, Redirect, Switch, useHistory } from 'react-router-dom';
import Header from "../components/layout/Header";
import { useSelector } from "react-redux";
import SettingsPage from "../pages/SettingsPage";
import DertPage from "../pages/DertPage";

const App = (props) => {
  const { username, isLoggedIn } = useSelector((store) => ({ isLoggedIn: store.isLoggedIn, username: store.username}));
  
  return (
    <>
      <HashRouter>
        <Header />
        <Switch>
          {!isLoggedIn &&
            <>
              <Route path="/login" component={UserLoginPage} />
              <Route path="/signup" component={UserSignUpPage} />
            </>
          }
          <Route exact path="/" component={HomePage} />
          {isLoggedIn &&
            <>
              <Route path="/users/:username" component={UserPage} />
              <Route path="/dertler/info/:id" component={DertPage} />
              <Route path="/:username/settings" component={SettingsPage} />
            </>
          }          
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
