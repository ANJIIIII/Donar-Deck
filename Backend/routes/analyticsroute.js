const express=require("express");
const router=express.Router();
const {bloodGroupDetailsContoller} =require("../controllers/analyticsController")
const authmiddleware = require("../middleware/authmiddleware");

// const authMiddleware = require("../middlewares/authMiddleware");


router.get("/bloodGroups-data", authmiddleware, bloodGroupDetailsContoller)



module.exports=router;