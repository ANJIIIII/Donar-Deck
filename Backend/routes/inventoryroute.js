const express=require("express");
const router=express.Router();
const{ createInventoryController , getInventoryController, getDonarsController,getHospitalController, getOrgnaisationController, getOrgnaisationForHospitalController,getInventoryHospitalController,getRecentInventoryController}=require('../controllers/inventorycontroller');
const authmiddleware = require("../middleware/authmiddleware");
// const authMiddleware = require("../middlewares/authMiddleware");



router.post("/create-inventory", authmiddleware, createInventoryController);

router.get("/get-inventory", authmiddleware,  getInventoryController);

router.get("/get-recent-inventory", authmiddleware,  getRecentInventoryController);

router.get("/get-inventory-hospital", authmiddleware,  getInventoryHospitalController);

router.get("/get-donar", authmiddleware,  getDonarsController);

router.get("/get-hospital", authmiddleware,  getHospitalController);

router.get("/get-organisation", authmiddleware,  getOrgnaisationController);

router.get("/get-organisation-for-hospital", authmiddleware,  getOrgnaisationForHospitalController);


module.exports=router;
