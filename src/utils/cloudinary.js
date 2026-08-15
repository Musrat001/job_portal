import { v2 as cloudinary } from "cloudinary"

import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async(localFilePath) => {
    try{
        if(!localFilePath){
            console.log("File Path is Not found")
            return null
        }
        const uploadResult = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })

        // console.log("File is uploaded on clodinary", uploadResult.url)
        // console.log(uploadResult);
        fs.unlinkSync(localFilePath);
        return uploadResult;


    }catch(error){
        fs.unlinkSync(localFilePath)
        return null;

    }
}

export {uploadOnCloudinary}







