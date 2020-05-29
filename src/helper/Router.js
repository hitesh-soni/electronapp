import React from 'react'
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Home from '../components/Home';
import { connect } from "react-redux";

const RouterModule = ({userLogin}) => {
  
    return (
        <Router>
            <Switch>
              <Route exact path="/" >
                {userLogin ? <Redirect to="/home" /> : <Login />}
              </Route>
              <Route exact path="/register" >
               {userLogin ? <Redirect to="/home" /> : <Register />}
              </Route>

              <Route exact path="/home" >

              {!userLogin ? <Redirect to="/" /> : <Home />}
              </Route>
              <Route exact path="*"  >
                <Redirect to="/" />
                </Route>
            </Switch>     
      </Router>
    )
}

const mapStateToProps = ({ users }) => ({
  userLogin: users.isLoggedin,
});

export default connect(mapStateToProps,{})(RouterModule)