class UserStorageManager {
  
  constructor(storage) {
    this.storage = storage;
  } 
  
  get(key) {
    return new Promise((resolve, reject) => {
      resolve(this.storage.getItem(key));
    });
  }
  
  getSync(key) {
    return this.storage.getItem(key);
  }
  
  set(key, value) {
    return new Promise((resolve, reject) => {
      this.storage.setItem(key, value)
      resolve(true);
    });
  }
  
  delete(key) {
    return new Promise((resolve, reject) => {
      this.storage.removeItem(key)
      resolve(true);
    });
  }
  
  clear() {
    return new Promise((resolve, reject) => {
      this.storage.clear()
      resolve(true);
    });
  }
}

const instance = new UserStorageManager(window.localStorage);

export default instance;
