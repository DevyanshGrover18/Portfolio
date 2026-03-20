// Validates incoming post body before hitting the controller
export const validatePost = (req, res, next) => {
  const { title, blocks } = req.body;
  const errors = [];

  if (title !== undefined && typeof title !== 'string') {
    errors.push('title must be a string');
  }

  if (blocks !== undefined) {
    if (!Array.isArray(blocks)) {
      errors.push('blocks must be an array');
    } else {
      blocks.forEach((block, i) => {
        if (!block.id) errors.push(`blocks[${i}] missing id`);
        if (!['paragraph', 'image'].includes(block.type)) {
          errors.push(`blocks[${i}] has invalid type "${block.type}"`);
        }
        if (block.type === 'image' && block.url && typeof block.url !== 'string') {
          errors.push(`blocks[${i}] url must be a string`);
        }
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors });
  }

  next();
};