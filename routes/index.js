const path = require("path");
const router = require("express").router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);

module.exports = router;