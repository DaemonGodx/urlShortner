import UrlRepository from "../repository/db_config.js";
import shortid from "shortid";

class UrlService {
  constructor() {
    this.urlRepository = new UrlRepository();
  }

  async createShortId(redirectUrl, createdBy) {
    try {
      const shId = shortid.generate();
      const create = await this.urlRepository.createSortid(shId, redirectUrl, createdBy);
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
async getAll(createdBy){
  try {
    const url = await this.urlRepository.getAll(createdBy);
    return url;
    
}
catch (err) {
      console.error("Service layer error:", err);
      throw err; 
    }
}
}


export default UrlService;
