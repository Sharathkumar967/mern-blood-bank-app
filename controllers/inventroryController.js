const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryContoller = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    // validation
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not Found");
    }

    if (inventoryType === "in" && user.role !== "donar") {
      throw new Error("Not a donar account");
    }

    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not a hispital");
    }

    // save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();

    return res.status(201).send({
      success: true,
      message: "New Blood Reocord Added",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in Create Inventrory API",
      err,
    });
  }
};

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Get All Inventory Api",
    });
  }
};

module.exports = { createInventoryContoller, getInventoryController };
