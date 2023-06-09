const express = require("express");
const {
  getArticleOfAuthor,
  getAllAuthorURL,
  getArticleAll,
} = require("./function");

const app = express();
const PORT = process.env.PORT || 8080;

var Ariticle = [];
var Author = [];
var All = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to WEB SCRAPING");
});

app.get("/article", (req, res) => {
  res.status(200).json({
    Ariticle: Ariticle,
  });
});

app.get("/author", (req, res) => {
  res.status(200).json({
    Author: Author,
  });
});

app.get("/all", (req, res) => {
  res.status(200).json({
    All: All,
  });
});

app.get("/scraper", async (req, res) => {
  const startURL =
    "https://scholar.google.com/citations?view_op=view_org&org=16635630670053173100&hl=th&oi=io";
  const selectorForURL = "#gsc_sa_ccl > div.gsc_1usr";
  const authorURL = await getAllAuthorURL(selectorForURL, startURL);

  const selector = "#gsc_a_b > tr";
  const author = [];
  const all = [];
  //authorURL.length
  for (let i = 0; i < 5; i++) {
    console.log("Author ", i + 1, " : " + authorURL[i].name);
    const num = i + 1;
    const data = await getArticleOfAuthor(selector, authorURL[i].url, num);
    author.push(data.author);
    all.push(data.all);
  }
  console.log("Finish");

  Ariticle = await getArticleAll();
  Author = author;
  All = all;

  res.status(200).json({
    data: all,
  });
});

app.listen(PORT, () => {
  console.log(PORT);
});
