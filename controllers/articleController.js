const db = require("../models");

module.exports = {
	// Finding all of the articles
	findAll: function(req, res) {
		db.Article.find({})
		.sort({ date: -1 })
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
	},

	// Saving an article
	create: function(req, res){
		db.Article.create(req.body)
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
	},

	// Deleting a saved article
	remove: function(req, res){
		db.Article.findById({ _id: req.params.id })
		.then(dbModel => dbModel.remove())
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
	}
};