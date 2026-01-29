import {Record} from "immutable";

const defaults = {
  id: null,
  text: null,
  level: null
}

class GlobalMessage extends Record(defaults) {

}

export default GlobalMessage;
