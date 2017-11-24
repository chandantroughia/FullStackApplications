const MongoClient = require('mongodb').MongoClient;

//connection url
const url = 'mongodb://localhost:27017/myproject';


MongoClient.connect(url, function(err, dbObject){
  if(err){
    return console.dir(err);
  }
  console.log('Connected to MongoDB');

  /*
  insertDocument(dbObject, function(){
    dbObject.close();
  });
  */

  /*
  insertDocuments(dbObject, function(){
    dbObject.close();
  });
  */

  /*
  findDocuments(dbObject, function(){
    dbObject.close();
  });
  */

  /*
  queryDocuments(dbObject, function(){
    dbObject.close();
  });
  */

  /*
  updateDocuments(dbObject, function(){
    dbObject.close();
  });
  */

  ///*
  removeDocuments(dbObject, function(){
    dbObject.close();
  });
  //*/

});

//insert a doc
const insertDocument = function(dbObject, callback){
  //get collection
  const collection = dbObject.collection('users');
  //insert docs
  collection.insert({
    name: 'Chandan Troughia',
    email: 'chandantroghia@gmail.com'
  }, function(err, result){
    if(err){
      return console.dir(err);
    }
    console.log('Inserted Document');
    console.log(result);
    callback(result);
  });
}


//insert multiple Documents
const insertDocuments = function(dbObject, callback){
  //get collection
  const collection = dbObject.collection('users');
  collection.insertMany([
    {
      name:'David',
      email: 'david@gamil.com'
    },
    {
      name:'Aayush',
      email: 'aayush@gamil.com'
    },
    {
      name:'Smit',
      email: 'smit@gamil.com'
    }
  ], function(err, result){
      if(err){
        return console.dir(err);
      }
      console.log('Inserted ' + result.ops.length+ ' documents');
      console.log(result);
      callback(result);
  });
}

//find documents
const findDocuments = function(dbObject, callback){
  //get collections

  const collection = dbObject.collection('users');

  collection.find({}).toArray(function(err, docs){
    if(err){
      return console.dir(err);
    }
    console.log('Found the records');
    console.log(docs);
    callback(docs);
  });
}

//queryDocuments

const queryDocuments = function(dbObject, callback){
  //get collections

  const collection = dbObject.collection('users');

  collection.find({name: 'Chandan Troughia'}).toArray(function(err, docs){
    if(err){
      return console.dir(err);
    }
    console.log('Found the record');
    console.log(docs);
    callback(docs);
  });
}

//Update documents
const updateDocuments = function(dbObject, callback){
  //get collections

  const collection = dbObject.collection('users');

  collection.updateOne({name: 'Chandan Troughia'},{$set: {email:'chandantroughia@outlook.com'}},function(err, result){
    if(err){
      return console.dir(err);
    }
    console.log('Updated document');
    //console.log(docs);
    callback(result);
  });
}

//remove a document
const removeDocuments = function(dbObject, callback){
  //get collections
  const collection = dbObject.collection('users');
  collection.deleteOne({name:'Smit'}, function(err, result){
    if(err){
      return console.dir(err);
    }

    console.log('Removed documents');
    console.log(result);
    callback(result);
  });
}
