import {Map} from "immutable";
import Message from "../models/global-message";
import {SavingState} from "../action-creators/user-action-creator";
import shortid from "shortid";

const defaultState = new Map({
    message: null
});

export default function(state = defaultState, action) {

    switch(action.type) {
    case "SEND_MESSAGE":
        return showMessage(state, action);
    }
    return state;
}


function showMessage(state, action) {
    let {message} = action.payload;
    message = message.set("id", shortid.generate());

    return state.set("message", message);
}
