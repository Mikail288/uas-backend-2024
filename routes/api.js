// import AlumniController
const AlumniController =  require("../controllers/AlumniController")
// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Alumni API Express");
});

// Membuat routing alumni
router.get("/alumni", AlumniController.index)
router.post("/students", AlumniController.store);
router.put("/students/:id", AlumniController.update);
router.delete("/students/:id", AlumniController.destroy);

// export router
module.exports = router;
