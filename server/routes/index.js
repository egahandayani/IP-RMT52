const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const CharacterController = require("../controllers/CharacterController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", (req, res, next) => {
  res.send(`
          <h1> MyDisneyWorld </h1>
          `);
});

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/login/google", UserController.googleLogin);

// Protected CRUD Endpoints
router.use(authentication);
router.get("/characters", CharacterController.getCharacters);
router.get("/characters/:id", CharacterController.getOneCharacterById);
router.post("/characters/:CharacterId", CharacterController.addMyCharacter);
router.get("/characters/myCharacters", CharacterController.getMyCharacter);
router.patch(
  "/characters/:id/imageUrl",
  upload.single("imageUrl"),
  CharacterController.updateMyCharacter
);
router.delete("/characters/:id", CharacterController.deleteMyCharacter);

module.exports = router;
