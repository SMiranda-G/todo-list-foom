const validateTodo = (req, res, next) => {
  const { title, description, completed } = req.body;
  const errors = [];

  // Validate title
  if (!title) {
    errors.push({ field: "title", message: "Title is required" });
  } else if (typeof title !== "string") {
    errors.push({ field: "title", message: "Title must be a string" });
  } else if (title.trim().length === 0) {
    errors.push({ field: "title", message: "Title cannot be empty" });
  } else if (title.length > 255) {
    errors.push({
      field: "title",
      message: "Title cannot exceed 255 characters",
    });
  }

  // If there are errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation Error",
      details: errors,
    });
  }

  // Clean the data
  req.body.title = title?.trim();
  req.body.description = description?.trim() || null;
  req.body.completed = completed ?? false;

  // if Everything is valid, continue
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  const numId = Number(id);

  if (isNaN(numId) || !Number.isInteger(numId) || numId < 1) {
    return res.status(400).json({
      error: "Validation Error",
      message: "ID must be a positive integer",
    });
  }

  // Clean the ID
  req.params.id = numId;
  next();
};

module.exports = {
  validateTodo,
  validateId,
};
