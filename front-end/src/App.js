import React from 'react';
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './components/NotFound';

import theme from "./components/Ui/Theme";
import AuthState from './context/auth/AuthState';
import CourseState from './context/course/CourseState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import CourseDetail from './pages/CourseDetail';
import TopicDetail from './pages/TopicDetail';
import Topic from './pages/Topic';
import TopicState from './context/topic/TopicState';


if (localStorage.token) {
  setAuthToken(localStorage.token)
}


function App() {

  return (
    <AuthState>
      <CourseState>
        <TopicState>
          <ThemeProvider theme={theme}>
            <Router>
              <div >
                <Switch>
                  <Route exact path="/login" component={SignIn} />
                  <Route exact path="/register_user" component={SignUp} />
                  <PrivateRoute exact path="/" label="Home" component={Dashboard} />
                  <PrivateRoute exact path="/courseform" component={Course} />
                  <PrivateRoute exact path="/topic" component={Topic} />
                  {/* <PrivateRoute exact path="/topic" render={props => <Topic {...props} key={this.props.location.search} />} /> */}
                  <PrivateRoute exact path="/course/:id?" component={CourseDetail} />
                  <PrivateRoute exact path="/topic/:id?" component={TopicDetail} />
                  <PrivateRoute exact path="/editor" component={() => {
                    return (
                      <div>Hello from editor</div>
                    )
                  }} />
                  <PrivateRoute exact path={`/:title/:topictitle`} component={TopicDetail} />


                  <Route path="" component={NotFound} />

                  {/* <Route exact path="/login" component={SignIn} />
                  <Route exact path="/register_user" component={SignUp} />
                  <PrivateRoute exact path="/" label="Home" component={Dashboard} />
                  <PrivateRoute exact path="/course/:id?" component={Course} />
                  <PrivateRoute exact path="/topic" component={Topic} />
                  <PrivateRoute exact path="/editor" component={() => {
                    return (
                      <div>Hello from editor</div>
                    )
                  }} />
                  <PrivateRoute exact path={`/:title/:topictitle`} component={TopicDetail} />
                  <PrivateRoute exact path="/:title" component={CourseDetail} />

                  <Route path="" component={NotFound} /> */}

                </Switch>
              </div>
            </Router>
          </ThemeProvider>
        </TopicState>
      </CourseState>
    </AuthState>
  );
}

export default App;
// props.data.name.split(' ').join('')