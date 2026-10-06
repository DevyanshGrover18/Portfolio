import PortfolioContent from "../models/portfolioContent.js";

const sections = new Set(["about", "skills", "projects", "experience", "education"]);

const isValidSection = (section) => sections.has(section);

export const getContent = async (req, res) => {
  const { section } = req.params;
  if (!isValidSection(section)) return res.status(404).json({ success: false, message: "Unknown content section" });

  try {
    const filter = { section };
    if (!req.admin) filter.visible = true;
    const items = await PortfolioContent.find(filter).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch portfolio content", error: error.message });
  }
};

export const getContentItem = async (req, res) => {
  try {
    const item = await PortfolioContent.findOne({ _id: req.params.id, section: req.params.section });
    if (!item || (!req.admin && !item.visible)) return res.status(404).json({ success: false, message: "Content item not found" });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch content item", error: error.message });
  }
};

export const createContent = async (req, res) => {
  if (!isValidSection(req.params.section)) return res.status(404).json({ success: false, message: "Unknown content section" });
  if (req.params.section === "about" && await PortfolioContent.exists({ section: "about" })) {
    return res.status(409).json({ success: false, message: "About content already exists; edit the existing record" });
  }
  try {
    const item = await PortfolioContent.create({ section: req.params.section, data: req.body.data, order: req.body.order, visible: req.body.visible });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to create content", error: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    const item = await PortfolioContent.findOne({ _id: req.params.id, section: req.params.section });
    if (!item) return res.status(404).json({ success: false, message: "Content item not found" });
    if (req.body.data !== undefined) item.data = req.body.data;
    if (req.body.order !== undefined) item.order = Number(req.body.order);
    if (req.body.visible !== undefined) item.visible = Boolean(req.body.visible);
    await item.save();
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update content", error: error.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const item = await PortfolioContent.findOneAndDelete({ _id: req.params.id, section: req.params.section });
    if (!item) return res.status(404).json({ success: false, message: "Content item not found" });
    res.json({ success: true, data: { id: item._id } });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to delete content", error: error.message });
  }
};
