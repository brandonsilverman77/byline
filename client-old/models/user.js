import {Map, Record} from "immutable";

const defaults = {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

class User extends Record(defaults) {

    static factory(params) {


        return new User({
            firstName: params.first_name,
            id: parseInt(params.id),
            lastName: params.last_name,
            email: params.email
        });
    }

    hasValidId() {
      return this.get("id") && this.get("id") > 0;
    }

    getName() {
      if (!this.get("firstName")) {
        return "";
      }

      let name = this.get("firstName") + " " + this.get("lastName");
      if (name.trim().length < 2) {
        name = "";
      }

      return name.trim();
    }

    getDisplayName() {
      if (this.getName().length === 0) {
        return this.get("email");
      } else {
        return this.getName();
      }
    }
}

export default User;
