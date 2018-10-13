
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App';
import AboutUs from './components/AboutUs';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker';
import adminPanel from './components/adminPanel';

import './index.css';

let store = createStore(rootReducer, applyMiddleware(thunk));
//store.subscribe(() => console.log('store subscribe', store.getState()))

ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/adminPanel" component={adminPanel} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    </Provider>
    ,
document.getElementById('root'));
registerServiceWorker();
