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
      const response = await collection.insertOne(
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
     );
      console.log('\nSuccess! Added a document with these values:');
      console.log(`title: ${response.ops[0].title}\ndirectors: ${response.ops[0].directors}\ndescription: ${response.ops[0].description}\nrunning time: ${response.ops[0].running_time}\nlanguages: ${response.ops[0].languages}`)
    })
  } catch(err){
    console.log(err)
;  }

}

/**
 * Remove a film by it's ID
 */
async function remove({id}) {
  try {
    return withDb(async (collection) => {
      const response = await collection.deleteOne(
        { "_id" : ObjectId(id) }
      );
      console.log('\nSuccess!');
      console.log(`${response.deletedCount} record(s) were deleted with id = ${id}`);
    })
  } catch(err) {
    console.log(err)
  }
}

/**
 * Get all films in a certain language
 */
async function getByLanguage({language}) {
  try {
    return withDb(async (collection) => {
      const films = await collection.find({languages:{$eq: language}}).toArray();
      console.log("\nSuccess!");
      console.log(`\n${films.length} film(s) are available in ${language}:`);
      films.forEach(film => {
        console.log(`\t${film.title}: ${film.description}\n`);
      })

    })
  } catch(err) {
    console.log(err)
  }
}

module.exports = {
    list, add, remove, get, getByLanguage
};
