const mongoose = require("mongoose");
const { mongoUri } = require("./keys");

const connectToDB = async () => {
  try {
    let db = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `DB Connected, Host: ${db.connection.host}, Port: ${db.connection.port}, Database: ${db.connection.name}`
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectToDB;
