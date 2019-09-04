
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import FrontPage from './components/frontpage/FrontPage';
import Faq from './components/frontpage/Faq';
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker';
import Records from './components/bib/records';
import MailVerification from './components/auth/MailVerification';
import Contact from './components/contact/contact';
import PasswordRecovery from './components/auth/PasswordRecovery';
import PasswordRecoveryEdit from './components/auth/PasswordRecoveryEdit';

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
                <Route path="/register" component={Register} />
                <Route path="/mailconf/:mailVer" component={MailVerification} />
                <Route path="/login" component={Login} />
                <Route path="/front" component={FrontPage} />
                <Route path="/faq" component={Faq} />
                <Route path="/contact" component={Contact} />
                <Route path="/passwordrecovery" component={PasswordRecovery} /> //טופס הזנת כתובת מייל לשחזור סיסמא
                <Route path="/passwordrecoveryedit/:token" component={PasswordRecoveryEdit} /> //שינוי של הסיסמא
                <Route path="/records" component={Records} />
            </Switch>
            {/* <Switch>
                <Route exact path="/" component={FrontPage} />
                <Route path="/biblist/:id" component={ShowUserBibList} />
                <Route path="/biblist" component={ShowUserBibList} />
                <Route path="/editlist" component={EditBiblist} />
                <Route path="/register" component={Register} />
                <Route path="/mailconf/:mailVer" component={MailVerification} />
                <Route path="/login" component={Login} />
                <Route path="/addRecord" component={AddRecord} />
                <Route path="/editRecord/:id" component={EditRecord} />
                <Route path="/front" component={FrontPage} />
                <Route path="/addNewList" component={AddBibList} />
                <Route path="/faq" component={Faq} />
                <Route path="/contact" component={Contact} />
                <Route path="/passwordrecovery" component={PasswordRecovery} />
            </Switch> */}
        </BrowserRouter>
    </Provider>
    ,
document.getElementById('root'));
registerServiceWorker();
