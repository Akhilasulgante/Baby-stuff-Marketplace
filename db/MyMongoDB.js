// By Zhiyi Jin and Akhila
const { MongoClient } = require("mongodb");
require("dotenv").config();
const uuid = require("uuid").v4;

function MyMongoDB() {
    const myDB = {};
    const url = "mongodb://localhost:27017" || process.env.DB_URL;
    const DB_NAME = "baby-stuff-sharing-db";

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

    return myDB;
}

module.exports = MyMongoDB();
