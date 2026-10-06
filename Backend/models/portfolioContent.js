import mongoose from "mongoose";

const PortfolioContentSchema = new mongoose.Schema({
  section: {
    type: String,
    enum: ["about", "skills", "projects", "experience", "education"],
    required: true,
    index: true,
  },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  order: { type: Number, default: 0, index: true },
  visible: { type: Boolean, default: true, index: true },
  seeded: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("PortfolioContent", PortfolioContentSchema);
