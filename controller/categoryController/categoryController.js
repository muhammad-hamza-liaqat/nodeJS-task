const {
  categoryModel,
  categoryValidationSchema,
} = require("../../models/categoryModel/categoryModel");

const addingCategory = async (req, res) => {
  // res.end("hello from category controller");
  const data = req.body;
  const validateResult = categoryValidationSchema.validate(data);
  if (validateResult.error) {
    return res.status(400).json({
      message: "validation error",
      error: validateResult.error.details,
    });
  }
  try {
    const newCategory = await categoryModel.create(data);
    console.log("new category added:", newCategory);
    return res
      .status(201)
      .json({
        statusCode: 201,
        message: "category added successfully!",
        data: newCategory,
      });
  } catch (error) {
    console.log("internal server error- adding category conytroller", error);
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

module.exports = {
  addingCategory,
};
