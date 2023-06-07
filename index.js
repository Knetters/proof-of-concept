// Import the required modules
import express from "express";
import fetch from "node-fetch";

// Create a new Express app
const app = express();

const url = ''

// Set EJS as the template engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the public directory
app.use(express.static("public"));


// Create a route for the index page
app.get('/', function (request, response) {

    const message = "De Correspondent - Podcasts";
    response.render('index', { message });
});

// Create a route for the index page
app.get('/collection', function (request, response) {

  const message = "De Correspondent - [naam collectie]";
  response.render('collection', { message });
});


// Set the port number and start the server
const port = process.env.PORT || 1964;
app.listen(port, () => {
  console.log(`Application available on: http://localhost:${port}`);
});

async function fetchJson(url, payload) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}