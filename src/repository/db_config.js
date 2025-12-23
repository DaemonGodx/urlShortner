import Url from "../models/url.js";

class UrlRepository {
  async createSortid(shortId, redirectUrl) {
    try {
      const create = await Url.create({
        shortId,
        redirectUrl,
        visitHistory: [],
      });
      return create;
    } catch (err) {
      console.error("Repository layer error:", err);
      throw err;
    }
  }

  async getUrl(shortId) {
    try {
      const url = await Url.findOneAndUpdate(
        { shortId: shortId.trim() },
        {
          $push: {
            visitHistory: {
              timestamp: Date.now(),
            },
          },
        },
        { new: true } 
      );

      return url;
    } catch (err) {
      console.error("Repository layer error:", err);
      throw err;
    }
  }
  async getAll(){
    try {
      const url = await Url.find({});
      return url;
}catch(err)
{
   console.error("Repository layer error:", err);
      throw err;
}
  }
}

export default UrlRepository;
