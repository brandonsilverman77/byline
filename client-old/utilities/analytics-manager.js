const PURCHASE_EVENT = "purchase";

class AnalyticsManager {
  
  constructor({history}) {
  
    this.unlisten = history.listen((location, action) => {
        console.log("tracking pageview");
        // TODO: add page title
        // gtag('config', '', {'page_path': location.pathname});
        
        // gtag('event', 'login', {'method': 'Google'});
    });
  }
  
  event(event, metadata = {}) {
    console.log("tracking event", event, metadata);
    // gtag('event', event, metadata);
  }
  
  unmount() {
    this.unlisten();
  }
  
}

export default AnalyticsManager;
export {PURCHASE_EVENT};

