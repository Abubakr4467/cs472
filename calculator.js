var express  = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', function(req,res){
    console.log("Got a GET request for the homepage");
    res.send(
        `<!DOCTYPE html>
        <html>
        <head><meta charset=\"utf-8\"/>
        <title>Calculator Web Site</title>
        </head>
        <body>
        <h1> Calculator </h1>
        <form action =
        "http://localhost:3001/add">
        <div>Enter two numbers <br>
        <input type = "text" name="first"/><br/>
        <input type = "text" name="second"/><br/>
        <select name="operation">
            <option value="plus">+</option>
            <option value="minus">-</option>
            <option value="multiply">*</option>
            <option value="divide">/</option>
        </select>
        <input type="submit" value="Click"/>
        </div>
        </form>
        
        </body>
        </html> 
        `
    )
})
app.get('/add', function(req, res){
        let a  = parseInt(req.query.first);
        let b = parseInt(req.query.second);
        let o = req.query.operation;
        let total = 0;
        if(o == "minus"){
            total =  a-b;
        }else if (o == "plus"){
            total = a+b;
        }else if (o == "divide"){
            total = a/b;
        }else if (o == "multiply"){
            total= a*b;
        }
    res.send(
        `<!DOCTYPE html>
        <html>
        <head><meta charset=\"utf-8\"/>
        <title>Calculator Web Site</title>
        </head>
        <body>
        <h1> Output will be  </h1>
        <h2> ${total} </h2>

        <form action =
        "http://localhost:3001/">
                <button>Back</button>
        </form>
        
        </body>
        </html> 
        `
    )
})
app.listen(3001)