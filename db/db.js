const { MongoClient } = require("mongodb");
require("dotenv").config();
const uuid = require("uuid").v4;

const uri = process.env.DB_URL;
const DB_NAME = "baby-stuff-sharing-db";

const client = new MongoClient(uri, { useUnifiedTopology: true });
const db = client.db(DB_NAME);

const defaultPost1 = {
    title: "Diaper change table pad & coversheet",
    description:
        "The 2-Sided Contoured Changing Pad was designed with your baby’s safety in mind. With contoured walls and quick release safety belt, this changing pad ensures your baby is secure. A security strap underneath the pad keeps it attached to furniture and the non-skid bottom ensures it won’t slip or move. The soft, foam pad is comfortable for baby, and durable quilted double layer vinyl is easy for parents to clean. The 100% waterproof material can be easily wiped clean with a damp cloth, so you can be sure your infant’s changing area is germ free.",
    images: [
        "https://res.cloudinary.com/dot40hfnd/image/upload/v1666074106/cld-sample-2.jpg",
        "https://res.cloudinary.com/dot40hfnd/image/upload/v1666074079/sample.jpg",
    ],
    address: "Wildwood Elementary School",
    latitude: "37.82018711031781",
    longitude: "-122.23500433842943",
    createdAt: "1665950306844",
};

const defaultPost2 = {
    title: "Ingenuity Comfort 2 Go Compact Portable Baby Swing",
    description:
        "THE only thing our baby would let us put him down in. We loved it because it was easy to collapse and move around the house with us while carrying the baby. Really a great, space saving life saver in those first few months. We loved how quiet it was as well as how well the swing swung. Has multiple speeds to choose from. It reclines too so you can have your baby at different angles. Ours didn't come with the plush toys band, so that is not included. Easy to wash everything!",
    address: "San Francisco",
    images: [
        "https://res.cloudinary.com/dot40hfnd/image/upload/v1666074106/cld-sample-2.jpg",
        "https://res.cloudinary.com/dot40hfnd/image/upload/v1666074079/sample.jpg",
    ],
    latitude: "37.79349982919247",
    longitude: "-122.44721461030844",
    createdAt: "1665684780000",
};

const defaultPosts = [defaultPost1, defaultPost2];

const getDBCollection = async (collectionName) => {
    await client.connect();
    return db.collection(collectionName);
};

const create = async (collectionName, data, objectId) => {
    const collection = await getDBCollection(collectionName);
    if (objectId) data._id = new ObjectId(objectId);
    await collection.insertOne(data);
};

const createDefaultPosts = async (collectionName) => {
    const collection = await getDBCollection(collectionName);
    defaultPosts.forEach((post) => {
        post._id = uuid();
    });
    await collection.insertMany(defaultPosts);
};

const read = async (collectionName, query, callbackChain) => {
    if (typeof query !== "object") {
        throw new TypeError("Query Expression is not an object");
    }
    const collection = await getDBCollection(collectionName);
    let res = collection.find(query);

    // abstracting method chainning
    // hoping to improve reusability
    if (callbackChain) {
        if (typeof callbackChain !== "object") {
            throw new TypeError(
                "Callback chain must be an object with callback as key and params array as value"
            );
        }
        for (let cb in callbackChain) {
            if (res[cb]) {
                res = res[cb].apply(res, callbackChain[cb]);
            }
        }
    }
    res = res.toArray();
    return await res;
};

const update = async (collectionName, filter) => {
    if (typeof filter !== "object") {
        throw new TypeError("Filter Expression is not an object");
    }
    const collection = await getDBCollection(collectionName);
    await collection.updateOne(filter);
};

const destroy = async (collectionName, filter) => {
    if (typeof filter !== "object") {
        throw new TypeError("Query Expression is not an object");
    }
    const collection = await getDBCollection(collectionName);
    await collection.deleteOne(filter);
};

module.exports = { createDefaultPosts, create, read, update, destroy };
