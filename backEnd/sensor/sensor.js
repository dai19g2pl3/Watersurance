var SerialPort = require ("serialport");
const Readline = require('@serialport/parser-readline') 	
const port = new SerialPort("COM3", { baudRate: 9600 })
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://DAIg2pl3:DAIg2pl3!@daig2pl3-nxlvj.gcp.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

const parser = new Readline()
port.pipe(parser)

port.on ("open", function(){
	console.log("Porta aberta.");
});

port.on ("data", function(data){
	var buf = Buffer.from(data);
  console.log(buf.toString());
  if(buf.toString()>=250){
  client.connect(err => {
    const db = client.db("dai");
    console.log("connected");
    db.collection("sensores").update({"inundacao":0},{$set:{"inundacao":1}})
    client.close();
  })};
  if(buf.toString()<250){
    client.connect(err => {
      const db = client.db("dai");
      console.log("connected");
      db.collection("sensores").update({"inundacao":1},{$set:{"inundacao":0}})
      client.close();
  })}

});
