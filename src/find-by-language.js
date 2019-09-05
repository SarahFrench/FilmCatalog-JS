const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';
const assert = require('assert');

// Database Name
const dbName = 'film_catalog';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);

  const col = db.collection('films');

  let films = col.find({languages:{$eq: "French"}}).toArray();
  films.then(films => console.log(films))

  client.close();

});
