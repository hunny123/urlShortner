function checkcode(req){
  const {urlCode }=req.body;
  if (urlCode.length===0){
    return {"success":false, "codeexist":false}
  }
  let isurlcodeExist = Url.findOne({urlCode});

  if(isurlcodeExist){
    return {"success":false,"codeexist":true}
  }
  else{
    
    validcode = true
    return {"success":true,"codeexist":true}
  }
}
const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Urls');



router.post('/checkcode',async(req,res)=>{

  return  res.json(checkcode(req))

})

router.post('/customize',async(req,res)=>{
  const { longUrl,urlCode } = req.body;
  const validcode = checkcode(req);
  console.log(validcode)
  if (validcode.codeexist){
    return res.json({"message":"short code already exist or please fill the short code"})
  }
  else {
    if (!validUrl.isUri(fullUrl)) {
      return res.status(401).json('Invalid base url');
    }
    if (validUrl.isUri(longUrl)) {
      try {
        let url = await Url.findOne({ longUrl });
  
        if (url) {
          res.json(url);
        } else {
          const shortUrl = fullUrl + '/' + urlCode;
  
          url = new Url({
            longUrl,
            shortUrl,
            urlCode,
            date: new Date()
          });
  
          await url.save();
  
          res.json(url);
        }
      } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
      }
    } else {
      res.status(401).json('Invalid long url');
    }



  }

})

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  var fullUrl = req.protocol + '://' + req.get('host');
  console.log(fullUrl, req.protocol, req.get('host'), req.originalUrl)

  
  if (!validUrl.isUri(fullUrl)) {
    return res.status(401).json('Invalid base url');
  }

 
  const urlCode = shortid.generate();


  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = fullUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;
