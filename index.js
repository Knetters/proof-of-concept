// Import the required modules
import express from "express";
import fetch from "node-fetch";

// Create a new Express app
const app = express();

const collectionsJson = "https://raw.githubusercontent.com/Knetters/proof-of-concept/main/public/dataFiles/collections.json" 

// Set EJS as the template engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static("public"));

// Create a route for the index page
app.get('/', (request, response) => {
  const message = "De Correspondent - Podcasts";

  // Fetch the data from the url
  fetchJson(collectionsJson).then((data) => {
		response.render("index", {...data, message});
	});
});

// Create a route for the collection page
app.get('/collection/:slug', (request, response) => {
  const slug = request.params.slug;

  // Fetch the data from the URL
  fetchJson(collectionsJson).then((data) => {
    // Access the 'data' property of the object
    const collections = data.data;

    // Find the item with the corresponding slug
    const item = collections.find(collection => collection.attributes.slug === slug);

    const message = "De Correspondent - Collection name";
    if (item) {
      response.render('collection', { ...data, item, message });
    }
  });
});

// Create a route for the sound page
app.get('/sound', (request, response) => {
    const message = "De Correspondent - [naam sound]";
    response.render('sound', { message });
});

// Set the port number and start the server
const port = process.env.PORT || 1964;
app.listen(port, () => {
    console.log(`Application available on: http://localhost:${port}`);
});

async function fetchJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function postJson(url, data) {
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  });
  const responseData = await response.json();
  return responseData;
}