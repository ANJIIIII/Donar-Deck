const express=require("express");
const router=express.Router();
const{ registerController , loginController ,currentUserController}=require('../controllers/authcontroller');
const authmiddleware = require("../middleware/authmiddleware");
// const authMiddleware = require("../middlewares/authMiddleware");



router.post("/register", registerController);

router.post("/login", loginController);

router.get('/current-user',authmiddleware, currentUserController )

module.exports=router;
