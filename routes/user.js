'use strict';

var fs = require('fs');
var Log = require('log')
  , log = new Log('info');

exports.list = function(req, res){
  res.send("respond with a resource");
};

//requestProject API for retrieving a specific project
exports.requestProject = function(req, res){
  var json_responses ;

  var projectid = req.param("projectid");
  var country = req.param("country");
  var number = req.param("number");
  var keyword = req.param("keyword");
  var maxcost = 0;
  var ret ="";
  var proj;

  fs.readFile('./json.txt', function (err, data) {

    if (err) {
      log.error('failed to open file json.txt');
    };
    var json = JSON.parse(data)
    var currDate = new Date();
    json_responses = {"status_code":"200", "data":""};

    if(projectid == undefined && country == undefined && number == undefined && keyword == undefined){
      log.info('Nothing mentioned in the URL. Hence finding the Project with max cost.');
      log.info('Return project with max cost only if it has valid projectURL, it is enabled and expiryDate is not passed.');
      for(var i = 0; i<json.projects.length;i++) {
        proj = json.projects[i];
        if(proj.projectCost > maxcost && null != proj.projectUrl && proj.projectUrl !="" && proj.enabled){
          var expiryDate = convertToDate(proj.expiryDate);
          if(currDate<=expiryDate){
            ret = proj;
            maxcost = proj.projectCost;
          }
        }
      }
      log.info('making the response to send.');
      json_responses = {"status_code":"200", "data":ret};
    }
    else if(projectid != undefined){
      log.info('Only projectid is provided. Returning project for that specific project id.');
      log.info('Return project with max cost only if it has valid projectURL, it is enabled and expiryDate is not passed.');

      for(var i = 0; i<json.projects.length;i++) {
        proj = json.projects[i];
        if(null != proj.projectUrl && proj.projectUrl !="" && proj.enabled){
          var expiryDate = convertToDate(proj.expiryDate);
          if(currDate<=expiryDate && proj.id == projectid){
            ret = proj;
          }
        }
      }
      log.info('making the response to send.');
      json_responses = {"status_code":"200", "data":ret};
    }
    else if(country != undefined && number != undefined && keyword != undefined){
      log.info('Only country, number and keyword are mentionedin the URL.');
      log.info('Return project with max cost only if it has valid projectURL, it is enabled and expiryDate is not passed.');

      for(var i = 0; i<json.projects.length;i++) {
        proj = json.projects[i];
        if(proj.projectCost > maxcost && null != proj.projectUrl && proj.projectUrl !="" && proj.enabled){
          var expiryDate = convertToDate(proj.expiryDate);
          if(currDate<=expiryDate){
            var array = [];
            array = JSON.stringify(proj.targetCountries);
            array.toUpperCase();
            if (array.includes(country.toUpperCase())) {
               var targetKeys = proj.targetKeys;
                for(var k = 0; k <targetKeys.length;k++){
                  if(targetKeys[k].number == number && targetKeys[k].keyword == keyword){
                    log.info('Matching project found with country, number and keyword.');
                    ret = proj;
                    maxcost = proj.projectCost;
                  }
                }
            }
          }
        }
      }
      json_responses = {"status_code":"200", "data":ret};
    }
    else if(country != undefined && number != undefined && keyword == undefined){
      log.info('Only country and number are mentioned in URL.');
      log.info('Return project with max cost only if it has valid projectURL, it is enabled and expiryDate is not passed.');

      for(var i = 0; i<json.projects.length; i++) {
        proj = json.projects[i];
        if(proj.projectCost > maxcost && null != proj.projectUrl && proj.projectUrl !="" && proj.enabled){
          var expiryDate = convertToDate(proj.expiryDate);
          if(currDate<=expiryDate){
            var array = [];
            array = JSON.stringify(proj.targetCountries);
            array.toUpperCase();
            if (array.includes(country.toUpperCase())) {
              var targetKeys = proj.targetKeys;
              for(var k = 0; k <targetKeys.length;k++){
                if(targetKeys[k].number == number){
                  log.info('Matching project found with country and number.');
                  ret = proj;
                  maxcost = proj.projectCost;
                }
              }
            }
          }
        }
      }
      json_responses = {"status_code":"200", "data":ret};
    }
    else if(country != undefined && number == undefined && keyword == undefined){
      log.info('Only country in URL.');
      log.info('Return project with max cost only if it has valid projectURL, it is enabled and expiryDate is not passed.');

      for(var i = 0; i<json.projects.length;i++) {
        proj = json.projects[i];
        if(proj.projectCost > maxcost && null != proj.projectUrl && proj.projectUrl !="" && proj.enabled){
          var expiryDate = convertToDate(proj.expiryDate);
          if(currDate<=expiryDate){
            var array = [];
            array = JSON.stringify(proj.targetCountries);
            array.toUpperCase();
            if (array.includes(country.toUpperCase())) {
              log.info('Matching project found with country.');
              ret = proj;
              maxcost = proj.projectCost;
            }
          }
        }
      }
      json_responses = {"status_code":"200", "data":ret};
    }
    else if(country == undefined && number != undefined && keyword == undefined){
      log.info('Only number are mentioned in URL.');
      log.info('Return project with max cost only if it has valid projectURL, it is enabled and expiryDate is not passed.');

      for(var i = 0; i<json.projects.length;i++) {
        proj = json.projects[i];
        if(proj.projectCost > maxcost && null != proj.projectUrl && proj.projectUrl !="" && proj.enabled){
          var expiryDate = convertToDate(proj.expiryDate);
          if(currDate<=expiryDate){
            var targetKeys = proj.targetKeys;
            var min = number;
            var flag = false;
            for(var k = 0; k <targetKeys.length;k++){
              if(targetKeys[k].number < min){
                flag = true;
                break;
              }
            }
            if(!flag){
              log.info('Matching project found with number and minimum number.');
              ret = proj;
              maxcost = proj.projectCost;
            }
          }
        }
      }
      json_responses = {"status_code":"200", "data":ret};
    }
    else if(country == undefined && number == undefined && keyword != undefined){
      log.info('Only keyword are mentioned in URL.');
      log.info('Return project with max cost only if it has valid projectURL, it is enabled and expiryDate is not passed.');

      for(var i = 0; i<json.projects.length;i++) {
        proj = json.projects[i];
        if(proj.projectCost > maxcost && null != proj.projectUrl && proj.projectUrl !="" && proj.enabled){
          var expiryDate = convertToDate(proj.expiryDate);
          if(currDate<=expiryDate){
              var targetKeys = proj.targetKeys;
              for(var k = 0; k <targetKeys.length;k++){
                if(targetKeys[k].keyword == keyword){
                  ret = proj;
                  maxcost = proj.projectCost;
                }
              }
          }
        }
      }
      json_responses = {"status_code":"200", "data":ret};
    }
    var obj;
    if(ret !="") {
      log.info('Project Found.');
     obj = {
        "projectName": ret.projectName,
        "projectCost": ret.projectCost,
        "projectUrl": ret.projectUrl
      }
      json_responses = obj;
    }
    else {
      log.info('No Project Found.');
      obj = "No Project Found";
      json_responses = {"message": obj};
    }
    log.info('Response sent.');
    res.send(json_responses);
    res.end();
  })
};

//createProject API for creating a new project

exports.createProject = function(req, res){
  var json_responses;
  var obj;
  var json;

  fs.readFile('./json.txt', function (err, data) {
    if (err) {
      log.error('failed to open file json.txt');
    };

    obj = JSON.parse(data);
    obj.projects.push(req.body);
    json = JSON.stringify(obj);
    fs.writeFile("./json.txt", json, function(err){
      if (err) {
        log.info('The "data to append" was not appended to file!');
        json_responses = {"status_code":"400","message":"Error parsing json input"};
        res.send(json_responses);
        res.end();
      }
      else{
        log.info('The "data to append" was appended to file!');
        json_responses = {"status_code":"200","message":"The data to append was appended to file"};
        res.send(json_responses);
        res.end();
      }
    });
  });
};


function convertToDate(date) {
  var month = date.substring(0,2);
  var day = date.substring(2,4);
  day = parseInt(day)+1;
  var year = date.substring(4,8);

  return new Date(year +"-" + month +"-" + day);
}