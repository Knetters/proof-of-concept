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

    var mainVisuals = {}
    var imageFiles = {}
    
    // Loop door alle included variabelen heen
    data.included.forEach(element => {
      if (element.type == 'MainVisual') {
          mainVisuals[element.id] = element.relationships.image.data.id
      } else if (element.type == 'ImageFile') {
          imageFiles[element.id] = element.attributes.sourceSet
      }
    })

		response.render("index", {...data, mainVisuals: mainVisuals, imageFiles: imageFiles, message});
	});
});

// Create a route for the collection page
app.get('/collection/:slug', (request, response) => {
  const slug = request.params.slug;

  fetchJson(collectionsJson).then((data) => {
    const collections = data.data;
    const item = collections.find(collection => collection.attributes.slug === slug);

    if (item) {
      const itemId = item.id;
      const itemJsonUrl = `https://raw.githubusercontent.com/Knetters/proof-of-concept/main/public/dataFiles/collection/${itemId}.json`;

      fetchJson(itemJsonUrl).then((itemData) => {

        const message = "De Correspondent - " + item.attributes.title;
        response.render('collection', { ...data, item, itemData, message });

        console.log(itemData)
      });
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