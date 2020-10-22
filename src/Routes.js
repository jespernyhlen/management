import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ActivateAccount from './pages/ActivateAccount';
import Home from './pages/Home';
import Private from './pages/Private';
import Users from './pages/Users';
import PrivateRoute from './auth/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import TrelloPrivate from './pages/TrelloPrivate';
import Teams from './pages/Teams';
import TrelloTeam from './pages/TrelloTeam';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route
                path='/auth/activate/:token'
                exact
                component={ActivateAccount}
            />
            <PrivateRoute
                path='/trelloprivate'
                exact
                component={TrelloPrivate}
            />
            <PrivateRoute path='/private' exact component={Private} />
            <PrivateRoute path='/users' exact component={Users} />
            <Route
                path='/auth/password/forgot'
                exact
                component={ForgotPassword}
            />
            <Route
                path='/auth/password/reset/:token'
                exact
                component={ResetPassword}
            />
            <Route path='/teams' exact component={Teams} />
            <PrivateRoute path='/teams/:id' exact component={TrelloTeam} />

            <Route path='/' component={Home} />
        </Switch>
    );
};

export default Routes;
