import {Map, List} from "immutable";
import User from "../models/user";
import {SavingState} from "../action-creators/user-action-creator";

const UserDefaults = new Map({
    user: new User(),
    creatingCustomer: SavingState.READY,
    saving: SavingState.READY
});

export default function(state = UserDefaults, action) {

    switch(action.type) {
    case "UPDATE_USER":
        return update(state, action);
    case "SAVING_USER":
        return saving(state, action);
    case "FIX_INITIAL_STATE":
        return fix(state, action);
    case "LOGOUT":
      return logout(state, action);
    }
    return state;
}

export {UserDefaults};

function fix(state, action) {
    let user = state.user;
    if (!(user instanceof User)) {
        user = User.factory(user);
    }

    if (!(state instanceof Map)) {
        state = new Map();
    }

    return state.merge(defaultState).set("user", user);
}

function update(state, action) {
    return state.set("user", action.payload);
}


function saving(state, action) {
    return state.set("saving", action.payload);
}

function logout(state, action) {
  return state.set("user", new User()).set("paymentMethods", new List());
}