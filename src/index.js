
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import AuthPage from './components/auth/AuthPage/AuthPage';
import FrontPage from './components/frontpage/FrontPage';
import Faq from './components/pages/Faq';
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker';
import Records from './components/bib/records';
import MailVerification from './components/auth/MailVerification';
import Contact from './components/contact/contact';
import PasswordRecovery from './components/auth/PasswordRecovery';
import PasswordRecoveryEdit from './components/auth/PasswordRecoveryEdit';
import Takanon from './components/pages/Takanon';
import Odot from './components/pages/Odot';
import Blog from './components/pages/Blog';
import Packages from './components/pages/packages/Packages';
import Zcredit from './components/pages/packages/Payment/Zcredit';
import SucceessUrl from './components/pages/packages/Payment/SuccessUrl';
import Checkout from './components/pages/packages/Payment/Checkout';
import RegisterSuccess from './components/auth/RegisterSuceess';
import NotFound from './components/404';

import './index.css';
import RegisterPage from './components/auth/RegisterPage/RegisterPage';



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
                <Route path="/registersuccess" component={RegisterSuccess} />
                <Route path="/mailconf/:mailVer" component={MailVerification} />
                <Route path="/auth" component={AuthPage} />
                <Route path="/lastStep" component={RegisterPage} />
                <Route path="/front" component={FrontPage} />
                <Route path="/faq" component={Faq} />
                <Route path="/packages" component={Packages} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/takanon" component={Takanon} />
                <Route path="/odot" component={Odot} />
                <Route path="/blog" component={Blog} />
                <Route path="/contact" component={Contact} />
                <Route path="/passwordrecovery" component={PasswordRecovery} /> //טופס הזנת כתובת מייל לשחזור סיסמא
                <Route path="/passwordrecoveryedit/:token" component={PasswordRecoveryEdit} /> //שינוי של הסיסמא
                <Route path="/records/biblist" component={Records} />
                <Route path="/records/addNewList" component={Records} />
                <Route path="/records/addRecord" component={Records} />
                <Route path="/records/editList" component={Records} />
                <Route path="/records/editRecord" component={Records} />
                <Route path="/zcredit" component={Zcredit} />
                <Route path="/succeessurl" component={SucceessUrl} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('mainApp'));
registerServiceWorker();
