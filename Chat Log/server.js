let app = require("express")();
let http = require("http").Server(app);   // to load the library we have run port number using hhtp module 
let io = require("socket.io")(http);
let obj = require("mongoose");  //load the module 
obj.Promise = global.Promise;       // creating the reference. 
let url = "mongodb://localhost:27017/meanstack";
let fs = require('fs');
const mongooseDbOption = {       // to avoid warning 
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const CallSchema = obj.Schema({
    name:String,
    message:String
});


app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

var name1;
var msg;

io.on("connection",(socket)=> {
    console.log("Client connected to application.....");
    
    socket.on("name",(name)=> {
        console.log("Hello: " + name);
        name1 = name;
    })

    socket.on("message",(message)=> {
        console.log("Your: " + message);
        msg = message;
    })

    obj.connect(url, mongooseDbOption);   //ready to connect 
let db = obj.connection;    // connected to database. 
db.on("error", (err) => console.log(err));
    db.once("open", () => {

        //Defined the Schema 
        
        // Creating Model using schema 
        let callRecord = obj.model("", CallSchema, "Call_chat");
    
                    let call1 = new callRecord({name:name1,message:msg})
    
                    call1.save((err, result) => {
                        if (!err) {
                            console.log("record inserted successfully" + result)
                        } else {
                            console.log(err);
                        }
                        obj.disconnect();       //close the connectiond..
                    })
                })
})






http.listen(9090,()=>console.log('server running on port number 9090'));