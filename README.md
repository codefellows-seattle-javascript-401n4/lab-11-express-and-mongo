![cf](https://i.imgur.com/7v5ASc8.png) 11: Single Resource Express API
======

## Instructions for setting up and using MongoDB
_google mongo Shell Quick Reference for useful commands to run in your mongo console and to verify that you have data going in and to see where things are going wrong_
1. make a db folder for each of your project: $mkdir db
2. make sure db is in your gitignore, so it's not commited up to github
3. compared to SQL, there is very little setup in Mongodb
4. to run the mongo server or mongo daemon type in the following mongo command into the console
$mongod --dbpath=./db
5. after running the --dbpath=./db, you will see a message at the bottom "waiting for connections on port 27017"

//apply promAll on require MongoDB/grabbing MongoClient and running it through promAll so that we have access to promisify connections inside of there
//we are running the collection through a promAll so that we can do things that will give us promises back
const MongoClient = promAll(require('mongodb').MongoClient);

###There are steps that we have to do before running any CRUD operations
Connecting to our MongoDB database...


`const connection = MongoClient.connectAsync('mongodb://localhost:27017/mongopromisify')
  .then(db => {
    const col = promAll(db.collection('notes'));
    col.insertAsync({noteBody: 'here is our first note'})
    .then(console.log)
    .then(db.close.bind(db))
    .catch(console.log)
    return db;
    })
`    
//we name the name of the database that we are connecting to: monogopromisify
const connection = MongoClient.connectAsync('mongodb://localhost:27017/mongopromisify')
  .then(db => {
    //creating a collection off of the connection; if the collection notes already exists, this will give us a reference to that already existing notes collection; if the notes collection does not exist, it will create it for us; promiseAll the results
      const col = promAll(db.collection('notes'));
      //.insertAsync takes a JSON/BSON/javascript object and store all those key value pairs into our database; also, we don't need to provide an ID when storing
      //unlike SQL, MongoDB will provide us back with an ID
      //calling insertAsync; we are inserting a single note here, but we could insert an array of notes also
      //.insert is what CRUD method? create.
      col.insertAsync({notebody: 'here is our first note'})
        //console.log the results by passing in console.log into .then(); the parameter will be the result from the insertAsync; there are a lot of metadata on the result
        .then(console.log)
        //close the db otherwise db will stay open until we control C out of it
        //passing a function into a promise changes its context, so we do .bind(db) to make sure that we are running db.close in the context of db; otherwise it would run it as an anonymous function as supposed to a method on db; it would run it as a callback rather than a method on db; it would no longer point to the db object; it would point to whatever context that promises it; this is why we bind it back to that db object
        .then(db.close.bind(db))
        .catch(console.log)
        //return db to continue using this connection to continue doing things with that db
        return db;
    });

//run the following command to see the created note above from console.log
  $ node mongo-crub.js
//should see the following in the mongo console
//result with ok 1 means we inserted one document into the database
`{result: { ok: 1, n: 1 },
  ops:
    [{noteBody: 'here is our first note',
     _ id: 59e9690260b0e22c65563909 }],
  insertedCount: 1,
  insertedIds: [ 59e9690260b0e22c655639a9 ]}
`
*running this command in the mongo console to view all the databases that you have inside of your MongoDB server*
$mongo
show dbs
//should see the following:

admin  0.000GB
local  0.000GB
mongopromisify 0.000GB

//admin and local are always there; they are created by default when you start the Mondo daemon
//mongopromisify is the database that we created above

*to choose which database you want to look at by typing the following into the console*
use mongopromisify
*to see a list collections that we have added to our database, run this command*
show collections
*the command for reading is to find, run the following command in the mongo console*
db notes find({}); //passing in an empty object
## Submission Instructions
  * fork this repository & create a new branch for your work
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

## Learning Objectives  
* students will be able to create a single resource API using the express framework
* students will be able to leverage 3rd party helper modules for debugging, logging, and handling errors

## Requirements

#### Configuration
* `package.json`
* `.eslintrc`
* `.gitignore`
* `README.md`
  * your `README.md` should include detailed instructions on how to use your API

#### Feature Tasks
* create an HTTP server using `express`
* create a object constructor that creates a _simple resource_ with at least 3 properties
  * it can **not** have the same properties as the in-class sample code (other than the `id`)
  * a unique `id` property should be included *(node-uuid)*
  * include two additional properties of your choice
* use the JSON parser included with the `body-parser` module as a middleware component to parse the request body on `POST` and `PUT` routes
* use the npm `debug` module to log the methods in your application
* create an `npm` script to automate the `debug` process and start the server
* persist your API data using the storage module and file system persistence

#### Server Endpoints
* **`/api/simple-resource-name`**
* `POST` request
 * pass data as stringifed JSON in the body of a **POST** request to create a new resource
* `GET` request
 * pass `?id=<uuid>` as a query string parameter to retrieve a specific resource (as JSON)
* `DELETE` request
 * pass `?id=<uuid>` in the query string to **DELETE** a specific resource
 * this should return a 204 status code with no content in the body

#### Tests
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure the `/api/simple-resource-name` endpoint responds as described for each condition below:
 * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
 * `GET`: test 400, it should respond with 'bad request' if no id was provided in the request
 * `GET`: test 200, it should contain a response body for a request made with a valid id
 * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
 * `POST`: test 200, it should respond with the body content for a post request with a valid body
