const mongoose = require('mongoose')
require('dotenv').config();

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

//const url='mongodb+srv://aa4598:rytky2025@cluster0.clqvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


//MONGODB_URI=mongodb://username:password@cluster0.sqqvc.mongodb.net/myDatabase?retryWrites=true&w=majority

//console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB'); //,result)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneSchema = new mongoose.Schema({
    
    name: {
      type: String,
      minlength: 3,
      required: true
    },

    number: {
      type: String,
      validate: {
        validator: function(v) {
          return /^(0\d{1,2}-\d{6,}|0\d{2,3}-\d{5,})$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      required: [true, 'Phone number required']
    }
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phone', phoneSchema)