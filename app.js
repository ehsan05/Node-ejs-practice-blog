const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { request } = require("express");

const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
/*
===================
Global Variables
====================
*/
let posts = [];
/*
===========================
End of Variable Declaratons
============================
*/
const homeStartingContent = "Welcome to Ehsan's Blog. Most of the blog are about coding and you will find a lot of beneficial content realted to your field like Website Development, App Development, Game Development and many other fields.";
const aboutContent = "You will find almost everything there to your field and if you don't find anything, go in the contact and contact us, you will be responseded ASAP";
const contactConent = "Here is the way you can contact to us wheather related to blog and any other you want to suggest here.";
/*
===========================
Rendering all the partials
===========================
*/

app.get("/",(req,res)=>{
   res.render("home",{hcontent:homeStartingContent,
    newInfo:posts});
});
app.get("/contact",(req,res)=>{
   res.render("contact",{contactinfo:aboutContent});
});
app.get("/about",(req,res)=>{
   res.render("about",{aboutinfo:contactConent});
});
app.get("/compose",(req,res)=>{
   res.render("compose");
});

/*For all the posts */
app.get("/posts/:postName",(req,res)=>{
   const requestedTitle = _.lowerCase(req.params.postName);
   posts.forEach((post)=>{
      const storedTitle = _.lowerCase(post.title);
      if(storedTitle === requestedTitle){
         console.log("Matched");
    res.render("post",{title:post.title,content:post.post});
  }
  
   });
  
  
});
/*
========================
End of Rendering all the partials
==========================
*/
/*
=============
Data retriving
===============
*/
app.post("/compose",(req,res)=>{
   const post = {
      title: req.body.postTitle,
      post : req.body.postBody
   };
   posts.push(post);
    
   res.redirect("/");

});









app.listen(3000,()=>{
        console.log("Port has been started at 3000.");
});