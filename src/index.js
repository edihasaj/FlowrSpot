import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Flowers from './components/Flowers';
import Notfound from './components/NotFound';

const routing = (
    <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/flowers" component={Flowers} /> 
                <Route path="/sightings" component={App} />
                <Route path="/favorites" component={App} /> 
                <Route component={Notfound} />
            </Switch>
    </BrowserRouter>
);

const rootReducer = combineReducers({
    form: formReducer
});
const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        {routing}
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
