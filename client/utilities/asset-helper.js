const INCLUDE_STYLE_TAG = 0;
const EXCLUDE_STYLE_TAG = 1;

class AssetHelper {
  
  constructor(assets) {
    this.assets = assets;
  }
  
  get(image) {
    return this.assets[image];
  }
  
  getBackgroundImage(image, includeStyle = INCLUDE_STYLE_TAG) {
    if (!this.assets[image]) {
      console.warn("couldn't find asset for " + image + " in ", this.assets);
    }
    
    if (includeStyle === INCLUDE_STYLE_TAG) {
      return {
        style: {
          backgroundImage: "url(" + this.assets[image] + ")"
        }
      }
    } else {
      return {
        backgroundImage: "url(" + this.assets[image] + ")"
      }
    }
  }
}

export default AssetHelper;


export {INCLUDE_STYLE_TAG, EXCLUDE_STYLE_TAG};