// table creation script
var pg               = require('pg');
var path             = require('path');

var connectionString = require(path.join(__dirname, '../config'));

// main interface point with the PostgreSQL server.
var client = new pg.Client(connectionString);
client.connect(); // connect to pg

var system_status = client.query('CREATE TABLE system_status(' +
  'id SERIAL PRIMARY KEY, ' +
  'menu_verified BOOLEAN DEFAULT false,' +
  'today_menu INT DEFAULT 0' +
')');
client.query('INSERT INTO system_status VALUES(DEFAULT)');

// Communication is closed
system_status.on('end', function() { client.end(); });

var unpaidlist = client.query('CREATE TABLE unpaidlist(' +
  'id SERIAL PRIMARY KEY, ' +
  'name VARCHAR not null,' +
  'food VARCHAR not null, ' +
  'price int not null, ' +
  'note VARCHAR' +
')');
unpaidlist.on('end', function() { client.end(); }); // ??????

var paidlist = client.query('CREATE TABLE paidlist(' +
  'id SERIAL PRIMARY KEY, ' +
  'food VARCHAR not null, ' +
  'price int not null, ' +
  'amount int not null, ' +
  'owner text[] not null' +
')');
paidlist.on('end', function() { client.end(); });


