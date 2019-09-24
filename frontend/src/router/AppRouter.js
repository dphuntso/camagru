
import React from 'react';
import store from '../store/store';
import { Provider } from 'react-redux';
import Login from '../components/login/Login';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Router, Route, Switch } from 'react-router-dom';
import HomePage from '../components/home/HomePage';
import Picture from '../components/picture/Picture';
import Register from '../components/register/Register';
import RegisterError from '../components/errorPage/RegisterError';
import RegisterSuccess from '../components/register/RegisterSuccess';
import ConfirmationPage from '../components/register/ConfirmationPage';
import Profile from '../components/user/Profile';
import About from '../components/pages/About';
import ResetPassword from '../components/pages/ResetPassword';
import Post from '../components/Post/Post';

const createHistory = require('history').createBrowserHistory;


export const history = createHistory();
const AppRouter = () => (
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Header />
                <Switch>
                    <Route path="/post" component={Post} />
                    <Route path='/login' component={Login} />
                    <Route path='/about' component={About} />
                    <Route path="/picture" component={Picture} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/register' component={Register} />
                    <Route path='/' exact={true} component={HomePage} />
                    <Route path='/resetPassword' component={ResetPassword} />
                    <Route path='/registerError' component={RegisterError} />
                    <Route path='/registerSuccess' component={RegisterSuccess} />
                    <Route path='/confirmAccount/:hash' component={ConfirmationPage} />
                </Switch>
                <Footer />
            </div>
        </Router>
    </Provider>
)
export default AppRouter;