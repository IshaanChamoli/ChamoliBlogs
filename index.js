/*
EDITS REMAINING:

1) Add Title, make sure its addded to all... index, publish, and edit.ejs... operates just like the normal content, just above it...
2) Doe the same with author... add "Author:      " at the end of each blog...
2) Make users "enter" line-breaks come up in the published list as well... right now, it doesnt register the user line breaks...

*/

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var blogs = [];
var numBlogs = 0;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    content: blogs,
    count: numBlogs
  });
  res.redirect("/");
});

app.get("/publish", (req, res) => {
    res.render("publish.ejs");
  });

app.post("/published", (req, res) => {
    res.redirect("/");
    blogs.push(req.body.content);
    numBlogs++;
    res.render("index.ejs", {
        content: blogs,
        count: numBlogs
    });
    
});

app.post("/clear", (req, res) => {
        blogs = [];
        numBlogs = 0;
        res.redirect("/");
});

app.post("/edit", (req, res) => {
  res.render("edit.ejs", {
    content: blogs[req.body.index],
    i: req.body.index
  })
})

app.post("/edited", (req, res) => {
  blogs[req.body.index] = req.body.editedcontent;
  res.redirect("/")
})

app.post("/delete", (req, res) => {
  blogs.splice(req.body.index, 1);
  numBlogs--;
  res.redirect("/")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



