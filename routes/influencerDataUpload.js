const express = require("express");
const router = express.Router();
const XLSX = require("xlsx");
const { getSheetData } = require("../utils/getSheetData");
const models = require("../models");
const db = require("../models");
// const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    // if (!process.env.SHEET_ID) throw new Error("Sheet Id is required");
    if (!req.query.sheetId) throw new Error("Sheet Id is required");
    // var workBookData = await getSheetData(process.env.SHEET_ID);
    var workBookData = await getSheetData(req.query.sheetId);
    if (!workBookData) throw new Error("Work book data not found");
    const sheetData = XLSX.utils.sheet_to_json(workBookData.Sheets["Sheet1"]);
    // const sheetData = XLSX.utils.sheet_to_json(workBookData.Sheets["Internal"]);
    // console.log("Sheet Data:", sheetData);
    await Promise.all(
      sheetData.map(async (excelObj) => {
        if (
          excelObj["Unique Code "] &&
          excelObj["Full Name "] &&
          excelObj["Instagram Username"] &&
          excelObj["Email "]
        ) {
          const dbObject = await transformData(excelObj);
          const existingRow = await models.InfluencerData.findOne({
            where: { uniqueCode: dbObject.uniqueCode },
          });
          if (existingRow) {
            // If it exists, update the existing row
            await existingRow.update(dbObject);
          } else {
            // If it doesn't exist, create a new row
            await models.InfluencerData.create(dbObject);
          }
        } else if (
          excelObj["Unique Code "] ||
          excelObj["Full Name "] ||
          excelObj["Instagram Username"] ||
          excelObj["Email "]
        ) {
          const dbObject = await transformData(excelObj);
          let errorMes = [];

          if (!excelObj["Unique Code "]) errorMes.push("Unique code");
          if (!excelObj["Full Name "]) errorMes.push("Full name");
          if (!excelObj["Instagram Username"])
            errorMes.push("Instagram username");
          if (!excelObj["Email "]) errorMes.push("Email");

          const errorCount = errorMes.length;
          const errorMessage =
            errorCount > 1
              ? `${errorMes.join(", ")} are missing.`
              : `${errorMes[0]} is missing.`;

          let existingError;

          if (dbObject.uniqueCode) {
            existingError = await models.InfluencerDataError.findOne({
              where: { uniqueCode: dbObject.uniqueCode },
            });
          } else if (dbObject.fullName) {
            existingError = await models.InfluencerDataError.findOne({
              where: { fullName: dbObject.fullName },
            });
          } else if (dbObject.instagramUsername) {
            existingError = await models.InfluencerDataError.findOne({
              where: { instagramUsername: dbObject.instagramUsername },
            });
          } else if (dbObject.email) {
            existingError = await models.InfluencerDataError.findOne({
              where: { email: dbObject.email },
            });
          }

          if (existingError) {
            // If it exists, update the existing error
            await existingError.update({ ...dbObject });
          } else {
            // If it doesn't exist, create a new error record
            await models.InfluencerDataError.create({
              ...dbObject,
              errorMessage: errorMessage,
            });
          }
        }
      })
    );
    res.status(200).send("Data inserted successfully.");
  } catch (error) {
    console.log("Error", error);
    res.status(500).send(error);
    if(error){
      await models.InfluencerDataError.create({...dbObject, errorMessage, serverError: error.message})
    }
  }
});

const transformData = async (excelObj) => {
  const dbObject = {};

  dbObject.uniqueCode = excelObj["Unique Code "];
  dbObject.fullName = excelObj["Full Name "];
  dbObject.age = excelObj["Age "];
  dbObject.sex = excelObj["Sex "];
  dbObject.location = excelObj["Location"];
  dbObject.instagramUsername = excelObj["Instagram Username"];
  dbObject.instagramLink = excelObj["Instagram Link "];
  dbObject.education = excelObj["Education "];
  dbObject.contactNumber = excelObj["Contact Number "];
  dbObject.email = excelObj["Email "];
  dbObject.category = excelObj["Category "];
  dbObject.instagramFollowers = excelObj["Instagram - Followers"];
  dbObject.instagramEngRate = excelObj["Instagram - Eng. Rate (%)"];
  dbObject.instagramStaticEngRate =
    excelObj["Instagram - Static - Eng Rate (%)"];
  dbObject.instagramAvgEngagements = excelObj["Instagram  - Avg. Engagements"];
  dbObject.instagramAlbumAvgVideoViews =
    excelObj["Instagram - Album - Avg. Video Views"];
  dbObject.instagramVideoEngRate =
    excelObj["Instagram - Video - Eng. Rate (%)"];
  dbObject.instagramVideoAvgViews = excelObj["Instagram - Video - Avg. Views"];
  dbObject.instagramIgtvEngRate = excelObj["Instagram - IGTV - Eng. Rate (%)"];
  dbObject.instagramIgtvAvgEngagements =
    excelObj["Instagram - IGTV - Avg. Engagements"];
  dbObject.instagramIgtvAvgViews = excelObj["Instagram - IGTV - Avg. Views"];
  dbObject.instagramStoryReach = excelObj["Instagram - Story Reach"];
  dbObject.instagramReelViews = excelObj["Instagram - Reel Views"];
  dbObject.photoPostEngRate = excelObj["Photo Post Eng Rate"];
  dbObject.shortFormVideoLikeReels = excelObj["Short Form Video (Like Reels)"];
  dbObject.ageDemographics = excelObj["Age Demographics"];
  dbObject.genderSplit = excelObj["Gender Split"];
  dbObject.topCitiesAudienceFrom = excelObj["Top Cities Audience from"];
  dbObject.topInterests = excelObj["Top Interests "];
  dbObject.audienceLocation = excelObj["Audience Location"];

  return dbObject;
};

module.exports = router;
