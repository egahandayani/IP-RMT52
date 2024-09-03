const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const CharacterController = require("../controllers/CharacterController");

router.post("/login", UserController.login);
router.post("/register", UserController.register);

// Protected CRUD Endpoints
// router.use(authentication);

// router.get("/character");

module.exports = router;