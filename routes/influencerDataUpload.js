const express = require('express');
const router = express.Router();
const XLSX = require('xlsx');
const {getSheetData} = require('../utils/getSheetData');
const models = require('../models')



router.get('/', async(req,res)=>{
    try{
       if (!req.query.sheetId) throw new Error ('Sheet Id is required');
       var workBookData = await getSheetData(req.query.sheetId);
        if (!workBookData) throw new Error ('Work book data not found');
        const sheetData = XLSX.utils.sheet_to_json(workBookData.Sheets['Sheet1']);
        console.log('Sheet Data:', sheetData)
        await Promise.all(sheetData.map(async (excelObj) => {
            if(excelObj['Unique Code']){
                const dbObject =await transformData(excelObj);
                // await models.InfluencerData.create(dbObject);
                const existingRow = await models.InfluencerData.findOne({
                    where: { uniqueCode: dbObject.uniqueCode }
                });
                if (existingRow) {
                    // If it exists, update the existing row
                    await existingRow.update(dbObject);
                } else {
                    // If it doesn't exist, create a new row
                    await models.InfluencerData.create(dbObject);
                }
            }
    }));
        res.status(200).send('Data inserted successfully.');
    } catch (error) {
        console.log("Error",error);
        res.status(500).send(error);
    }
})


const transformData =async (excelObj)=>{
    const dbObject = {};
    
    dbObject.uniqueCode = excelObj['Unique Code']
    dbObject.fullName = excelObj['Full Name ']
    dbObject.age = excelObj['Age ']
    dbObject.sex = excelObj['Sex ']
    dbObject.location = excelObj['Location']
    dbObject.instagramUsername = excelObj['Instagram Username']
    dbObject.instagramLink = excelObj['Instagram Link ']
    dbObject.education = excelObj['Education ']
    dbObject.contactNumber = excelObj['Contact Number ']
    dbObject.email = excelObj['Email ']
    dbObject.category = excelObj['Category ']
    dbObject.instagramFollowers = excelObj['Instagram - Followers']
    dbObject.instagramEngRate = excelObj['Instagram - Eng. Rate (%)']
    dbObject.instagramStaticEngRate = excelObj['Instagram - Static - Eng Rate (%)']
    dbObject.instagramAvgEngagements = excelObj['Instagram  - Avg. Engagements']
    dbObject.instagramAlbumAvgVideoViews = excelObj['Instagram - Album - Avg. Video Views']
    dbObject.instagramVideoEngRate = excelObj['Instagram - Video - Eng. Rate (%)']
    dbObject.instagramVideoAvgViews = excelObj['Instagram - Video - Avg. Views']
    dbObject.instagramIgtvEngRate = excelObj['Instagram - IGTV - Eng. Rate (%)']
    dbObject.instagramIgtvAvgEngagements = excelObj['Instagram - IGTV - Avg. Engagements']
    dbObject.instagramIgtvAvgViews = excelObj['Instagram - IGTV - Avg. Views']
    dbObject.instagramStoryReach = excelObj['Instagram - Story Reach']
    dbObject.instagramReelViews = excelObj['Instagram - Reel Views']
    dbObject.photoPostEngRate = excelObj['Photo Post Eng Rate']
    dbObject.shortFormVideoLikeReels = excelObj['Short Form Video (Like Reels)']
    dbObject.ageDemographics = excelObj['Age Demographics']
    dbObject.genderSplit = excelObj['Gender Split']
    dbObject.topCitiesAudienceFrom = excelObj['Top Cities Audience from']
    dbObject.topInterests = excelObj['Top Interests ']
    dbObject.audienceLocation = excelObj['Audience Location']
    
    return dbObject;
}


module.exports = router;
