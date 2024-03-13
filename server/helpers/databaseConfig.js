const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const url = process.env.MONGO_DATABASE_URL;

const connect = () => {
  try {
    mongoose.set({ strictQuery: false });
    mongoose.connect(url, () => {
      console.log("db connected");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
