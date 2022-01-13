let obj = require("mongoose"); //load the module
obj.Promise = global.Promise; // creating the reference.
let url = "mongodb://localhost:27017/meanstack";
let fs = require("fs");
const mongooseDbOption = {
  // to avoid warning
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
obj.connect(url, mongooseDbOption); //ready to connect
let db = obj.connection; // connected to database.
db.on("error", (err) => console.log(err));
db.once("open", () => {
  //Defined the Schema
  let CallRecordSchema = obj.Schema({
    _id: Number,
    source: String,
    destination: String,
    sourceLocation: String,
    destinationLocation: String,
    callDuration: String,
    roaming: String,
    callCharge: String,
  });
  // Creating Model using schema
  let callRecord = obj.model("", CallRecordSchema, "Call_data");
  fs.readFile("call_data.json", (err, data) => {
    if (!err) {
      //console.log(data.toString());
      let callRecordString = data.toString();
      let callRecordJson = JSON.parse(callRecordString);

      // Creating reference using model
      callRecordJson.forEach((element) => {
        let call1 = new callRecord(element);

        call1.save((err, result) => {
          if (!err) {
            console.log("record inserted successfully" + result);
          } else {
            console.log(err);
          }
          obj.disconnect(); //close the connectiond..
        });
      });
    }
  });
});
