const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 2000;
const userRouter = require("./routes/user");
const app = express();
const mongooseUrl = "mongodb://localhost:27017/aexonic";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// user router
app.use("/user", userRouter);

// mongoose connection
const mongooseConnection = async () => {
  try {
    await mongoose.connect(mongooseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connected Failed");
  }
};
mongooseConnection();
// server running
app.listen(port, () => {
  console.log(`Server Running Port Number ${port}`);
});
