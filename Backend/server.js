const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mysql = require('mysql');
require('dotenv').config(); // get .env credentials

const factory = require('./factory.js');

const app = express();

let analyseDevicesRunning = false;

// basic configuration
const port = process.env.PORT || 80;        // set our port
const env = process.env.ENV || 'prod';

// Log requests to the console.
app.use(logger('dev'));

// server config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const version = 'v1'

// config api router
const router = express.Router();

const db = mysql.createPool({
  host     : process.env.MYSQL_HOST,
  port     : process.env.MYSQL_PORT,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE,
  connectionLimit : 20,
});

// middleware to use for all requests
router.use(function(req, res, next) {
  // proceed
  next();
});

// API welcome message
router.get('/', function(req, res) {
  res.json({ message: 'Hooray! welcome to COSE VR API!' });
});

// more routes for our API will happen here
router.route('/info')
  .get((req, res) => {

    // count over all tables and prepare json object
    db.query('SELECT COUNT(*) FROM SearchItems', function(err, rows1, fields) {
      db.query('SELECT COUNT(*) FROM Conditions', function(err, rows2, fields) {
        db.query('SELECT COUNT(*) FROM ListingInfos', function(err, rows3, fields) {
          db.query('SELECT COUNT(*) FROM Tag', function(err, rows4, fields) {
            const obj = {
              endpoints: [
                `${req.headers.host}/${version}/info`,
                `${req.headers.host}/${version}/searchitems`,
                `${req.headers.host}/${version}/searchitems/item_id`,
                `${req.headers.host}/${version}/conditions`,
                `${req.headers.host}/${version}/conditions/id`,
                `${req.headers.host}/${version}/listinginfos`,
                `${req.headers.host}/${version}/listinginfos/id`,
                `${req.headers.host}/${version}/sellingstatusdbbodel`,
                `${req.headers.host}/${version}/sellingstatusdbbodel/id`,
                `${req.headers.host}/${version}/tag`,
                `${req.headers.host}/${version}/tag/id`,
                `${req.headers.host}/${version}/device`,
                `${req.headers.host}/${version}/device/id`
              ],
              numberOfSearchItems: rows1,
              numberOfConditions: rows2,
              numberOfListeningInfo: rows3,
              numberOfTags: rows4,
            };

            res.json(obj);
          });
        });
      });
    });
  });

// REST calls
router.route('/searchitems')
  .get((req, res) => {
      db.query('SELECT * FROM SearchItems', function(err, rows, fields) {

        if (err) {
          res.send(err);
        } else {
          res.json(rows);
        }
      });
  });

router.route('/searchitems/:item_id')
  .get((req, res) => {
    db.query(`SELECT * FROM SearchItems WHERE ItemId = '${req.params.item_id}'`, function(err, rows, fields) {

      if (err) {
        res.send(err);
      } else {
        res.json(rows);
      }
    });
  });

router.route('/conditions')
  .get((req, res) => {
    db.query('SELECT * FROM Conditions', function(err, rows, fields) {

      if (err) {
        res.send(err);
      } else {
        res.json(rows);
      }
    });
  });

router.route('/conditions/:condition_id')
  .get((req, res) => {
    db.query(`SELECT * FROM Conditions WHERE Id = '${req.params.condition_id}'`, function(err, rows, fields) {

      if (err) {
        res.send(err);
      } else {
        res.json(rows);
      }
    });
  });

router.route('/listinginfos')
  .get((req, res) => {
    db.query('SELECT * FROM ListingInfos', function(err, rows, fields) {

      if (err) {
        res.send(err);
      } else {
        res.json(rows);
      }
    });
  });

router.route('/listinginfos/:listinginfos_id')
  .get((req, res) => {
    db.query(`SELECT * FROM ListingInfos WHERE Id = '${req.params.listinginfos_id}'`, function(err, rows, fields) {

      if (err) {
        res.send(err);
      } else {
        res.json(rows);
      }
    });
  });

router.route('/sellingstatusdbbodel')
  .get((req, res) => {
    db.query('SELECT * FROM SellingStatusDbModel', function(err, rows, fields) {

      if (err) {
        res.send(err);
      } else {
        res.json(rows);
      }
    });
  });

router.route('/sellingstatusdbbodel/:sellingstatusdbbodel_id')
  .get((req, res) => {
    db.query(`SELECT * FROM SellingStatusDbModel WHERE Id = '${req.params.sellingstatusdbbodel_id}'`, function(err, rows, fields) {

      if (err) {
        res.send(err);
      } else {
        res.json(rows);
      }
    });
  });

router.route('/device')
  .get((req, res) => {
    db.query('SELECT * FROM Device', function(err, rows, fields) {

      if (err) {
        res.send(err);
      } else {
        res.json(rows);
      }
    });
  });

router.route('/device/:device_id')
  .get((req, res) => {
    db.query(`SELECT * FROM Device WHERE id = '${req.params.device_id}'`, function(err, rows, fields) {

      if (err) {
        res.send(err);
      } else {
        res.json(rows);
      }
    });
  });

router.route('/tag')
  .get((req, res) => {
    db.query('SELECT * FROM Tag', function(err, rows, fields) {

      if (err) {
        res.send(err);
      } else {
        res.json(rows);
      }
    });
  });

router.route('/tag/:tag_id')
  .get((req, res) => {
    db.query(`SELECT * FROM Tag WHERE id = '${req.params.tag_id}'`, function(err, rows, fields) {

      if (err) {
        res.send(err);
      } else {
        res.json(rows);
      }
    });
  });

// conmplex actions
router.route('/items')
  .get((req, res) => {
    factory.getAllItems(db)
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      res.send(error);
    })
  });

router.route('/items/:item_id')
  .get((req, res) => {
    factory.getItemWithId(db, req.params.item_id)
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      res.send(error);
    })
  });

router.route('/distinct/items')
  .get((req, res) => {
    factory.getAllItemDistinct(db)
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      res.send(error);
    });
  })

router.route('/locations')
  .get((req, res) => {
    factory.getAllLocations(db)
    .then((rows) => {
      res.json(rows);
    })
    .catch((error) => {
      res.send(error);
    });
  })

// start server and start listening
app.use('/api/v1', router);

if (env !== 'prod') {
  app.listen(port, function() { console.log('listening on port: ' + port)});
} else {
  app.listen(port);
}
