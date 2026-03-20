import Post from '../models/Post.js';

// ─── GET /api/posts ──────────────────────────────────────────────────────────
// Returns all posts, newest first. Excludes full block content for performance.
export const getAllPosts = async (req, res) => {
  try {
    const { published, limit = 20, page = 1 } = req.query;

    const filter = {};
    if (req.admin) {
      if (published !== undefined) {
        filter.published = published === "true";
      }
    } else {
      filter.published = published !== undefined ? published === "true" : true;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .select('-blocks') // omit blocks from list view
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Post.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch posts', error: err.message });
  }
};

// ─── GET /api/posts/:id ──────────────────────────────────────────────────────
// Returns a single post by MongoDB ID or slug
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    // Support lookup by either MongoDB _id or slug
    const isObjectId = id.match(/^[a-f\d]{24}$/i);
    const post = await (isObjectId
      ? Post.findById(id)
      : Post.findOne({ slug: id }));

    if (!post || (!req.admin && !post.published)) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch post', error: err.message });
  }
};

// ─── POST /api/posts ─────────────────────────────────────────────────────────
// Creates a new post
export const createPost = async (req, res) => {
  try {
    const { title, coverImage, blocks, published } = req.body;

    const post = new Post({ title, coverImage, blocks, published });
    await post.save();

    res.status(201).json({ success: true, data: post });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'A post with this slug already exists' });
    }
    res.status(500).json({ success: false, message: 'Failed to create post', error: err.message });
  }
};

// ─── PUT /api/posts/:id ──────────────────────────────────────────────────────
// Fully updates a post
export const updatePost = async (req, res) => {
  try {
    const { title, coverImage, blocks, published } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Only update slug if title changed
    if (title && title !== post.title) {
      post.title = title;
      // Trigger pre-save hook to regenerate slug
      post.slug = undefined;
    }

    if (coverImage !== undefined) post.coverImage = coverImage;
    if (blocks !== undefined) post.blocks = blocks;
    if (published !== undefined) post.published = published;

    await post.save();

    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update post', error: err.message });
  }
};

// ─── DELETE /api/posts/:id ───────────────────────────────────────────────────
// Deletes a post permanently
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({ success: true, message: 'Post deleted successfully', data: { id: req.params.id } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete post', error: err.message });
  }
};
