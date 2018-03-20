const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
app.use(express.static("client/build"));


app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect mongoose to the database
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/nytreact",
	{
		useMongoClient: true
	}
);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
	const index = path.join(__dirname, "build", "index.html")
  	res.sendFile(index);
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
