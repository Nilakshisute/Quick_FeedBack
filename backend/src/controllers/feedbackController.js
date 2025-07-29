const Feedback = require('../models/feedbackModel');

exports.submitFeedback = async (req, res) => {
  const { category, comment, rating } = req.body;
  const feedback = await Feedback.create({
    user: req.user.id,
    category,
    comment,
    rating
  });
  res.status(201).json(feedback);
};

exports.getOwnFeedback = async (req, res) => {
  const feedbacks = await Feedback.find({ user: req.user.id });
  res.json(feedbacks);
};

exports.getAllFeedback = async (req, res) => {
  const { status, category } = req.query;
  const query = {};
  if (status) query.status = status;
  if (category) query.category = category;

  const feedbacks = await Feedback.find(query).populate('user', 'name email');
  res.json(feedbacks);
};

exports.respondFeedback = async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  if (!response) {
    return res.status(400).json({ message: "Response text is required" });
  }

  try {
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { response, status: 'responded' },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  const { id } = req.params;
  await Feedback.findByIdAndDelete(id);
  res.json({ message: "Feedback deleted" });
};
