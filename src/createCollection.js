const mongodb = require('mongodb');
const {collectionName, dbName, connectionString} = require('./config');

async function main() {
    const client = await mongodb.MongoClient.connect(connectionString);

    try {
        const db = await client.db(dbName);

        // Check for existing collection
        const existingCollections = (await db.listCollections().toArray()).map(collection => collection.name);
        if ((existingCollections).includes(collectionName)) {
            throw new Error(`Collection ${collectionName} already exists in database ${dbName}`);
        }

        // Create collection
        const collection = await db.createCollection(collectionName);
        collection.createIndex({
            "language": 1
        })
    } finally {
        client.close();
    }
}

main()
    .then(() => console.log("Successfully created collection"))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
