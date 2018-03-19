const router = require("express").Router();
const articleController = require("../../controllers/articleController");

// Matches with the API articles
router.route("/")
	.get(articleController.findAll)
	.post(articleController.create);

// Matches with "api/route/:id"
router.route("/:id")
	.delete(articleController.remove);

module.exports = router;
