var express = require("express")
var app = express()
var cors = require('cors')
let projectCollection;

var port = process.env.port || 3000;

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// mongo connection
const MongoClient = require('mongoDb').MongoClient;


// database connection
const uri = 'mongodb+srv://sit725-2022-t2-prac4:chep@cluster0.alzn8sh.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri,{ useNewUrlParser: true })


const createCollection = (collectionName) => {
      client.connect((err,db) => {
       projectCollection = client.db().collection(collectionName);
       if(!err) {
        console.log('MongoDB Connected')
      }
       else {
     console.log("DB Error: ", err);
     process.exit(1);
    }
})
}

// insert
const insertProjects = (project,callback) => {
    projectCollection.insert(project,callback);
}

// post api
app.post('/api/projects',(req,res) => {
    console.log("New Project added", req.body)
    var newProject = req.body;
    insertProjects(newProject,(err, result) =>{
        if(err) {
            res.json({statusCode: 400, message:err})
        }
         else {
            res.json({statusCode: 200, message:"Project Successfully added", data: result}) 
         }
    })
})
    

app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){
    var firstNumber = parseInt(req.params.firstNumber) 
    var secondNumber = parseInt(req.params.secondNumber)
    var result = firstNumber + secondNumber || null
    if(result == null) {
      res.json({result: result, statusCode: 400}).status(400)
    }
    else { res.json({result: result, statusCode: 200}).status(200) } 
})
  
// get projects
 const getProjects = (callback) => {
     projectCollection.find({}).toArray(callback);
}
// get projects
app.get('/api/projects',(req,res) => {
    getProjects((err,result) => {
        if(err) {
            res.json({statusCode: 400, message:err})
        }
        else {
            res.json({statusCode: 200, message:"success", data: result})
        }
    })
})


app.listen(port,()=>{
    console.log("App listening to:http://localhost:"+port)
    createCollection("pets");
})


