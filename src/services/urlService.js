import UrlRepository from "../repository/db_config.js";
import shortid from "shortid";

class UrlService {
  constructor() {
    this.urlRepository = new UrlRepository();
  }

  async createShortId(redirectUrl) {
    try {
      const shId = shortid.generate();
      const create = await this.urlRepository.createSortid(shId, redirectUrl);
      return create;
    } catch (err) {
      console.error("Service layer error:", err);
      throw err; 
    }
  }
  async getUrl(shortId) {
    try {
      const url = await this.urlRepository.getUrl(shortId);
      return url;
      
}
catch (err) {
      console.error("Service layer error:", err);
      throw err; 
    }
}
async getAll(){
  try {
    const url = await this.urlRepository.getAll();
    return url;
    
}
catch (err) {
      console.error("Service layer error:", err);
      throw err; 
    }
}
}


export default UrlService;
