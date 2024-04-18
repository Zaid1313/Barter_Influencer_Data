const express = require("express");
const router = express.Router();
const XLSX = require("xlsx");
const { getSheetData } = require("../utils/getSheetData");
// const models = require("../models");
// const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    if (!req.query.sheetId) throw new Error("Sheet Id is required");
    var workBookData = await getSheetData(req.query.sheetId);
    if (!workBookData) throw new Error("Work book data not found");
    const sheetData = XLSX.utils.sheet_to_json(workBookData.Sheets["Sheet1"]);
    // const sheetData = XLSX.utils.sheet_to_json(workBookData.Sheets["Internal"]);
    console.log('Sheet Data:', sheetData)
    res.status(200).send('Got brand data')
    // await Promise.all(
    //   sheetData.map(async (excelObj) => {
    //     if (
    //       excelObj[""] 
    //     ) {
    //       const dbObject = await transformData(excelObj);
    //       const existingRow = await models.BrandData.findOne({
    //         where: { uniqueCode: dbObject.uniqueCode },
    //       });
    //       if (existingRow) {
    //         // If it exists, update the existing row
    //         await existingRow.update(dbObject);
    //       } else {
    //         // If it doesn't exist, create a new row
    //         await models.BrandData.create(dbObject);
    //       }
    //     }
    //     else if(excelObj['']){
    //         const dbObject = await transformData(excelObj);
    //         await models.BrandDataError.create(dbObject);
    //     }
    //   })
    // );
    // res.status(200).send("Data inserted successfully.");
  } catch (error) {
    console.log("Error", error);
    res.status(500).send(error);
  }
});

// const transformData = async (excelObj) => {
//   const dbObject = {};

//   dbObject.brandId = excelObj['Brand name'];

//   return dbObject;
// };

module.exports = router;
