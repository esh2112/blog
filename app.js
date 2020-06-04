//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "While cases are beginning to plateau in some areas, the new coronavirus that causes COVID-19 will continue to be among us for some time. Even if you're doing everything right, like washing your hands and practicing social distancing, you may still find yourself in a situation where you're concerned you've been exposed to the virus An epidemic is a good time to be on high alert, but self-quarantining is only necessary if you're reasonably suspicious that you're infected with the virus. People who are healthy, however, should still be social distancing";
const aboutContent = "1. Complete a puzzle: The more pieces the better! Feeling extra saucy? Take on a Rubik's Cube. More of a word person? Crossword puzzle! 2. Start a journal or blog. Sure, it can be about the coronavirus, but it could also be about a specific interest from chess to cheess 3. If it won't bother your neighbors: Dust off that old instrument and practice. 4. Text all your exes just in case you have one more thing you wanted to get off your chest. 5. Write poetry. Perhaps you can craft a haiku for Mother's Day, or something without a specific structure. Just try it! 6. Watch all the really long movies you’ve avoided until now. 7. Download Duolingo, or a similar app, and teach yourself a foreign language ";
const conContent =  "So every one of us is quarantined and isolated in our apartments. Our daily routine is waking up early and signing into our zoom account. Watching the lecture in our sleepy eyes and sometimes “accidentally” falling asleep while listening.This is followed by working on assignments and projects. Zoom has been dominated our days since the quarantine The project team meet over zoom and we work to meet up with our weekly deadlines. A good day needs great food. With lots of time in hand, I have been experimenting a lot with learning Indian dishes Most of my other lesuire would be in talking to my corridor mates, baking cakes, catching up with friends and family and rarely exercising ";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });

});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");

    }
  });
});

app.get("/posts/:postId", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;

  //posts.forEach(function(post){
    //const storedTitle = _.lowerCase(post.title);

  Post.findOne({_id:requestedPostId},function(err,post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  });

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {conContent: conContent});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
