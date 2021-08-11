const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Task = require("./models/task");
const methodOverride = require("method-override");
const app = express();

mongoose.connect("mongodb://localhost/todo-list", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");


// =============== Routes ===============

app.get("/", (req, res) => {
    res.redirect("/tasks");    
});


app.get("/tasks", (req, res) => {
    Task.find({}, function(err, allTasks) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {tasks: allTasks});
        }
    });
});


app.get("/tasks/new", function(req, res) {
   Task.find({}, function(err, allTasks) {
       if(err) {
           console.log(err);
       } else {
           res.render("new", {tasks: allTasks});
       }
   });
});


app.post("/tasks",function(req, res) {
    const data = req.body.task;
    console.log(data);
    Task.create(data, function(err, newTask) {
        if(err) {
            console.log(err);
        } else {
            // console.log(newTask);
            res.redirect("/tasks");
        }
    });
});

app.get("/tasks/edit", function(req, res) {
	Task.find({}, function(err, allTasks) {
        if(err) {
            console.log(err);
        } else {
            res.render("edit", {tasks: allTasks});
        }
    });
});

app.delete("/tasks/:id/delete", function(req, res) {
	Task.findByIdAndRemove(req.params.id, function(err, task){
        if(err){
            console.log(err);
        } else {
            console.log("task deleted");
            console.log(task);
            res.redirect("/tasks/edit");
        }
    });
});

// app listener
app.listen(3000, () => {
    console.log("Server Started");
});