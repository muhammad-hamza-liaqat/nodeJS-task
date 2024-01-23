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
    return res.status(201).json({
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

const editCategory = async (req, res) => {
  const id = req.params.id;
  const { newCategoryType } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "ID is missing from the params" });
  }
  try {
    const categoryToFind = await categoryModel.findByIdAndUpdate(
      id,
      { categoryType: newCategoryType },
      // it will return the newly updated value.
      { new: true }
    );

    console.log("Category To Find:", categoryToFind);
    if (!categoryToFind) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "category not found!" });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "category updated successfully!",
      data: categoryToFind,
    });
  } catch (error) {
    console.log("internal server error", error);
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

const getAll = async (req, res) => {
  try {
    const categoryData = await categoryModel.find();
    console.log("data:", categoryData);
    return res
      .status(200)
      .json({ statusCode: 200, message: "data fetched", data: categoryData });
  } catch (error) {
    console.log("internal server error", error);
    return res
      .status(500)
      .json({
        statusCode: 500,
        message: "internal server error",
        error: error,
      });
  }
};

const deleteCategory = async (req,res)=>{
  const id = req.params.id;
  if (!id){
    return res.status(400).json({statusCode:400, message:"id not found in params"})
  }
  try {
    const dataToDelete = await categoryModel.findByIdAndDelete(id);
    return res.status(200).json({statusCode:200, message: "data deleted successfully!", dataDeleted: dataToDelete})
  } catch (error) {
    console.log("internal server error - delete category", error);
    return res.status(500).json({statusCode:500, message:"internal server error", error: error})
  }
}
module.exports = {
  addingCategory,
  editCategory,
  getAll, 
  deleteCategory
};
