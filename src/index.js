import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import {applyMiddleware, createStore,compose,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import burgerBuilderReducer from './store/reducer/burgerBuilder'
import orderReducer from './store/reducer/order'
import authReducer from './store/reducer/auth'
const composeEnhancers = process.env.NODE_ENV ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose; 
const rootReducer = combineReducers({
    bgr: burgerBuilderReducer,
    ord: orderReducer,
    auth: authReducer
})

const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)))
const app = (
<Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</Provider>

)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
