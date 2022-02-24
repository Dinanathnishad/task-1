const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");
const auth = require("../middleware/auth");
const validator = require("../validators/inputValidate");

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);
router.post("/address", userController.userAddress, auth);
router.post("/profile", userController.postProfile, auth);
router.get("/address_user", userController.userDataAndAddress);
router.get("/get", userController.getUserData);
router.patch("/update/:id", userController.patchUserData);

module.exports = router;
