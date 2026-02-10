import {
  addbusiness,
  getAllBusiness,
  deleteBusiness,
  addProduct,
  upload,
  getAllProducts,
  deleteProduct
} from "../controllers/business_controller.js";
import express from "express";
import authentication from "../middleware/authendication.js";

const router = express.Router();
router.use(authentication);

router.post("/addbusiness", addbusiness);
router.post("/getallbusiness", getAllBusiness);
router.post("/deletebusiness", deleteBusiness);

router.post("/addproduct", upload.single("productimg"), addProduct);
router.post("/getallproducts", getAllProducts);
router.post("/deleteproduct", deleteProduct);

export default router;
