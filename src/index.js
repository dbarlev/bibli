
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
import Takanon from './components/pages/Takanon';
import RegisterSuccess from './components/auth/RegisterSuceess';

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
        <BrowserRouter basename='/'>
            <Switch>
                <Route exact path="/" component={FrontPage} />
                <Route path="/register" component={Register} />
                <Route path="/registersuccess" component={RegisterSuccess} />
                <Route path="/mailconf/:mailVer" component={MailVerification} />
                <Route path="/login" component={Login} />
                <Route path="/front" component={FrontPage} />
                <Route path="/faq" component={Faq} />
                <Route path="/takanon" component={Takanon} />
                <Route path="/contact" component={Contact} />
                <Route path="/passwordrecovery" component={PasswordRecovery} /> //טופס הזנת כתובת מייל לשחזור סיסמא
                <Route path="/passwordrecoveryedit/:token" component={PasswordRecoveryEdit} /> //שינוי של הסיסמא
                <Route path="/records/biblist" component={Records} />
                <Route path="/records/addNewList" component={Records}/>
                <Route path="/records/addRecord" component={Records} />
                <Route path="/records/editList" component={Records} />
                <Route path="/records/editRecord" component={Records} />
            </Switch>
        </BrowserRouter>
    </Provider>
    ,
document.getElementById('root'));
registerServiceWorker();
