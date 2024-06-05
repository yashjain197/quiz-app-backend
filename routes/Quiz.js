// routes/quiz.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Question = require('../models/Question');

router.get('/start', auth, async (req, res) => {
  const questions = await Question.find().limit(20);
  res.json(questions);
});

// routes/quiz.js (continued)
router.post('/submit', auth, async (req, res) => {
    const { answers } = req.body;
    let correct = 0;
    let total = 20;
  
    for (let answerObj of answers) {
      const question = await Question.findById(answerObj.id);
      if (question && question.answer === answerObj.answer) {
        correct++;
      }
    }
    res.json({ correct, total, message: `You answered ${correct} out of ${total} correctly.` });
  });
  

  router.post('/add-question', auth, async (req, res) => {
    try {
        // Validate request body data (optional but recommended)
        const { question, options, answer, tags, difficulty } = req.body;
        if (!question || !options || !answer || !difficulty) {
          return res.status(400).json({ message: 'Missing required fields in request body' });
        }
                // Create a new Question instance
        const newQuestion = new Question({ question, options, answer, tags, difficulty });
    
        // Save the new question to the database
        await newQuestion.save();
    
        res.status(201).json({ message: 'Question created successfully', question: newQuestion });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating question' });
      }
  });

  

module.exports = router;
