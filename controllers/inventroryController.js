const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryContoller = async (req, res) => {
  try {
    const { email } = req.body;
    // validation
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not Found");
    }

    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }

    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hispital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);

      //calculate Blood Quantity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: `$bloodGroup`,
            total: { $sum: `$quantity` },
          },
        },
      ]);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      // calculate OUT Blood  Quantity
      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },

        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      // in & out Calc
      const availableQuantityOfBloodGroup = totalIn - totalOut;

      // quantity validation
      if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
        const bloodGroupMessage = requestedBloodGroup
          ? requestedBloodGroup.toUpperCase()
          : "Unknown";
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup}ML of ${bloodGroupMessage} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    // save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();

    return res.status(201).send({
      success: true,
      message: "New Blood Reocord Added",
    });
  } catch (err) {
    console.error(err); // Log the error object
    console.error(err.message); // Log the error message
    console.error(err.stack); // Log the stack trace
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
      err,
    });
  }
};

// Get Donar Records
const getDonarsController = async (req, res) => {
  try {
    const organization = req.body.userId;

    // find donars
    const donarId = await inventoryModel.distinct("donar", { organization });
    // console.log("donarId", donarId);
    const donars = await userModel.find({ _id: { $in: donarId } });
    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      donars,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      err,
    });
  }
};

// Get Hospitals Records
const getHospitalsController = async (req, res) => {
  try {
    const organization = req.body.userId;
    // get Hospital Id
    const hospitalId = await inventoryModel.distinct("hospital", {
      organization,
    });

    // find Hospital
    const hospitals = await userModel.find({ _id: { $in: hospitalId } });

    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error In get Hospital Api",
      err,
    });
  }
};

// get Organization Records
const getOrganizationController = async (req, res) => {
  try {
    const donar = req.body.UserId;

    const orgId = await inventoryModel.distinct("organization", { donar });

    // find Organization\
    const organizations = await userModel.find({
      _id: { $in: orgId },
    });

    return res.status(200).send({
      success: true,
      message: "Organization Data Fetched Successfully",
      organizations,
    });
  } catch (err) {
    console.log(err);
    return response.status(500).send({
      success: false,
      message: "Error in Organization Api",
    });
  }
};
module.exports = {
  createInventoryContoller,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrganizationController,
};
