import UrlService from "../services/urlService.js";
import Url from "../models/url.js";

const urlService = new UrlService();

export const createShortId = async (req, res) => {
    try {
        const shortId = await urlService.createShortId(req.body.redirectUrl);

        return res.status(201).json({
            success: true,
            data: shortId,
            message: "success",
            error: false
        });

    } catch (err) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Error in creating",
            error: err.message
        });
    }
};

export const redirect = async (req, res) => {
    try {
        const shortid = req.params.shortId;
        const url = await urlService.getUrl(shortid);
        if (!url) {
            return res.status(404).json({
                data: {},
                success: false,
                message: "Url not found",
                error: true
            });
        }
        let redirectUrl = url.redirectUrl;

        if (!/^https?:\/\//i.test(redirectUrl)) {
            redirectUrl = "https://" + redirectUrl;
        }

        return res.status(301).redirect(redirectUrl);
    } catch (err) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Error in redirectiong",
            error: err.message
        });

    }
}
export const analytics = async (req, res) => {
      try {
    const shortId = req.params.shortId.trim();

    const analytic = await Url.findOne({ shortId });
    if (!analytic) {
        return res.status(404).json({
              data: {},
                success: false,
                message: "Url not found",
                error: true
            });
        }


    return res.status(200).json({
      totalClick: analytic.visitHistory.length,
      analytics: analytic.visitHistory,
      data: {},
      success: true,
      message: "success",
      error: false
    });
}
     catch(err){
        return res.status(500).json({
            data: {},
            success: false,
            message: "Error in finding",
            error: err.message
        });
     }
}
export const getAll=async(req,res)=>{   
    try{
        const url=await urlService.getAll();
        return res.status(200).json({
            data: url,
            success: true,
            message: "success",
            error: false
        });
    }
    catch(err){
        return res.status(500).json({   
          data: {},
            success: false,
            message: "Error in redirectiong",
            error: err.message
        });
    }
}   

