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
		//useMongoClient: true
	}
);

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
