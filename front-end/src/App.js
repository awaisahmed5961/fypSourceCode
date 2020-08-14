import React from 'react';
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';

import theme from "./components/Ui/Theme";
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}


function App() {
  return (
    <AuthState>
      <ThemeProvider theme={theme}>
        <Router>
          <div >
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route exact path="/login" component={SignIn} />
              <Route exact path="/register_user" component={SignUp} />

              <Route path="" component={NotFound} />

              {/*<Route exact path="/" component={}/> */}

            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </AuthState>
  );
}

export default App;
