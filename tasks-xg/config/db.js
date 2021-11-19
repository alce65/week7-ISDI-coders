require("dotenv").config();
const mongoose = require("mongoose");

async function mongoConnect() {
  const user = process.env.DBUSER;
  const passwd = process.env.DBPASSWD;
  const databaseName = process.env.DBNAME;

  const uri = `mongodb+srv://${user}:${passwd}@cluster0.dj9ya.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

  const mongooseConnect = await mongoose.connect(uri);
  return;
}

module.exports = mongoConnect;
