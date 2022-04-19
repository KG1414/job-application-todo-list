// Retrieve
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const dbconnectionstring = "mongodb://kyle:GSEieaoi33wjoda@3.26.218.179:27017/kyle?connectTimeoutMS=10000&authSource=kyle&authMechanism=SCRAM-SHA-256";

// Not recommended for production systems, but...
let stored_db = null;

function getDatabase() {
    return new Promise((resolve, reject) => {
        if (stored_db)
            return resolve(stored_db);
        // Connect to the db
        const client = new MongoClient(dbconnectionstring, { useUnifiedTopology: true });
        client.connect(err => {
            if (!err) {
                stored_db = client.db();
                resolve(stored_db)
            } else {
                console.log(err)
                reject(err);
            }
        });
    });
};

async function getItems() {
    if (!stored_db) {
        await getDatabase()
    }
    const todo = stored_db.collection("todo");
    return await todo.find().toArray()
};

async function addOrUpdateItem(obj) {
    if (!stored_db) {
        await getDatabase()
    }
    const todo = stored_db.collection("todo");
    if (obj.hasOwnProperty("_id")) {
        const insertion = JSON.parse(JSON.stringify(obj))
        delete insertion._id
        const result = await todo.replaceOne({ _id: new ObjectId(obj._id) }, insertion)
        if (result.matchedCount === 0) {
            throw new Error("No matching _id found.")
        }
        return { _id: obj._id }
    }
    else {
        const result = await todo.insert(obj)
        return { _id: result.insertedIds[0] }
    };
};

module.exports = { getItems, addOrUpdateItem, getDatabase };
