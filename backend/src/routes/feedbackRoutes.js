const express = require('express');
const {
  submitFeedback,
  getOwnFeedback,
  getAllFeedback,
  respondFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');

const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware(['customer']), submitFeedback);
router.get('/my', authMiddleware(['customer']), getOwnFeedback);

router.get('/', authMiddleware(['admin']), getAllFeedback);
router.patch('/:id/respond', authMiddleware(['admin']), respondFeedback);
router.delete('/:id', authMiddleware(['admin']), deleteFeedback);

module.exports = router;
