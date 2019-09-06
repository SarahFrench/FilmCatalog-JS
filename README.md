# Film catalog
============

Film Catalog exercise for learning about MongoDB



## Sarah's notes:

### add()

Made an add function for adding documents to the film_catalog collection in MongoDB.
Example command line code for adding a document:

```
node src/index.js add --title="The Royal Tenenbaums" --directors="Wes Anderson" --description="The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons." --running_time=110 --languages="English" --languages="Italian"
```

For fields that expect array input you submit values by using a field flag multiple times. For the above command line input you'll produce this document:

```
  {
    "_id":"5d7115106a1f6226ecf59c46",
    "title":"The Royal Tenenbaums",
    "directors":["Wes Anderson"],
    "description":"The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons.",
    "running_time":110,
    "languages":["English","Italian"]
  }
```


### remove()

To make the remove function I used MongoDB's deleteOne method, which returns the first document that fulfills criteria set in a filter. As I'm filtering by id, which should be unique, I can be confident that the record deleted is the intended one.

```
node src/index remove --id=5d691e74cd925e243b737e73
```

### getByLanguage()

To search by language you use the find method and set a filter that checks for elements inside the languages field that match the query string.

This requires the search filter to be more complex than the one used for deleting by ID: `{languages:{$eq: language}}` , versus `{ "_id" : ObjectId(id) }` for the above. `$eq` is a [query operator](https://docs.mongodb.com/manual/reference/operator/query/)

```
node src/index.js getByLanguage --language="French"
```
