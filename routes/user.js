const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");
const auth = require("../middleware/auth");

router.post("/register", userController.userRegister, auth);
router.post("/login", userController.userLogin, auth);
router.get("/get", userController.getUserData);
router.post("/profile", userController.postProfile);
router.patch("/modify", userController.patchUserData);
router.post("/address", userController.userAddress, auth);
router.get("/address_user", userController.userDataAndAddress);

module.exports = router;
