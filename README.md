![cf](http://i.imgur.com/7v5ASc8.png) 11: Express and Mongo
===

## Documentation  
* when posting -> need to include a "name" and also "wizard" field.  you can use below
* echo '{"name":"harry potter","wizard":"yes"}' | http post :6969/api/notes
 
* get request will retrieve everything in database if no ID is given. otherwise will get that specific ID if it exists or 404 if it doesnt

* delete will delete the databse item with ID given if it exists...if no ID is given it will return a 400 with that message