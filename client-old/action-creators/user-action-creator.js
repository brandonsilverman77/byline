import API from "../connection/api";
import User from "../models/user";
import shortid from "shortid";
import {List} from "immutable";
import Strings from "../utilities/strings";
import validator from "validator";
import ActionCreatorBase from "./base";
import UserStorageManager, {BASKET_KEY} from "../utilities/user-storage-manager";

const SavingState = {
    READY: "ready",
    SAVING: "saving",
    COMPLETE: "complete"
}

class UserActionCreator extends ActionCreatorBase {

    constructor(api, storageManager) {
      super();
        this.api = api;
        this.storageManager = storageManager;
    }

    fixInitialState() {
        return {
            type: "FIX_INITIAL_STATE",
            payload: true
        }
    }

    save(user, onSuccess) {
      return this.create(user, onSuccess);
    }
    
    create(user, onSuccess) {
      const id = shortid.generate();
      if (!user.hasValidId()) {
          user = user.set("id", id);
      }

      return (dispatch, getState) => {
        dispatch(this.update(user));
        dispatch(this.saving(SavingState.SAVING));

        this.api.saveUser(user).then(res => {
          if (res.error) {
            let message = new GlobalMessage({
              text: res.error,
              level: "error"
            })
            dispatch({
              type: "SEND_MESSAGE",
              payload: {message}
            });
            dispatch(this.saving(SavingState.READY));
            return;
          }

          user = User.factory(res.user);

          dispatch(this.update(user));
          dispatch(this.saving(SavingState.COMPLETE));

          if (onSuccess) {
            onSuccess();
          }

          setTimeout(() => {
            dispatch(this.saving(SavingState.READY));
          }, 3000);
          });
      }

    }

    logout() {
      return (dispatch, getState) => {
        this.storageManager.clear()
        this.api.logout();
        dispatch({
          type: "LOGOUT",
          payload: {}
        });
      }
    }

    saving(state) {
        return {
            type: "SAVING_USER",
            payload: state
        }
    }

    update(user) {
        return {
            type: "UPDATE_USER",
            payload: user
        };
    }
    
    sendPasswordReset(email) {
      return (dispatch, getState) => {
        this.api.sendPasswordReset(email).then(res => {
          if (!res.success) {
            dispatch(this.sendError(res.message));
          } else {
            dispatch(this.sendInfo(res.message));
          }
        });
      }
    }
    
    updatePassword(request, onSuccess) {
      return (dispatch, getState) => {
        if (!request.match()) {
          dispatch(this.sendError("The passwords need to match, silly."));
          return;
        } else if (Strings.isNullOrEmpty(request.get("oldPassword"))) {
          const token = getState().transientData.passwordToken;
          if (!token) {
              dispatch(this.sendError("You do not have the permissions to reset your password. Try 'forgot password'."));
              return;
          }
          request = request.set("token", token);
        } 
        
        this.api.updatePassword(request).then(res => {
          if (!res.success) {
            dispatch(this.sendError(res.message));
          } else {
            dispatch(this.sendInfo(res.message));
            onSuccess();
          }
        });
      }
    }

}

const instance = new UserActionCreator(API, UserStorageManager);

export {SavingState};
export default instance;
