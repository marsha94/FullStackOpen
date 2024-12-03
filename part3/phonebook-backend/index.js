import express, { response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());

const postLog = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    JSON.stringify(req.body),
  ].join(" ");
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const newId = Math.floor(Math.random() * 1000000);

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people<p><p>${Date()}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const personExists = persons.find((person) => person.id === id);

  if (!personExists) {
    return res.status(404).json({
      error: `Person with id ${id} not found`,
    });
  }

  res.json(personExists);
});

app.post("/api/persons", morgan(postLog), (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const personExists = persons.find(
    (person) => person.name.toLowerCase() === req.body.name.toLowerCase()
  );

  if (personExists) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: String(newId),
    name: req.body.name,
    number: req.body.number,
  };

  persons.push(person);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const personExists = persons.some((person) => person.id === id);

  if (!personExists) {
    return res.status(404).json({
      error: `Person with id ${id} not found`,
    });
  }

  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.use(unknownEndpoint);

const PORT = parseInt(process.env.PORT) || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
