var pg = require('pg');
var connectionString = "postgres://postgres:rsvpd@localhost/rsvpd";

var client = new pg.Client(connectionString);
client.connect();
// var query = client.query('CREATE TABLE rsvpdevents(id SERIAL PRIMARY KEY, title text not null, date timestamp not null, image text not null, attending text[])');
var query = client.query('SELECT * FROM rsvpdevents');
query.on('end', function() { client.end(); });