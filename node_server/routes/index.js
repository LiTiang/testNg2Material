// This file is routing system, a router module
var express = require('express');
var router  = express.Router();
var bunyan = require('bunyan');
var path    = require('path');
var pg      = require('pg');
var fs      = require('fs'); // file sys module

var log = bunyan.createLogger({name: "omos"});
var connectionString = require(path.join(__dirname, '../', 'config')); // get config.js setting
var menuCollection   = path.join(__dirname, '../../dist/menu-collection.json');
var unpaidCollection = path.join(__dirname, '../../dist/unpaid-collection.json');
var paidCollection   = path.join(__dirname, '../../dist/paid-collection.json');
// if url = [host]/ordering or [host]/ordered, then
// respond it with index.html
// and now the loutering will controled by ng2 Router
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../', 'dist/index.html'));
});

router.get('/menu', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../', 'dist/index.html'));
});

router.get('/ordered', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../', 'dist/index.html'));
});

// router.get('/ordering', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../../', 'dist/index.html'));
// }); // ---> & '/ordered'



router.get('/menu/collection', function(req, resp) {
    resp.sendFile(  menuCollection  );
});
router.get('/paid/collection', function(req, res) {
  // resp.sendFile(  paidCollection  );
  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query("SELECT * FROM paidlist ORDER BY id ASC;");
    query.on('row', function(row) { // call when read a row
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });

  });
});
// router.post('/paid/collection', function (req, res) {
//
//   console.log(req.body)
//   var indexInPaidList = req.body.index;
//   var newOwner        = req.body.owner;
//
//   var existedPaid = JSON.parse(  fs.readFileSync(paidCollection)  );
//   var paidForUpdated = existedPaid["data"][indexInPaidList];
//   console.log(paidForUpdated)
//   paidForUpdated["amount"] ++;
//   paidForUpdated["owner"] = paidForUpdated.owner.concat(  newOwner  );
//   fs.writeFileSync(  paidCollection, JSON.stringify(existedPaid)  );
//   res.end();
// });
router.get('/menu/today', function(req, res) {
  // resp.sendFile(  paidCollection  );
  var todayMenu = {};

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query("SELECT today_menu FROM system_status;");
    query.on('row', function(row) {
      todayMenu.menuIndex = row.today_menu;
    });
    query.on('end', function() {
      done();
      return res.json(todayMenu);
    });

  });
});


router.put('/remove/paid/owner', function (req, res) {
  var owner = {  name: req.body.owner, id: req.body.foodId  };
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query({
      text: "UPDATE paidlist SET owner=array_remove(owner, $1), amount=amount-1 WHERE id=$2;",
      values: [owner.name, owner.id]
    });
    client.query({
      text:"DELETE FROM paidlist WHERE id=$1 AND amount=0",
      values: [owner.id]
    });
    query.on('end', function() {
      done();
      return res.end();
    });
  });
});

router.put('/menu/today', function (req, res) {
  var today_menu = req.body.menuIndex;
  console.log(today_menu);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query({
      text: "UPDATE system_status SET today_menu = $1;",
      values: [today_menu]
    });
    query.on('end', function() {
      done();
      return res.end();
    });
  });
});

router.put('/menu/status', function (req, res) {
  var menu_status = req.body.status;
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query({
      text: "UPDATE system_status SET menu_verified = $1;",
      values: [menu_status]
    });
    query.on('end', function() {
      done();
      return res.end();
    });
  });
});
router.get('/menu/status', function (req, res) {
  var menu = {};
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query("SELECT * FROM system_status;");
    query.on('row', function(row) { // call when read a row
      menu.status = row.menu_verified;
    });
    query.on('end', function() {
      done();
      return res.json(menu);
    });

  });
});

// why paid/collection cant work ??????
router.put('/paid/collection', function (req, res) {
  var updatedPaid = {  foodIdInPaidList: req.body.id, owner: req.body.owner, amount: req.body.amount  };
  log.info(req.body);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query({
      text:"UPDATE paidlist SET amount=$1, owner=$2 WHERE id=$3",
      values:[updatedPaid.amount, updatedPaid.owner, updatedPaid.foodIdInPaidList]
    });

    query.on('end', function() {
      done();
      return res.end();
    });
  });
});

router.post('/paid/collection', function (req, res) {
  var paid = {food: req.body.food, price: req.body.price, amount: req.body.amount, owner: req.body.owner};
  console.log(paid);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query("INSERT INTO paidlist(food, price, amount, owner) " +
      "values($1, $2, $3, $4)", [paid.food, paid.price, paid.amount, [paid.owner]]);

    query.on('end', function() {
      done();
      return res.json(req.body);
    });
  });
  // var existedPaid = JSON.parse(  fs.readFileSync(paidCollection)  );
  // existedPaid["data"].push(req.body);
  // fs.writeFileSync(  paidCollection, JSON.stringify(existedPaid)  );
  // console.log(existedPaid);
  // res.send(existedPaid);
});

router.get('/unpaid/collection', function(req, res) {
  // var existedUnpaid = JSON.parse(  fs.readFileSync(unpaidCollection)  );
  // res.send(existedUnpaid);
  var results = [];

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    var allUnpaid = client.query("SELECT * FROM unpaidlist ORDER BY id ASC;");

    allUnpaid.on('row', function(row) { // call when read a row
      results.push(row);
    });

    allUnpaid.on('end', function() {
      done();
      return res.json(results);
    });

  });
});

router.post('/unpaid/collection', function(req, res) {
  // because body-praser.json(), req.body's format become non-json
  // Grab data from http request
  var unpaid = {name: req.body.name, food: req.body.food, price: req.body.price, note: req.body.note};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // SQL Query > Insert Data
    var query = client.query("INSERT INTO unpaidlist(name, food, price, note) " +
      "values($1, $2, $3, $4)", [unpaid.name, unpaid.food, unpaid.price, unpaid.note]);
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.end("yes");
    });
  });
  // var existedUnpaid = JSON.parse(  fs.readFileSync(unpaidCollection)  );
  // existedUnpaid["data"].push(req.body);
  // fs.writeFileSync(  unpaidCollection, JSON.stringify(existedUnpaid)  );
  // res.send(existedUnpaid);
});

router.delete('/remove/unpaid/:byId', function (req, res) {
  var id = req.params.byId;
  pg.connect(connectionString, function(err, client, done) {
     if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    // var paidPrice = client.query("SELECT price FROM unpaidlist WHERE id=($1)",[id]);
    // paidPrice.on('row', function(row) { // call when read a row
    //   client.query("UPDATE dashboard SET total_money=total_money+($1)",[row.price]);
    // });
    // client.query("UPDATE dashboard SET total_food=total_food+1");
    var paidTheUnpaid = client.query("DELETE FROM unpaidlist WHERE id=($1)", [id]);
    paidTheUnpaid.on('end', function() {
      done();
      return res.end();
    });
  });
  // var existedUnpaid = JSON.parse(  fs.readFileSync(unpaidCollection)  );
  // existedUnpaid["data"].splice(index, 1);
  // fs.writeFileSync(  unpaidCollection, JSON.stringify(existedUnpaid)  );
  // res.end();
});
module.exports = router;
