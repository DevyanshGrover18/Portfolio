import mongoose from 'mongoose';

const BlockSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ['paragraph', 'image'], required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: null }, // Tiptap JSON
  url: { type: String },
  caption: { type: String },
}, { _id: false });

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Untitled',
    trim: true,
  },
  coverImage: {
    type: String,
    default: '',
  },
  blocks: {
    type: [BlockSchema],
    default: [],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt automatically
});

// Auto-generate slug from title before saving
PostSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      + '-' + Date.now();
  }
  next();
});

export default mongoose.model('Post', PostSchema);