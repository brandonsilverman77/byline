import GlobalMessage from "../models/global-message";

class ActionCreatorBase {
  
  
  sendError(str) {
    return {
      type: "SEND_MESSAGE",
      payload: {
        message: new GlobalMessage({
          text: str,
          level: "error"
        })
      }
    }
  }
  
  sendInfo(str) {
    return {
      type: "SEND_MESSAGE",
      payload: {
        message: new GlobalMessage({
          text: str,
          level: "info"
        })
      }
    }
  }
}

export default ActionCreatorBase;