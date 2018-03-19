const db = require("./models");

module.exports = {
	// Finding all of the articles
	find: function(req, res) {
		db.Article.find(req.query)
		.sort({ date: -1 })
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
	},

	// Saving an article
	save: function(req, res){
		db.Article.create(req.body)
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
	},

	// Deleting a saved article
	delete: function(req, res){
		db.Article.findById({ _id: req.params.id })
		.then(dbModel => dbModel.remove())
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
	}
};