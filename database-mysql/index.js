const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllLines = function(callback) {
  var sql = 'SELECT * FROM service_lines';
  connection.query(sql, function(err, results) {
    if (err) {
      console.error(err);
    } else {
      callback(results);
    }

  })

}

const getOneLinesStops = function(lineID, callback) {
  var sql = 'SELECT * FROM `stops` WHERE `line_id` = ?';
  //console.log("SQL", sql)
   connection.query(sql,[lineID], (err, results) => {
    //connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      callback(results);
    }
  })
}


const getAllStations = function(callback) {
  var sql = 'SELECT * FROM stations';
  connection.query(sql, function(err, results) {
    if (err) {
      console.error(err);
    } else {
      callback(results);
    }
  })
}

const updateFavorite = function(stationName) {
  var sql = 'UPDATE stations SET is_favorite = !is_favorite WHERE name = ?';
  connection.query(sql, [stationName], (err) => {
    if (err) {
      console.error(err);
    } 
  })
}

const getAllFavorites = function(callback) {
  var sql = 'SELECT * FROM stations WHERE is_favorite = true';
  connection.query(sql, function(err, results) {
    if (err) {
      console.error(err);
    } else {
      callback(results);
    }
  })
}

module.exports = {
  getAllLines,
  getOneLinesStops,
  updateFavorite,
  getAllStations,
  getAllFavorites
};
