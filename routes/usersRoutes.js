const router = require("express").Router();
const path = require("path");
const usersController = require(path.join(
  __dirname,
  "..",
  "controllers",
  "UsersController"
));

router.get("/users", usersController.getUsers);
router.get("/users/not-payed", usersController.getUsersNotPayed);
router.post("/users", usersController.createUser);
router.delete("/users", usersController.deleteUser);
router.patch("/users", usersController.updateUser);

module.exports = router;
