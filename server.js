var express = require("express")
var app = express()
var port = process.env.port || 3000;

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extends: false}));

app.get('/api/projects',(req,res) => {
    res.json({statusCode: 200, data: cardList, message:"Success"})
})

const cardList = [
    {
        title: "Kitten 2",
        image: "images/kitten-2.jpg",
        link: "About Kitten 2",
        desciption: "Demo desciption about kitten 2"
    },
    {
        title: "Kitten 3",
        image: "images/kitten-3.jpg",
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
app.listen(port,()=>{
    console.log("App listening to:http://localhost:"+port)
})


