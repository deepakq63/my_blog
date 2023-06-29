//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "";
const aboutContent = "I'm Deepak Patel, an IT student and a tech enthusiast on a quest to unravel the digital world.I'm currently pursuing my B.Tech in IT from NITRR, delving into the fascinating realms of technology. When I'm not coding, you'll find me strategizing intense chess battles, exploring captivating anime universes, kicking a football, or losing myself in the magic of movies.";
const contactContent = "Do not contact me! ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


let posts = [];


app.get("/",function(req,res){

 res.render("home",{
  homeStartingContent : homeStartingContent,
  posts : posts
  });
 
});

app.get("/about",function(req,res){
  res.render("about",{
    aboutContent: aboutContent
  });
});
app.get("/contact",function(req,res){
  res.render("contact",{
    contactContent: contactContent
  });
});
app.get("/compose",function(req,res){
  res.render("compose");
});


app.post("/compose",function(req,res){
 const post = {
  title : req.body.postTitle,
  content : req.body.postBody
 };
 posts.push(post);
 res.redirect("/");
});



app.get("/posts/:postName",function(req,res){
  console.log(req.params.postName);
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
   const storedTitle = _.lowerCase(post.title);
    if(storedTitle === requestedTitle ){
     res.render("post",{
      title: post.title,
      content: post.content
     });
    }
  });
});




app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
