
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App';
import AboutUs from './components/AboutUs';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AddRecord from './components/bib/records/AddRecord';
import FrontPage from './components/frontpage/FrontPage';
import Faq from './components/frontpage/Faq';
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker';
import ShowUserBibList from './components/bib/ShowUserBibList';
import AddBibList from './components/bib/listOfRecords/AddBibList';
import MailVerification from './components/auth/MailVerification';

import './index.css';

let store = createStore(
    rootReducer,
    compose(
    applyMiddleware(thunk)    
    )

);
store.subscribe(() => console.log('store subscribe', store.getState()))

ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={FrontPage} />
                <Route path="/biblist" component={ShowUserBibList} />
                <Route path="/biblist/:id" component={ShowUserBibList} />
                <Route path="/register" component={Register} />
                <Route path="/mailconf/:mailVer" component={MailVerification} />
                <Route path="/login" component={Login} />
                <Route path="/addRecord" component={AddRecord} />
                <Route path="/front" component={FrontPage} />
                <Route path="/addNewList" component={AddBibList} />
                <Route path="/faq" component={Faq} />
            </Switch>
        </BrowserRouter>
    </Provider>
    ,
document.getElementById('root'));
registerServiceWorker();
