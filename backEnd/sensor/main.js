var SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const port = new SerialPort("COM7", { baudRate: 2000000 });
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://DAIg2pl3:DAIg2pl3!@daig2pl3-nxlvj.gcp.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dai.watersurance@gmail.com",
    pass: "watersurance2019"
  }
});

var mailOptions = {
  from: "dai.watersurance@gmail.com",
  to: "eagr1999@gmail.com",
  subject: "Alerta de inundação",
  text:
    "Detetamos que está a ocorrer uma inundação na sua habitação. Brevemente iremos averiguar os danos ocorridos."
};

port.pipe(new Readline());

port.on("open", function() {
  console.log("Porta aberta.");
});

stop = 0;

port.on("data", function(data) {
  var buf = Buffer.from(data);
  var strBuf = buf.toString();
  var str = strBuf.trim();
  var sensors = str.split(";");
  var occurrence = sensors[0];
  var object = sensors[1];

  client.connect(err => {
    const db = client.db("dai");
    var date = new Date();
    date.setHours(date.getHours() + 1);

    if (occurrence > 200 && stop === 2) {
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      console.log();
      stop++;
    }

    db.collection("ocurrence1").insert({
      type: "watter level",
      value: occurrence,
      date: date
    });

    db.collection("object1").insert({
      type: "watter level",
      value: object,
      date: date
    });
  });
});
