import React, { Component } from 'react';
import { Route } from 'react-router';
import { AuthContextComponent } from './AuthContext';
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Logout from './pages/Logout';
import MyBookmarks from './pages/MyBookmarks';
import AddBookmark from './pages/AddBookmark';


export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <AuthContextComponent>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/logout' component={Logout} />
          <PrivateRoute exact path='/mybookmarks' component={MyBookmarks} />
          <PrivateRoute exact path='/addbookmark' component={AddBookmark} />
        </Layout>
      </AuthContextComponent>
    );
  }
}


