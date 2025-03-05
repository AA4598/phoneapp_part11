const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

//const url = `mongodb+srv://laakkti:${password}@cluster0.sqqvc.mongodb.net/phone?retryWrites=true&w=majority`;
//const url='mongodb+srv://aa4598:icGPRBCtUYDEcpQK@cluster0.clqvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const url=`mongodb+srv://aa4598:${password}@cluster0.clqvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

/*
console.log(process.argv[2]);
console.log(process.argv[3]);
console.log(process.argv[4]);*/

const Phone = mongoose.model("Phone", phoneSchema);

//console.log(process.argv.length);

if (process.argv.length === 5) {
  
  const phone = new Phone({
    name: process.argv[3],
    number: process.argv[4],
  });

  phone.save().then((result) => {
    console.log("Saved!", result);
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    );
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Phone.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((item) => {
      console.log(item.name + " " + item.number);
    });
    mongoose.connection.close();
  });
}
