const express = require("express");
 const app = express();

 
 // index  route

 app.get("/", (req, res) => {
  res.send("hi i am root");
 });


 app.get("/user", (req, res) => {
  res.send("user data runing");
 });

 // show route
 app.get("/users/:id", (req, res) => {
  res.send("user data show id");
 });

 // edit route
 app.post("/user/:edit", (req, res) => {
  res.send("user data edit");
 });

 // delete route
 app.get("/user/delete", (req, res) => {
  res.send("user data delete");
 });

 // posts route

 // index  route
 app.get("/posts", (req, res) => {
  res.send("posts data runing");
 });

 // show route
 app.get("/posts", (req, res) => {
  res.send("posts data show");
 });

 // edit route
 app.get("/posts", (req, res) => {
  res.send("posts data edit");
 });

 // delete route
 app.get("/posts", (req, res) => {
  res.send("posts data delete");
 });


 app.listen(3000, () => {
  console.log("server is runing ");
 })
