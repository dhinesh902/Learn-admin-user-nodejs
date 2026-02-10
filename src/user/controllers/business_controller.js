import multer from "multer";
import { ApiError, ApiSuccess } from "../../utils/api_response.js";
import { successResponse } from "../middleware/api_response_middleware.js";
import { BusinessModel, ProductModel } from "../models/business_model.js";

export const addbusiness = async (req, res, next) => {
  try {
    const { businessname, description } = req.body;

    console.log(`user id and role ${req.user.userid} ${req.user.role}`);

    if (!businessname) throw new ApiError(400, "Businessname required");
    if (!description) throw new ApiError(400, "Description required");

    const business = await BusinessModel.create({
      businessname,
      description,
      createdby: req.user.userid,
    });

    if (business) {
      return successResponse(
        res,
        new ApiSuccess(200, "Business Created SuccessFully"),
      );
    }
    throw new ApiError(400, "Business Creation Failed");
  } catch (error) {
    next(error);
  }
};

export const getAllBusiness = async (req, res, next) => {
  try {
    const userid = req.user.userid;

    if (!userid) throw new ApiError(400, "Userid Required");

    const products = await BusinessModel.findAll({
      where: {
        createdby: userid,
      },
      attributes: { exclude: ["createdby"] },
    });
    if (products.length > 0) {
      return successResponse(res, new ApiSuccess(200, products));
    }
    return successResponse(res, new ApiSuccess(200, []));
  } catch (error) {
    next(error);
  }
};

export const deleteBusiness = async (req, res, next) => {
  try {
    const { businessid } = req.body;
    if (!businessid) {
      throw new ApiError(400, "Business ID is required");
    }

    const deletedCount = await BusinessModel.destroy({
      where: {
        businessid,
        createdby: req.user.userid,
      },
    });

    if (!deletedCount) {
      throw new ApiError(404, "Business not found");
    }

    return successResponse(
      res,
      new ApiSuccess(200, "Business deleted successfully"),
    );
  } catch (error) {
    next(error);
  }
};

// --------------------------------- Multer Controller ---------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const filterFiles = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: filterFiles,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// --------------------------------- Product Controller ---------------------------------

export const addProduct = async (req, res, next) => {
  try {
    const {
      productid = 0,
      productname,
      description,
      price,
      unit,
      availablerent,
    } = req.body;

    if (!productname) throw new ApiError(400, "Product name is required");
    if (!description) throw new ApiError(400, "Description is required");
    if (!price) throw new ApiError(400, "Price is required");

    const isUpdate = Number(productid) !== 0;

    // ---------------- UPDATE PRODUCT ----------------
    if (isUpdate) {
      const product = await ProductModel.findOne({
        where: {
          productid,
          createdby: req.user.userid,
        },
      });

      if (!product) {
        throw new ApiError(404, "Product not found");
      }

      const updateData = {
        productname,
        description,
        price,
        unit,
        availablerent,
      };

      if (req.file) {
        updateData.productimg = req.file.path.replace(/\\/g, "/");
      }

      await ProductModel.update(updateData, {
        where: {
          productid,
          createdby: req.user.userid,
        },
      });

      return successResponse(
        res,
        new ApiSuccess(200, "Product Updated Successfully"),
      );
    }

    if (!req.file) {
      throw new ApiError(400, "Product image is required");
    }

    const productimg = req.file.path.replace(/\\/g, "/");

    const product = await ProductModel.create({
      productimg,
      productname,
      description,
      price,
      unit,
      availablerent,
      createdby: req.user.userid,
    });

    return successResponse(
      res,
      new ApiSuccess(201, "Product Added Successfully", product),
    );
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.findAll({
      where: {
        createdby: req.user.userid,
      },
    });
    if (products.length > 0) {
      return successResponse(res, new ApiSuccess(200, products));
    }
    return successResponse(res, new ApiSuccess(200, []));
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { productid } = req.body;
    const isDeleteProduct = await ProductModel.destroy({
      where: {
        productid,
        createdby: req.user.userid,
      },
    });

    if (isDeleteProduct) {
      return successResponse(
        res,
        new ApiSuccess(200, "Product Deleted Successfully"),
      );
    }
    throw new ApiError(400, "Product not found");
  } catch (error) {
    next(error);
  }
};
