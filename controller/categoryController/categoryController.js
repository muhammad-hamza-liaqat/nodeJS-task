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


const editCategory = async (req,res)=>{
  const id = req.params.id;
  const {newCategoryName} = req.body;
  if (!id){
    return res.status(400).json({statusCode:400,message: "ID is missing from the params"})
  }
  try {
    const categoryToFind = await categoryModel.findByIdAndUpdate(id);
    if (!categoryToFind){
      return res.status(404).json({statusCode:404,message: "category not found!"})
    }
    // updating the category
    categoryToFind.categoryType = req.body.newCategoryName;
    await categoryToFind.save();
    return res.status(200).json({statusCode:200, message:"category updated successfully!", data: categoryToFind})
  } catch (error) {
    console.log("internal server error", error);
    return res.status(500).json({message: "internal server error", error:error})
  }
}

module.exports = {
  addingCategory,
  editCategory,

};
