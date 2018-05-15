const axios = require('axios');
const db = require('../models');

// Defining methods for the nytController

// findAll searches the NYT API and returns only those articles we haven't saved

module.exports = {
	findAll: function(req, res) {
		const params = Object.assign(
			{ api_key: "68a58bf791b0487da327e63dc593933d" },
			req.query
		);
		axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
			params
		})
		.then(response => {
			db.Article
				.find()
				.then(dbArticles => 
					response.data.response.docs.filter(article => 
						dbArticles.every(
							dbArticle => dbArticle._id.toString() !== article._id
						)
					)
				)
				.then(articles => res.json(articles))
				.catch(err => res.status(422).json(err))
			});
	}
};