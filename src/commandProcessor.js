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
async function add({title, directors, description, running_time, languages}) {
  try {
    return withDb(async (collection) => {
      const create = await collection.insertOne(
       {
         "title": title,
         "directors": directors,
         "description": description,
         "running_time": running_time,
         "languages": languages

       },
       {
        writeConcern: {
          w: 1,
          j: true,
          wtimeout: 0
        }
       }
      )
      return create;
    })

  } catch(err){
    console.log(err)
;  }

}

/**
 * Remove a film by it's ID
 */
async function remove({id}) {
    // TODO
}

/**
 * Get all films in a certain language
 */
async function getByLanguage({language}) {
    // TODO
}

module.exports = {
    list, add, remove, get, getByLanguage
};
