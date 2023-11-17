const express = require("express");
const app = express();
const models = require('./models')
const influencerDataUpload = require("./routes/influencerDataUpload");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/influence_data_upload", influencerDataUpload);

app.get("/syncDB", async (req, res) => {
  await models.sequelize
    .sync({ alter: true,force:false })
    .then(async () => {
      console.log("Database synchronized");
      res.send('Success')
    })
    .catch((error) => {
      console.error(
        "An error occurred while synchronizing the database:",
        error
      );
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
