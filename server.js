var express = require("express")
var app = express()
var cors = require('cors')
let projectCollection;

var port = process.env.port || 3000;

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extends: false}));
app.use(cors());

// mongo connection
const MongoClient = require('mongoDb').MongoClient;


// database connection
const uri = 'mongodb+srv://sit725-2022-t2-prac4:chep@cluster0.alzn8sh.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri,{ useNewUrlParser: true })

// insert
const insertProjects = (project,callback) => {
    projectCollection.insert(project,callback);
}

const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
}

const createColllection = (collectionName) => {
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
    
const cardList = [
    {
        title: "Kitten 2",
        image: "images/livedemo.jpg",
        link: "About Kitten 2",
        desciption: "Demo desciption about kitten 2"
    },
    {
        title: "Kitten 3",
        image: "images/livedemo.jpg",
        link: "About Kitten 3",
        desciption: "Demo desciption about kitten 3"
    }
]

// const addNumbers = (number1, number2) => {
//     var num1 = parseInt(number1);
//     var num2 = parseInt(number2);
//     var results = num1 + num2;
//     return results;
// }
// app.get("/addTwoNumbers", (req, res) => {
//     var number1 = req.query.number1;
//     var number2 = req.query.number2;
//     var result = addNumbers(number1, number2);
//     res.json({statusCode: 200, data: result, message: 'Success'});
// });

app.get('/api/projects',(req,res) => {
    getProjects((err,result) => {
        if(err) {
            res.json({statusCode: 400, message:err})
        }
        else {
            res.json({statusCode: 200, message:"success", data: result})
        }
    })
   // res.json({statusCode: 200, data: cardList, message:"Success"})
})
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
    getProjects((err,result) => {
        if(err) {
            res.json({statusCode: 400, message:err})
        }
        else {
            res.json({statusCode: 200, message:"success", data: result})
        }
    })
   // res.json({statusCode: 200, data: cardList, message:"Success"})
})
app.listen(port,()=>{
    console.log("App listening to:http://localhost:"+port)
    createColllection("pets");
})


