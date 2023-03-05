const express = require("express");
const MovieInfo = require('./model/MovieDB');
const path = require('path');



app.use(express.static(path.join(_dirname,'/build')));




const app = new express();

app.use(express.urlencoded({extended: true}));
 app.use(express.json());

//  CORS policy
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers","X-Requested-Width,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

// app.get('/',(req,res) => {
//         res.send("Congratulations!! Server is UP.")
//      });

    //  app.get('/api',(req,res) => {
    //     res.json([{"name":"anshi","place":"palakkad"},{"name":"shanu","place":"plkd"}]);
    // })




    // Create 
    app.post('/api/create',(req,res)=>{
        try{
            console.log(req.body); //server data
            let movie = new MovieInfo(req.body); // passing the data to db
            movie.save();// saving to db
            res.send("Data Added");
        }
        catch(error){
            res.status(500).send(error);
        }
    }); 

    // Read
    app.get('/api/view',async (req,res) => {
        try{
            let result = await MovieInfo.find();
            res.json(result);
        }
        catch(error){
            res.status(500).send(error);
        }
    })
     

    // Update
    app.post('/api/update',  async (req,res) => {
        try{
            let result =  await MovieInfo.findByIdAndUpdate(req.body._id, req.body);
            res.send("Data Updated");
        }
        catch(error){
            res.status(500).send(error);
        }
    })
    

    // Delete
    app.post('/api/delete', async (req,res) => {
        try{
           await MovieInfo.findByIdAndDelete(req.body._id);
            res.send("Data Deleted");
        }
        catch(error){
            res.status(500).send(error);
        }
    })


    // Search
    app.post('/api/search', async (req,res) => {
        try{
            let result = await MovieInfo.find(req.body);
            // let result = await CourseInfo.find({"cName": {$regex: '.*' + req.body.cName + '.*'}}); // regular expression
            res.json(result);
        }catch(error){
            res.status(500).send(error);
        }
    })


    app.get('/*',function (req,res){
        res.sendFile(path.join(_dirname,'/build/index.html'));
    })


    //  app.get('/about',(req,res) => {
    //        res.send("Hi anshi")
    //  })

    //  app.post('/facebook/signup',(req,res)=>{
    //          res.send(`hi ${req.body.name},yr acc is succesfully craeted`);
    //      })

app.listen(6050, () => {
        console.log("server is running in port 6050");
     }) 

