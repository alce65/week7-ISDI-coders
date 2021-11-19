require("dotenv").config();
const mongoose = require("mongoose");

async function mongoConnect() {
  const user = process.env.DBUSER;
  const passwd = process.env.DBPASSWD;
  let databaseName;

  console.log("NODE_ENV", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "test") {
    databaseName = process.env.DBNAME_TEST;
    console.log({ databaseName });
  } else if (process.env.NODE_ENV === "dev") {
    databaseName = process.env.DBNAME;
  } else {
    // process.env.NODE_ENV === "prod"
    databaseName = process.env.DBNAME_PROD;
  }

  const uri = `mongodb+srv://${user}:${passwd}@cluster0.dj9ya.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

  const mongooseConnect = await mongoose.connect(uri);
  return mongooseConnect;
}

module.exports = mongoConnect;
