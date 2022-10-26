// By Zhiyi Jin and Akhila
const { MongoClient } = require("mongodb");
require("dotenv").config();
const uuid = require("uuid").v4;

function MyDB() {
    const myDB = {};
    const url = process.env.DB_URL || "mongodb://localhost:27017";
    const DB_NAME = "baby-stuff-sharing-db";

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

    myDB.createDefaultPosts = async (collectionName) => {
        let client;
        try {
            client = new MongoClient(url, { useUnifiedTopology: true });
            console.log("Connecting to the db");
            await client.connect();
            console.log("Connected!");
            const db = client.db(DB_NAME);
            const collection = db.collection(collectionName);
            defaultPosts.forEach((post) => {
                post._id = uuid();
            });
            const res = await collection.insertMany(defaultPosts);
            console.log("Inserted Default Posts", res);

            return res;
        } finally {
            console.log("Closing the connection");
            client.close();
        }
    };

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
            return res;
        } finally {
            console.log("Closing the connection");
            client.close();
        }
    };

    return myDB;
}

module.exports = MyDB();
