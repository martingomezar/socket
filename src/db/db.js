import mongoose from "mongoose";
const MongoClient = require("mongodb").MongoClient;
import {productCollection} from '../models/product'

const username = "admin";
const password = "Vale7220";

const myURI = `mongodb+srv://${username}:${password}@cluster0.cyate.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const miFunc = (err) => {
  if (err) console.log(`ERROR CONEXION DB => ${err}`);
  else console.log(" Mongoose is connected");
};

mongoose.connect(
  myURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  miFunc
);

export {productCollection };
