const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const CharacterController = require("../controllers/CharacterController");
const { route } = require("../app");

router.get("/", (req, res, next) => {
  res.send(`
          <h1> MyDisneyWorld </h1>
          `);
});

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/login/google", UserController.googleLogin);

// Protected CRUD Endpoints
// router.use(authentication);

// router.get("/character");

module.exports = router;
