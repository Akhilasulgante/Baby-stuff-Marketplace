// By Zhiyi Jin and Akhila
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

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

    myDB.create = async (collectionName, data, objectId) => {
        console.log(data);
        const client = new MongoClient(url);
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        if (objectId) data._id = new ObjectId(objectId);
        console.log("create new data", data);
        await collection.insertOne(data);

        return data._id;
    };

    return myDB;
}

module.exports = MyMongoDB();
