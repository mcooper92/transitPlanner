const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database-mysql');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));


app.get('/api/lines', (req, res) => {
  db.getAllLines((err, results) => {
    if (err) {
      res.send(err);
    } else {
    console.log("RESULTS:", results)
    res.json(results);
    }
  })

});

app.get('/api/lines/:lineId', (req, res) => {
  db.getOneLinesStops(req.query.lineId, (results) => {
    res.json(results)
  })
  

});

app.get('/stationsInTripPlanner', (req, res) => {
  db.getAllStations((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  })
});


app.post('/favoriteStations', (req, res) => {
  //console.log(req.body.stationName)
  db.updateFavorite(req.body.stationName, (err) => {
    if (err) {
      console.error(err)
    }
  })
})

app.get('/favoriteStations', (req, res) => {
  db.getAllFavorites((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  })
})


// Write additional route handlers as needed below!

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
