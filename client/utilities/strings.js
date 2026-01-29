class Strings {
  
  
  isNullOrEmpty(str) {
    return (str === null || str === undefined || str === "");
  }
  
  cleanAuthorName(name) {
    if (!name) {
      return "";
    }
    
    return name.split(" ").map(n => {
      return n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
    }).join(" ");
    
  }
}

const instance = new Strings();

export default instance;