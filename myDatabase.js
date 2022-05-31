var express = require("express");
var mongoose = require("mongoose");
var DataModel = require("./models/Data");

let myDatabase = function() {

}

myDatabase.prototype.postData = function(data) {
  let obj = {fileName:data.fileName, name:data.name, likes:0, user:data.user, color:data.color};
  //new Data(_data.grade);
  //return {error:false});
  DataModel.create(obj,function(error,info) {
      if (error) {
          return {error:true};
      }
      return {error:false};
  });
}

myDatabase.prototype.getData = function(fileName1) {

  DataModel.find({fileName:fileName1},function(error,info) {
    console.log(info);
      if (error) {
          return {error:true};
      }
      else if (info == null) {
          return {error:true};
      }
      else if (info.length == 1)    
      {
          return {error:false,name:info[0].name ,likes:info[0].likes,user:info[0].user};
      }
      else
      {
          return {error:true};
      }
   });
}
myDatabase.prototype.getAllData = function(callback) {
  DataModel.find({}).lean().exec(function(error,info) {
      if (error) {
          callback(null);
      }
      else if (info == null) {
          callback(null);
      }
      else if (info.length >= 1)    
      {
          callback(info);
      }
      else
      {
          callback(null);
      }
   });
  

}
 

myDatabase.prototype.putData = function(fileName1, likes1) {
  DataModel.findOneAndUpdate({fileName:fileName1},{$inc : {'likes' : likes1}},function(error,oldData) {
    if (error) {
      return {error:true};
    }
    else if (oldData == null) {
      return {error:true};
    }
    return {error:false};
  });
}

myDatabase.prototype.deleteData = function(fileName) {
    DataModel.remove({'fileName':fileName},function(error,removed) {
        if (error) {
            return {error:true};
        }        
        if (removed.result.n == 0)
            return {error:true};
        return {error:false};
    });
}
myDatabase.prototype.deleteAllData = function() {
    DataModel.remove({},function(error,removed) {
        if(error)
          console.log('error on del all img');
    });
}

module.exports = myDatabase;