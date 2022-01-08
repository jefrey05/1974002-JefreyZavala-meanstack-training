const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

var db;
const mongooseDbOption = {
  // to avoid warning
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

MongoClient.connect("mongodb://localhost:27017/", (err, database) => {
  if (err) return console.log(err);
  db = database.db("courses-db");
  app.listen(process.env.PORT || 3000, () => {
    console.log("listening on 3000");
  });
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/fetch", (req, res) => {
  db.collection("courses")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render("fetch.ejs", { courses: result });
    });
});
app.get("/add", (req, res) => {
  res.render("add.ejs");
});
app.get("/update", (req, res) => {
  res.render("update.ejs");
});
app.get("/delete", (req, res) => {
  res.render("delete.ejs");
});

app.post("/add", (req, res) => {
  db.collection("courses").save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log("saved to database");
    res.redirect("/");
  });
});

app.put("/update", (req, res) => {
  console.log(req.body.id);
  console.log(req.body.amount);
  db.collection("courses").findOneAndUpdate(
    { id: req.body.id },
    {
      $set: {
        amount: req.body.amount,
      },
    },
    {
      sort: { _id: -1 },
      upsert: true,
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

app.delete("/delete", (req, res) => {
  db.collection("courses").findOneAndDelete(
    { id: req.body.id },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Deleted");
    }
  );
});
