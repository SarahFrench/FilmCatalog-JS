const mongodb = require('mongodb');
const {collectionName, dbName, connectionString} = require('./config');

async function getCollection(db) {
    const existingCollections = (await db.listCollections().toArray()).map(collection => collection.name);
    if (!(existingCollections).includes(collectionName)) {
        throw new Error(`Collection ${collectionName} doesn't exist in database ${dbName}`);
    }
    return db.collection(collectionName);
}

/**
 * Calls <func> with the MongoDB "films" collection instance.
 *
 * Creates a MongoDB client instance before calling <func> and destroys it afterwards.
 */
async function withDb(func) {
    const client = await mongodb.MongoClient.connect(connectionString);
    try {
        const db = client.db(dbName);
        const collection = await getCollection(db);
        return func(collection);
    } finally {
        client.close();
    }
}

module.exports = {withDb};
