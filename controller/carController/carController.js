const {carModel, carValidationSchema} = require("../../models/carModel/carModel")
const {categoryModel} = require("../../models/categoryModel/categoryModel")
const addingCar = async (req, res) => {
  // res.end("hello from car controller");
  const { color, model, make, registrationNo, categoryType } = req.body;
  try {
    const categoryData = await categoryModel.findOne({categoryType});
    if (!categoryData){
      return res.status(400).json({statusCode:400, message:"category does not exist. create category first"})
    }
    const newCar = await carModel.create({
      color,
      model,
      make,
      registrationNo,
      categoryType: categoryData._id
    })
    console.log("new car added", newCar);
    return res.status(201).json({statusCode:201, message: "new car added successfully", data: newCar})
    
  } catch (error) {
    console.log("internal server error", error);
    return res.status(500).json({statusCode:500, message: "internal server error", error: error})
  }
};

const editCar = async (req, res) => {
  res.send("hello");
};
const deleteCar = async (req, res) => {
  res.send("hello");
};
const allCar = async (req, res) => {
  res.send("hello");
};

module.exports = { addingCar, editCar, deleteCar, allCar };
