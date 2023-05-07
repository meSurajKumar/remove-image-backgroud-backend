const removeBGApiKey = process.env.removeBGApiKey
const asyncMiddleWare = require('../middleware/async')
const { RemoveBgResult, RemoveBgError, removeBackgroundFromImageFile,removeBackgroundFromImageUrl } = require("remove.bg");
const moment = require('moment');
const baseUlr = process.env.BASE_URL
const path = require('path');
var fs = require('fs');

exports.removeBackgoundByImage = async(req,res)=>{
    const localFile = req.files
    if(localFile==null || localFile==undefined) return res.status(400).send({message : 'Please Provide Image' })
    const imageName = `${moment().valueOf() + '_' + localFile.image.name}`
    await localFile.image.mv(path.join(__dirname, '../public/images/') + imageName)
    const imageUrl = `${baseUlr}/images/${imageName}`
    try {
      const outputFile = `${__dirname}/../public/output/${imageName}`;
      // this is for url purpose....
      // const result = await removeBackgroundFromImageFile({
      //   url:imageUrl,
      //   apiKey: removeBGApiKey,
      //   size: "regular",
      //   type: "product",
      //   outputFile
      // });
    const imagePath = `${__dirname}/../public/images/${imageName}`
    await removeBackgroundFromImageFile({
      path: imagePath,
      apiKey: removeBGApiKey,
      size: "regular",
      type: "auto",
      scale: "100%",
      outputFile 
    })  
      let outputImageUrl = `${baseUlr}/output/${imageName}`      
      function removeImages() {
        fs.unlinkSync(imagePath);
        fs.unlinkSync(outputFile);
        clearInterval(imageClearInterval);
    }    
    const imageClearInterval = setInterval(removeImages, 5000)
    return res.status(200).send({message : 'image data ::',data : outputImageUrl})
   
    } catch (errors) {
      return res.status(400).send({message : 'Error ::',errors})
    }
}


 