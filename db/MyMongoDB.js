// By Zhiyi Jin and Akhila
const { MongoClient } = require("mongodb");
require("dotenv").config();
const uuid = require("uuid").v4;

function MyMongoDB() {
  const myDB = {};
  const url = "mongodb+srv://admin-ted:Test123@cluster0.dz0wqq8.mongodb.net/";
  const DB_NAME = "baby-stuff-sharing-db";
  const USER_COLLECTION = "users";

  myDB.read = async (collectionName, query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const collection = db.collection(collectionName);
      let res = await collection.find(query).toArray();
      console.log("read posts", res);
      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  myDB.delete = async (collectionName, query) => {
    let client;

    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const collection = db.collection(collectionName);
      await collection.deleteOne(query);
      console.log("delete posts successfully");
      return "success";
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  myDB.authenticate = async (user) => {
    const client = new MongoClient(url);
    const db = client.db(DB_NAME);
    const usersCol = db.collection(USER_COLLECTION);
    console.log("searching for", user);
    const res = await usersCol.findOne({ email: user.email }).toArray();
    console.log("res", res, res.password === user.password);
    if (res.password === user.password) return true;
    return false;
  };

  myDB.create = async (user) => {
    const client = new MongoClient(url);
    const db = client.db(DB_NAME);
    const usersCol = db.collection(USER_COLLECTION);
    console.log("searching for", user);
    const res = await usersCol
      .insertOne({ email: user.email, firstName: user.firstName, lastName: user.lastName })
      .toArray();

    return true;
  };

  return myDB;
}

module.exports = MyMongoDB();
