# Film catalog
============

Film Catalog exercise for learning about MongoDB



## Sarah's notes:

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
