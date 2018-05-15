const {ObjectId} = require('mongodb');

const {withDb} = require('./mongoDbClient');

/**
 * List all films in the catalog
 */
async function list() {
    return withDb(async (collection) => {
        const films = await collection.find().toArray();
        console.log(JSON.stringify(films, null, 4));
    });
}

/**
 * Return a film by it's ID
 */
async function get({id}) {
    return withDb(async (collection) => {
        const film = await collection.findOne({_id: new ObjectId(id)});
        console.log(JSON.stringify(film, null, 4));
    });
}

/**
 * Add a film to the catalog
 */
async function add({title, director, description, runningTime, language}) {
    return withDb(async (collection) => {
        await collection.insert({title, director, description, runningTime, language});
    });
}

/**
 * Remove a film by it's ID
 */
async function remove({id}) {
    return withDb(async (collection) => {
        const result = await collection.remove({_id: new ObjectId(id)});
        if (result.result.n === 0) {
            throw new Error(`No film found with ID: ${id}`);
        }
    });
}

/**
 * Get all films in a certain language
 */
async function getByLanguage({language}) {
    return withDb(async (collection) => {
        const films = await collection.find({language}).toArray();
        console.log(JSON.stringify(films, null, 4));
    });
}

module.exports = {
    list, add, remove, get, getByLanguage
};
