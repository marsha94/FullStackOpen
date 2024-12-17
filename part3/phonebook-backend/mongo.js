import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://marsha94:${password}@cluster0.c8ce2.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
    process.exit(1)
  })

const closeDatabase = (exitCode = 0) => {
  mongoose.connection
    .close()
    .then(() => {
      console.log('MongoDB close successful')
      process.exit(exitCode)
    })
    .catch((error) => {
      console.log('Error closing MongoDB', error.message)
      process.exit(exitCode)
    })
}

const personsSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Person', personsSchema)

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length === 3) {
  Person.find({})
    .then((persons) => {
      console.log('phonebook:')
      persons.forEach((person) =>
        console.log(`${person.name} ${person.number}`)
      )
      closeDatabase()
    })
    .catch((error) => {
      console.log(error)
      closeDatabase(1)
    })
} else {
  const person = new Person({
    name: name,
    number: number,
  })
  person
    .save()
    .then(() => {
      console.log(`Added ${name} number ${number} to phonebook`)
      closeDatabase()
    })
    .catch((error) => {
      console.log(error)
      closeDatabase(1)
    })
}
