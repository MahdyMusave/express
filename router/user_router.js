const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const controller = require("../controller/user_controller");
const Validate = require("../validator/user_validator");
router.get("/", controller.getUsers);

router.get("/:userid", controller.getOne_User);

router.post("/", Validate.handle(), controller.postUser);

router.put("/:userid", controller.updateUser);
router.delete("/:userid", controller.deleteUser);

module.exports = router;
