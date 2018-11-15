
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
<<<<<<< HEAD
import AddRecord from './components/bib/records/AddRecord';
=======
import addRecord from './components/bib/addRecord';
import FrontPage from './components/frontpage/FrontPage';
>>>>>>> 27944258e635858e6a5bc98db4c74811b9b3905f
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker';
import ShowUserRecords from './components/bib/ShowUserRecords';

import './index.css';

let store = createStore(
    rootReducer,
    compose(
    applyMiddleware(thunk)
    )
);
//store.subscribe(() => console.log('store subscribe', store.getState()))

ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/records" component={ShowUserRecords} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
<<<<<<< HEAD
                <Route path="/addRecord" component={AddRecord} />
=======
                <Route path="/addRecord" component={addRecord} />
                <Route path="/front" component={FrontPage} />
>>>>>>> 27944258e635858e6a5bc98db4c74811b9b3905f
            </Switch>
        </BrowserRouter>
    </Provider>
    ,
document.getElementById('root'));
registerServiceWorker();
