const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require("body-parser");
const jsonParser = express.json();
const mongoose = require("mongoose");
const config = require('./db/config');
const port = process.env.PORT || 3000


nunjucks.configure('views', {
    autoescape: true,
    express: app
 });

const todoSchema = new mongoose.Schema({
    name: String
});

const Task = mongoose.model('task', todoSchema);
const CompleteTask = mongoose.model('completetask', mongoose.Schema({name: String}));

// mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })
 mongoose.connect(config.url, { useNewUrlParser: true })
    .then(() => console.log("MongoDB has started..."))
    .catch((error) => console.log(error))

app.set('views', './views');
app.set("view engine", "html");
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));

// let tasks = [];
// let comletetasks = [];

app.post('/addtask', jsonParser,  (req, res) => {    
    if(!req.body) return res.sendStatus(400);
    res.setHeader("Content-Type", "text/html", "charset=utf-8");     
    // let newTask = req.body.taskValue;
    // tasks.push(newTask);    
    let newTask = new Task({
        name: req.body.taskValue
    });       
   
    Task.create(newTask, (err, Task)=>{
        if(err) console.log(err);
        else {
            console.log("Inserted Task!" + " " + newTask);
        }
    });          
    
    res.redirect('/');    
});

app.post('/completetask', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400); 
    res.setHeader("Content-Type", "text/html");
    // let completeTask = req.body.taskValue;
    // comletetasks.push(completeTask);   
    // tasks.splice(tasks.indexOf(completeTask), 1);
    
    let TaskId = req.body.taskId;

    let completetask = new CompleteTask({
       name: req.body.taskValue
    });
    
    // await CompleteTask.create(completetask, (err, CompleteTask) => {
    //     if(err) console.log(err);
    //     else {
    //         Task.findByIdAndDelete(TaskId, (err) => {
    //             if(err) console.log(err);
    //         else {
    //             console.log("Inserted completetask!" + " " + completetask  + "Deleted Task!" + " " + TaskId);                                
    //         }
    //       })            
    //     }
    // });

    Task.findByIdAndDelete(TaskId, (err) => {
        if(err) console.log(err);
            else {
                CompleteTask.create(completetask, (err, CompleteTask) => {
                if(err) console.log(err);
                    else {
                        console.log("Inserted completetask!" + " " + completetask  + "Deleted Task!" + " " + TaskId);                                
                    }
                })            
            }
        });
    
        res.redirect('/');
    
});

app.post('/savetask', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400); 
    res.setHeader("Content-Type", "text/html");     
    let TaskId = req.body.taskId;   
    
    Task.findById(TaskId, (err, Task) => {
        if(err) console.log(err);
        else {
            Task.name = req.body.taskValue
            Task.save ( (err) => {
                if(err) console.log(err); 
                console.log("Task saved!");                                
            })
        }       
    });
    
    res.redirect('/');
    
});

app.post('/addtaskback', jsonParser,  (req, res) => {
    if(!req.body) return res.sendStatus(400);
    res.setHeader("Content-Type", "text/html");
    // let newTask = req.body.taskValueCompleted;    
    // tasks.unshift(newTask);
    // comletetasks.splice(comletedTasks.indexOf(newTask), 1);
    let TaskIdCompleted = req.body.taskIdCompleted;
    let newTask = new Task({
        name: req.body.taskValueCompleted
     });

      Task.create(newTask, (err, Task)=>{
        if(err) console.log(err);
        else {
           CompleteTask.findByIdAndDelete(TaskIdCompleted, (err) => {
            if(err) console.log(err);
                else {
                    console.log("Inserted Task!" + " " + newTask  + "Deleted Task!" + " " + TaskIdCompleted);                                
                }
            });            
        }
    }); 
       
    res.redirect('/');

});

app.post('/removetasktodo', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    res.setHeader("Content-Type", "text/html");
    // let removedTask = req.body.taskValue;   
    let removedTaskId = req.body.taskId;        
    console.log(removedTaskId); 
    
    // tasks.splice(tasks.indexOf(removedTask), 1);
    Task.findByIdAndDelete(removedTaskId, (err) => {
        if(err) console.log(err);
        else {
            console.log("Deleted Task!" + " " + removedTaskId);
        }
    });    
        
    res.redirect('/');
});

app.post('/removetaskcompleted', jsonParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
    res.setHeader("Content-Type", "text/html");    
    // let removedTaskcompleted = req.body.taskValueCompleted; 
    // comletetasks.splice(comletedTasks.indexOf(removedTaskcompleted), 1);
    let removedTaskcompletedId = req.body.taskId;
    console.log(removedTaskcompletedId);    
            
    CompleteTask.findByIdAndDelete(removedTaskcompletedId, (err) => {
        if(err) console.log(err);
        else {
            console.log("Deleted Task!" + " " + removedTaskcompletedId);
        }
    });          
    
    res.redirect('/');
});

app.get('/', (req, res) => {
    // res.render('index.html', {tasks: tasks, comletetasks: comletetasks});
    Task.find({}, (err, tasks) => {
        if(err) console.log(err);
        else {
            CompleteTask.find({}, (err, completetasks) => {
                if(err) console.log(err);
                else {
                    res.render('index.html', {tasks: tasks, completetasks: completetasks});                    
                }
            });
        }
    }); 
});

app.listen(port, () => {
    console.log("App listening on port 3000!");
});