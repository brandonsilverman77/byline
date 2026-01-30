class PubSub {
  
  constructor() {
    this.subscriptions = {};
    this.count = 0;
  }
  
  subscribe(event, callback) {
    
    if (!EventLookup[event]) {
      console.warn("Unknown event passed in to pubsub", EventLookup[event], "value", event);
      return;
    }
    this.count++;
    const index = this.count;
    if (!this.subscriptions[event]) {
      this.subscriptions[event] = {};
    }
    
    this.subscriptions[event][index] = callback;
    
    console.log(this.subscriptions);
    
    return () => {
      delete this.subscriptions[event][index];
    }
  }
  
  trigger(event, ...args) {
    args = args || {}
    if (this.subscriptions[event]) {
      Object.keys(this.subscriptions[event]).forEach(k => {
        let callback = this.subscriptions[event][k];
        callback(...args);
      })
    }
  } 
  
  
}

const instance = new PubSub();

export default instance;

const Events = {
  TRIGGER_TWITTER_MODAL: 1,
  LOGIN_MODAL: 2,
  CLEAR_FILTERS: 3
}

const EventLookup = Object.keys(Events).reduce((prev, event) => {
  prev[Events[event]] = true;
  return prev;
}, {});

export {Events};