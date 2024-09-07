// Getting Express Freamwork
const express = require("express");
const app = express();

// Cpnnecting to Mongodb Database
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://devmohammedalfakir:devmohammedalfakirPassword@cluster0.naqz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Successfully to db");
  })
  .catch(error => {
    console.log("Not Connecting To Db", error);
  });

// Calling Article Model
const Article = require("./models/Article");

// Controllers
app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/hello", (req, res) => {
  let total = "";
  for (let i = 0; i < 50; i++) {
    total += i + "-";
  }

  res.render("hello.ejs", {
    name: "Simo",
    total: total,
  });
});

app.post("/addPost", (req, res) => {
  res.send("Post Added");
});

app.delete("/deletePost", (req, res) => {
  res.send("Post Deleted");
});

app.get("/sum/:number1/:number2", (req, res) => {
  const num1 = Number(req.params.number1);
  const num2 = Number(req.params.number2);
  const total = num1 + num2;
  res.send(total);
});

app.use(express.json());
app.get("/sayHello/:tech", (req, res) => {
  const name = req.body.name;
  const age = req.query.age;
  const tech = req.params.tech;
  res.json({
    name,
    age,
    tech,
  });
});

// Post Articles Controller
app.post("/articles", async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const newArticle = new Article();
  newArticle.title = title;
  newArticle.body = body;
  newArticle.likes = 0;
  await newArticle.save();
  res.json(newArticle);
});

// Get Articles API Controller
app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.send(articles);
});

// Delete Articles Controller
app.delete("/articles/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const articles = await Article.findByIdAndDelete(id);
  res.send(articles);
});

// Showing Articles with Artcles.ejs in Client side
app.get("/showArticles", async (req, res) => {
  const articles = await Article.find();
  res.render("articles.ejs", {
    allArticles: articles,
  });
});

// Port of The Server
app.listen(3000, () => {
  console.log("I'm Lestening in port 3000");
});
