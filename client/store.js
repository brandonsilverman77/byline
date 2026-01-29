import Redux, {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from "redux";
import {Map} from "immutable"
import thunk from "redux-thunk";
import user, {UserDefaults} from "./reducers/user-reducer.js";
import assets from "./reducers/asset-reducer.js";
import message from "./reducers/message-reducer.js";
import railsData from "./reducers/rails-data-reducer.js";
import transientData from "./reducers/transient-data-reducer.js";
import User from "./models/user";
import UserStorageManager from "./utilities/user-storage-manager";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({user, transientData, assets, railsData, message});


export default function(props) {
    if (props && "serverUser" in props && !props.serverUser) {
      delete props.serverUser;
    }
    
    let newProps = props || {};

    if (props && "serverUser" in props && props.serverUser) {
        let userProps = new Map().set("user", User.factory(props.serverUser));
        newProps.user = UserDefaults.merge(userProps);
        delete newProps.serverUser;
    }
    
    return createStore(reducer, Object.assign({}, newProps), composeEnhancers(
        applyMiddleware(thunk)
    ));
}
