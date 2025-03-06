const express = require("express");
const morgan = require("morgan");
//const mongoose = require("mongoose");

const Phone = require("./models/phone");

const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

morgan.token("body", (req) => JSON.stringify(req.body));
//app.use(morgan('tiny'));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.error(error.name)


  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!

//app.use(express.static("dist"));

/*
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "4",
  }
];
*/

//app.use("/heippa",express.static("dist"));
// app.use(express.static("dist"));
app.use('/', express.static('dist'));

/*
app.get('/health', (req, res) => {
  
  res.send('ok')

})*/

/*if (process.env.SERVE_STATIC === "true") {
  app.use(express.static("dist"));
} else {
  app.get("/", (request, response) => {
    response.send("<h1>Phoneapp server ready to serve</h1>");
  });
}*/


/*app.get("/", (request, response) => {
  response.send("<h1>Phoneapp server ready to serve</h1>");
});*/


app.get("/api/persons", (request, response, next) => {
  Phone.find({}).then((result) => {
    response.json(result);
  });
  //response.status(200).json(persons);
});

/*
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((item) => item.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});*/

app.get("/api/persons/:id", (request, response, next) => {
  Phone.findById(request.params.id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));

  /*
    catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })*/
});

app.post("/api/persons", (request, response, next) => {
  /*
  const generateId = () => {
    const min = 100;
    const max = 1000000;
    const id = Math.floor(Math.random() * (max - min + 1) + min);
    return id;
  };*/

  const body = request.body;

  /*
  console.log(persons.filter((item) => {
    console.log(`${item.name} === ${body.name}`);
    item.name === body.name}));
  */

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    /*
  else if (persons.filter((item) => item.name === body.name).length !== 0) {
  
    return response.status(400).json({
      error: "name must be unique"
    });
  }*/
    return response.status(400).json({
      error: "phone number missing",
    });
  }

  Phone.find({ name: body.name }).then((result) => {
    if (result.length > 0) {
      console.log("xxxx", result[0].id);

      //return response.status(400).json({
      //  error: "name must be unique",

      const phone = {
        name: body.name,
        number: body.number,
      };

      Phone.findByIdAndUpdate(result[0].id, phone, { new: true })
        .then((updatedPhone) => {
          response.json(updatedPhone);
        })
        .catch((error) => next(error));
    } else {
      const phone = new Phone({
        name: body.name,
        number: body.number,
      });

      phone
        .save()
        .then((result) => {
          console.log("Saved!", result);
          //console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
          console.log(`added ${body.name} number ${body.number} to phonebook`);

          response.status(201).json(result);
        })
        .catch((error) => next(error));
    }
  });

  /*
  const person = {
    name: body.name,
    number: body.number
    id: generateId(),
  };*/

  //persons = persons.concat(person);
  //persons = [...persons, person];

  //response.json(person);
});

/*
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((item) => item.id !== id);

  response.status(204).end();
});*/

app.delete("/api/persons/:id", (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then((result) => {
      console.log(result);
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Phone.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});


app.get("/info", (req, res) => {
  /*let ret =
    `Phonebook has info for ${persons.length} people` + "<br>" + new Date();
  res.send(ret);*/
  Phone.countDocuments()
    .then((count) => {
      let ret = `Phonebook has info for ${count} people` + "<br>" + new Date();
      res.send(ret);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error: "counting documents error" });
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
