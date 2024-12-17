import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import Person from './models/person.js'

dotenv.config()
const app = express()

const postLog = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    JSON.stringify(req.body),
  ].join(' ')
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res) => {
  if (error.name === 'CastError') {
    return res.status(400).send({
      name: error.name,
      error: error.message,
    })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      name: error.name,
      error: error.message,
    })
  }

  if (error.name === 'DuplicateNameError') {
    return res.status(400).json({
      name: error.name,
      error: error.message,
      existingPersonID: error.existingPersonID,
    })
  }

  return res.status(500).json({
    error: 'An unexpected error occurred. Please try again later',
  })
}

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((error) => {
      next(error)
    })
})

app.get('/info', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.send(
        `<p>Phonebook has info for ${persons.length} people<p><p>${Date()}</p>`
      )
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', morgan(postLog), (req, res, next) => {
  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  })

  Person.findOne({ name: req.body.name })
    .then((personExist) => {
      if (personExist) {
        const error = new Error(`The name '${req.body.name}' already exists.`)
        error.name = 'DuplicateNameError'
        error.existingPersonID = personExist.id
        throw error
      }

      return person.save()
    })
    .then((person) => {
      res.json(person)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const person = { name, number }

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
