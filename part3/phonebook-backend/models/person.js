import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name required'],
    minLength: 3,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        const formatted = /^\d{2,3}-\d+$/.test(v)
        const eightDigitOrMore = v.replace(/\D/g, '').length >= 8
        return formatted && eightDigitOrMore
      },
      message: (props) =>
        `${props.value} is not a valid phone number. Format: XX-XXXXXX or XXX-XXXXXX and at least 8 digit`,
    },
    required: [true, 'User phone number required'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Person', personSchema)

export default Person
