var exphbs = require("express-handlebars");
var express = require("express");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 4756;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { burger: data });
  });
});

app.get("/:id", function(req, res) {
  connection.query("SELECT * FROM burgers where id = ?", [req.params.id], function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    console.log(data);
    res.render("index", data[0]);
  });
});

app.post("/api/burgers", function(req, res) {
  connection.query("INSERT INTO burgers (burger) VALUES (?)", [req.body.burger], function(
    err,
    result
  ) {
    if (err) {
      return res.status(500).end();
    }

    res.json({ id: result.insertId });
  });
});

app.delete("/api/burgers/:id", function(req, res) {
  connection.query("DELETE FROM burgers WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

app.put("/api/burgers/:id", function(req, res) {
  connection.query(
    "UPDATE burgers SET devoured = ? WHERE id = ?",
    [req.body.devoured, req.params.id],
    function(err, result) {
      if (err) {
        console.log(err)
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
