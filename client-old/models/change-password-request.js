import {Map, Record} from "immutable";

const defaults = {
  oldPassword: "",
  newPassword: "",
  newPasswordConfirmation: "",
  strength: 0,
  token: ""
}

class ChangePasswordRequest extends Record(defaults) {

  match() {
    return this.get("newPassword") === this.get("newPasswordConfirmation");
  }
  
  params() {
    return {
      old_password: this.get("oldPassword"),
      new_password: this.get("newPassword"),
      new_password_confirmation: this.get("newPasswordConfirmation"),
      token: this.get("token")
    }
  }
}

export default ChangePasswordRequest;
